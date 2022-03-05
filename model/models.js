sap.ui.define([
    'sap/ui/model/json/JSONModel'
], function (JSONModel) {
    'use strict';
    return {

        localModel: function () {
            return new JSONModel({
                minDate: new Date(),
                signedInFlag: false
            });
        },
        saveModel: function () {
            return new JSONModel({
                role: "",
                name: ""
            });
        },

        signUpModel: function () {
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

        signInModel: function () {
            return new JSONModel({
                username: "",
                password: ""
            });
        },

        Book: function () {
            return new JSONModel(
                {
                    barber: "",
                    time: "",
                    date: ""
                }
            );
        },

        bookingModel: function () {
            return new JSONModel(
                [

                ]
            );
        }
    }
});