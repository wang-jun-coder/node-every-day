define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var numberRegexp = /^[0-9]+$/;
    // export class ZipCodeValidator implements StringValidator {
    // class ZipCodeValidator implements StringValidator {
    var ZipCodeValidator = /** @class */ (function () {
        function ZipCodeValidator() {
        }
        ZipCodeValidator.prototype.isAcceptable = function (s) {
            return s.length == 5 && numberRegexp.test(s);
        };
        return ZipCodeValidator;
    }());
    exports.ZipCodeValidator = ZipCodeValidator;
    exports.mainValidator = ZipCodeValidator;
    exports["default"] = ZipCodeValidator;
});
