sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'bookmychair/model/models',
    'sap/m/MessageBox',
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/core/syncStyleClass"
], function (Controller, models, MessageBox, ResourceModel, syncStyleClass) {
    'use strict';
    return Controller.extend("bookmychair.controller.App", {
        onInit: function () {
            var oView = this.getView();
            this.oOwnerComponent = this.getOwnerComponent();
            this.getView().addStyleClass(this.oOwnerComponent.getContentDensityClass());
            var oSignUp = models.signUpModel();
            this.oOwnerComponent.setModel(oSignUp, "SignUp");
            var oSignIn = models.signInModel();
            this.oOwnerComponent.setModel(oSignIn, "SignIn");
            var i18nModel = new ResourceModel({
                bundleName: "bookmychair.i18n.i18n"
            });
            this.oOwnerComponent.setModel(i18nModel, "i18n");

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
            var oView = this.getView();
            oView.setBusy(true);
            //Post Data to MongoDB
            $.ajax({
                url: "./users",
                method: "POST",
                data: oSignUpData
            }).done(function (data, status, jqxhr) {
                oView.setBusy(false);
                MessageBox.success("Congratulations, Successfully Signed Up!!!");
                var oSignUp = models.signUpModel();
                this.oOwnerComponent.setModel(oSignUp, "SignUp");
                this.onCancelSignUp();
                setTimeout(function () {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("home");
                }.bind(this), 2000);
            }.bind(this));
        },

        onSignIn: function (oEvent) {
            var oSignInData = this.getView().getModel("SignIn").getData();
            var oView = this.getView();
            oView.setBusy(true);
            $.ajax({
                url: "./login",
                method: "POST",
                data: oSignInData
            }).done(function (data, status, jqxhr) {
                oView.setBusy(false);
                if (data.length === 0) {
                    MessageBox.error("Worng credentials!!!");
                } else {
                    oView.setBusy(true);
                    var oSignIn = models.signInModel();
                    this.oOwnerComponent.setModel(oSignIn, "SignIn");
                    this.onCancelSignIn();
                    MessageBox.success("Congratulations, Successfully Signed In!!!");
                    setTimeout(function () {
                        oView.setBusy(false);
                        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                        oRouter.navTo("home");
                    }.bind(this), 3000);
                }
            }.bind(this));
        },

        onSignUpBtn: function () {
            // create dialog lazily
            if (!this.pSignUpDialog) {
                this.pSignUpDialog = this.loadFragment({
                    name: "bookmychair.fragments.signup"
                }).then(function (oDialog) {
                    // forward compact/cozy style into dialog
                    syncStyleClass(this.getOwnerComponent().getContentDensityClass(), this.getView(), oDialog);
                    return oDialog;
                }.bind(this));
            }
            this.pSignUpDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onSignInBtn: function () {
            // create dialog lazily
            if (!this.pSignInDialog) {
                this.pSignInDialog = this.loadFragment({
                    name: "bookmychair.fragments.signin"
                }).then(function (oDialog) {
                    // forward compact/cozy style into dialog
                    syncStyleClass(this.getOwnerComponent().getContentDensityClass(), this.getView(), oDialog);
                    return oDialog;
                }.bind(this));
            }
            this.pSignInDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onCancelSignUp: function () {
            this.pSignUpDialog.then(function (oDialog) {
                oDialog.close();
            });
            var oSignUp = models.signUpModel();
            this.oOwnerComponent.setModel(oSignUp, "SignUp");
        },

        onCancelSignIn: function () {
            this.pSignInDialog.then(function (oDialog) {
                oDialog.close();
            });
            var oSignIn = models.signInModel();
            this.oOwnerComponent.setModel(oSignIn, "SignIn");
        },

        onBook: function () {
            sap.m.MessageToast.show("Booking Successful!");
        }






        // getData: function () {
        //     $.ajax({
        //         url: "./masterrole"
        //     }).done(function (data, status, jqxhr) {
        //         // alert(data);
        //         var oMasterRole = new sap.ui.model.json.JSONModel();
        //         oMasterRole.setData(data);
        //         this.getView().setModel(oMasterRole, "MasterRoles")
        //     }.bind(this));
        // },
        // onSave: function () {
        //     var oData = this.getView().getModel("save").getData();
        //     $.ajax({
        //         url: "./masterrolepost",
        //         method: "POST",
        //         data: oData
        //     }).done(function (data, status, jqxhr) {
        //         // console.log(data);
        //         this.getData();
        //         var oSaveModel = models.saveModel();
        //         this.getView().setModel(oSaveModel, "save");
        //         this.pDialog.then(function (oDialog) {
        //             oDialog.close();
        //         });
        //     }.bind(this));
        // },
    });
});