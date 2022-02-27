sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'bookmychair/model/models'
], function (Controller, models) {
    'use strict';
    return Controller.extend("bookmychair.controller.App", {
        onInit: function () {
            var oView = this.getView();
            var oSaveModel = models.saveModel();
            oView.setModel(oSaveModel, "save");
            this.getData();
            // this.mongoDbAPIcall();
        },
        getData: function () {
            $.ajax({
                url: "./masterrole"
            }).done(function (data, status, jqxhr) {
                // alert(data);
                var oMasterRole = new sap.ui.model.json.JSONModel();
                oMasterRole.setData(data);
                this.getView().setModel(oMasterRole, "MasterRoles")
            }.bind(this));
        },
        onShowHello: function () {
            alert("Hi");
        },
        onSave: function () {

            var oData = this.getView().getModel("save").getData();

            $.ajax({
                url: "./masterrolepost",
                method: "POST",
                data: oData
            }).done(function (data, status, jqxhr) {
                console.log(data);
                this.getData();
                var oSaveModel = models.saveModel();
                this.getView().setModel(oSaveModel, "save");
                this.pDialog.then(function (oDialog) {
                    oDialog.close();
                });
            }.bind(this));
        },
        onCancel: function () {
            this.pDialog.then(function (oDialog) {
                oDialog.close();
            });
        },
        onOpenDialog: function () {
            // create dialog lazily
            if (!this.pDialog) {
                this.pDialog = this.loadFragment({
                    name: "bookmychair.fragments.addRole"
                });
            }

            this.pDialog.then(function (oDialog) {
                oDialog.open();
            });
        }
    });
});