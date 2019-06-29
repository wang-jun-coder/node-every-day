define(["require", "exports", "./ZipCodeValidator", "./ZipCodeValidator", "./StaticZipCodeValidator", "./OneTowThree", "./ZipCodeValidator1", "url"], function (require, exports, ZipCodeValidator_1, validator, StaticZipCodeValidator_1, OneTowThree_1, Zip, URL) {
    "use strict";
    exports.__esModule = true;
    var myValidator = new ZipCodeValidator_1.ZipCodeValidator();
    myValidator = new ZipCodeValidator_1.ZipCodeValidator();
    myValidator = new validator.ZipCodeValidator();
    myValidator = new validator.mainValidator();
    var strings = ['hello', '98052', '101'];
    strings.forEach(function (s) { return console.log(s + " " + (StaticZipCodeValidator_1["default"](s) ? 'matchs' : 'does not match')); });
    console.log(OneTowThree_1["default"]);
    var v = new Zip();
    strings.forEach(function (s) { return console.log(s + " " + (v.isAcceptable(s) ? 'matchs' : 'does not match')); });
    var needZip1 = true;
    if (needZip1) {
        var ZipCodeValidator_2 = require('./ZipCodeValidator');
        var v_1 = new ZipCodeValidator_2();
        if (v_1.isAcceptable('123456')) {
            console.log('ZipCodeValidator load');
        }
    }
    var myUrl = URL.parser("http://www.test.com");
});
