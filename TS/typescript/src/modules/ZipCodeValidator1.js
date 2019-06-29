define(["require", "exports"], function (require, exports) {
    "use strict";
    var _a;
    return (_a = /** @class */ (function () {
            function ZipCodeValidator() {
            }
            ZipCodeValidator.prototype.isAcceptable = function (s) {
                return s.length === 5 && ZipCodeValidator.numReg.test(s);
            };
            return ZipCodeValidator;
        }()),
        _a.numReg = /^[0-9]+$/,
        _a);
});
