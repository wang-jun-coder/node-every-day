const addon = require("bindings")("addon");

console.log(addon.hello("world"));

const ret = addon.map(["a", "b"], (value, index, array) => {
    console.log(value, index, array);
    return value + '1';
});

console.log(ret);