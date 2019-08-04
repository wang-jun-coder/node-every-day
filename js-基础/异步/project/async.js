const fs = require('fs');
const util = require('util');

async function readFiles(files) {
    return Promise.all(files.map(file => util.promisify(fs.readFile)(file, 'utf-8')));
}
async function main() {
    try {
        const files = ['package.json', 'async.js'];
        const contents = await readFiles(files);
        console.log(contents);
    } catch (e) {
        console.log(e);
    }
}
main().catch(e => console.log(e));
