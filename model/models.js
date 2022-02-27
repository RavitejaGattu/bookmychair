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
        }
    }
});