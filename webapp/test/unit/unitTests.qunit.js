/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"mem_manag_new/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
