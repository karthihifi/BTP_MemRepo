sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  function (Controller, History, ODataModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("memmanagnew.controller.ArcObj_detail", {
      //Attarch event
      onInit: function () {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter
          .getRoute("TargetViewTo")
          .attachPatternMatched(this._onRouteMatched, this);
      },
      _onRouteMatched: function (oEvent) {
        // alert(oEvent.getParameter("arguments").parameter.split(';'));
        this.getView().bindElement({
          path: "/" + oEvent.getParameter("arguments").ArcObject,
          model: "tableData",
        });

        var oTable = this.getView().byId("idArcdetail");
        var aFilter = [];
        var sPath = decodeURIComponent(oEvent.getParameter("arguments").ArcObject);
        var sQuery = sPath.replaceAll("'", ';');
        var sQuery = sPath.replaceAll("'", ';');
        var SFilter = sQuery.split(';')[1];
        if (SFilter) {
          aFilter.push(
            new Filter("Object", FilterOperator.EQ, SFilter)
          );
        }
        var oBinding = oTable.getBinding("items");
        oBinding.filter(aFilter);
        this.getView().byId("idVizFrame").getDataset().getBinding("data").filter(aFilter);
      },
      onNavBack: function (oEvent) {
        var oHistory = History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.navTo("", null, true);
        }
      },
    });
  }
);
