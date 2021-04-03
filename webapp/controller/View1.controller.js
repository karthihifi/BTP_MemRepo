sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/PDFViewer",
    "sap/ui/model/json/JSONModel",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, PDFViewer, JSONModel) {
    "use strict";

    return Controller.extend("memmanagnew.controller.View1", {
      onInit: function () {
        this._pdfViewer = new PDFViewer();
        this.getView().addDependent(this._pdfViewer);

        var oSample1Model = new JSONModel({
          Source: sap.ui.require.toUrl(
            "http://www.africau.edu/images/default/sample.pdf"
          ),
        });
        // this.getView().byId("desigdocu").setModel(oSample1Model);
      },
      onItemSelect: function (oEvent) {
        var oItem = oEvent.getParameter("item");
        this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
      },
      handleLineItemPress: function (oEvent) {
        console.log("clicked");
        var oItem = oEvent.getSource();
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("TargetViewTo", {
          ArcObject: oItem.getBindingContext().getPath().substr(1),
        });
      },
      edupdf: function (oEvent) {
        // var sSource = oEvent.getSource().getModel().getData().Source;

        var sSource =
          "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf?hsLang=en";
        this._pdfViewer.setSource(sSource);
        this._pdfViewer.setTitle("My Custom Title");
        this._pdfViewer.open();
      },
      onTableSettings: function (oEvent) {
        // Open the Table Setting dialog
        this._oDialog = sap.ui.xmlfragment(
          "memmanagnew.view.ArcObjSettingsDialog",
          this
        );
        this._oDialog.open();
      },
      onConfirm: function (oEvent) {
        var oView = this.getView();
        var oTable = oView.byId("idArcObjTable");
        var mParams = oEvent.getParameters();
        var oBinding = oTable.getBinding("items");
        // apply sorter
        var aSorters = [];
        var sPath = mParams.sortItem.getKey();
        var bDescending = mParams.sortDescending;
        aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));
        oBinding.sort(aSorters);
        // apply filters
        var aFilters = [];
        for (var i = 0, l = mParams.filterItems.length; i < l; i++) {
          var oItem = mParams.filterItems[i];
          var aSplit = oItem.getKey().split("___");
          var sPath = aSplit[0];
          var vOperator = aSplit[1];
          var vValue1 = aSplit[2];
          var vValue2 = aSplit[3];
          var oFilter = new sap.ui.model.Filter(
            sPath,
            vOperator,
            vValue1,
            vValue2
          );
          aFilters.push(oFilter);
        }
        oBinding.filter(aFilters);
      },

      onSideNavButtonPress: function () {
        var oToolPage = this.byId("toolPage");
        var bSideExpanded = oToolPage.getSideExpanded();

        this._setToggleButtonTooltip(bSideExpanded);

        oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
      },

      _setToggleButtonTooltip: function (bLarge) {
        var oToggleButton = this.byId("sideNavigationToggleButton");
        if (bLarge) {
          oToggleButton.setTooltip("Large Size Navigation");
        } else {
          oToggleButton.setTooltip("Small Size Navigation");
        }
      },
    });
  }
);
