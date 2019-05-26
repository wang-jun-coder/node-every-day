const vm = require('vm');

let code = `(
    function() {
        leakInVm = 'this is a leak object in vm';
        return {
            name: 'global/vm.js'
        }
    }
)`;

const vmFn = vm.runInThisContext(code);
module.exports = vmFn();


