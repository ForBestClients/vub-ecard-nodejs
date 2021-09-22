"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreTypes = void 0;
var StoreTypes;
(function (StoreTypes) {
    StoreTypes["PayHosting"] = "pay_hosting";
    StoreTypes["Secure3DPay"] = "3d_pay";
    StoreTypes["Secure3D"] = "3d";
    StoreTypes["Secure3DPayHosting"] = "3d_pay_hosting";
})(StoreTypes = exports.StoreTypes || (exports.StoreTypes = {}));
/**
 * Returns default store type
 * @returns string 3d_pay_hosting
 */
var getDefault = function () {
    return StoreTypes.Secure3DPayHosting;
};
exports.default = {
    getDefault: getDefault,
};
