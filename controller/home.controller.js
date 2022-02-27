sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'bookmychair/model/models',
    'sap/m/MessageBox',
    "sap/ui/model/resource/ResourceModel"
], function (Controller, models, MessageBox, ResourceModel) {
    'use strict';
    return Controller.extend("bookmychair.controller.home", {
        onInit: function () {
        },
        onNavBack: function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("overview");
        }
    });
});