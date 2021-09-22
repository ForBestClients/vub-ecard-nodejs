"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config(options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.config = {};
        /**
         * Loads provided config values
         * @param options config values
         */
        this.load = function (options) {
            if (options === void 0) { options = {}; }
            if (options) {
                _this.config = __assign(__assign({}, _this.config), options);
            }
        };
        /**
         * Sets new property to config or updates alrady set property
         * @param key config property name
         * @param value config property name
         */
        this.set = function (key, value) {
            var _a;
            _this.config = __assign(__assign({}, _this.config), (_a = {}, _a[key] = value, _a));
        };
        /**
         * Returns config object or value for requested key id specified
         * @param key name of property we want to get value of
         * @param defaultValue
         * @returns config object or value property for specified key
         */
        this.get = function (key, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            if (!key) {
                return _this.config;
            }
            return key && _this.config.hasOwnProperty(key) ? _this.config[key] : defaultValue;
        };
        // load options
        this.load(options);
    }
    return Config;
}());
exports.default = Config;
