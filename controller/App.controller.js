sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'bookmychair/model/models',
    'sap/m/MessageBox',
    "sap/ui/model/resource/ResourceModel"
], function (Controller, models, MessageBox, ResourceModel) {
    'use strict';
    return Controller.extend("bookmychair.controller.App", {
        onInit: function () {
            var oView = this.getView();
            this.oOwnerComponent = this.getOwnerComponent();
            var oSignUp = models.signUpModel();
            this.oOwnerComponent.setModel(oSignUp, "SignUp");
            var oSignIn = models.signInModel();
            this.oOwnerComponent.setModel(oSignIn, "SignIn");
            var i18nModel = new ResourceModel({
                bundleName: "bookmychair.i18n.i18n"
            });
            this.oOwnerComponent.setModel(i18nModel, "i18n");

            // var oSaveModel = models.saveModel();
            // oView.setModel(oSaveModel, "save");
            // this.getData();
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
                // console.log(data);
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
        },

        onSignUp: function (oEvent) {
            var oSignUpData = this.getView().getModel("SignUp").getData();
            console.log(oSignUpData);

            //Post Data to MongoDB
            $.ajax({
                url: "./users",
                method: "POST",
                data: oSignUpData
            }).done(function (data, status, jqxhr) {
                MessageBox.success("Congratulations, Successfully Signed Up!!!");
            }.bind(this));


        },

        onSignIn: function (oEvent) {
            var oSignInData = this.getView().getModel("SignIn").getData();
            $.ajax({
                url: "./login",
                method: "POST",
                data: oSignInData
            }).done(function (data, status, jqxhr) {
                MessageBox.success("Congratulations, Successfully Signed In!!!");
            }.bind(this));
        }
    });
});