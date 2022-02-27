sap.ui.define([
    'sap/ui/model/json/JSONModel'
], function (JSONModel) {
    'use strict';
    return {
        saveModel: function () {
            return new JSONModel({
                role: "",
                name: ""
            });
        },

        signUpModel: function(){
            return new JSONModel({
                name: "",
                phone: "",
                email: "",
                address: "",
                country: "",
                password: "",
                cpassword: ""
            });
        },

        signInModel: function(){
            return new JSONModel({
                username: "",
                password: ""
            });
        }
    }
});