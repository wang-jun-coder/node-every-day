const fs = require('fs');
const path = require('path');
const util = require('util');

const listChild = async (dir, excludes=[]) => {

    const stat = util.promisify(fs.stat);
    const dirStat = await stat(dir);
    if (!dirStat.isDirectory()) throw new TypeError('参数错误');
    const ret = [];
    const child = await util.promisify(fs.readdir)(dir);

    for (let i = 0; i < child.length; i++) {
        const item = child[i];
        const itemPath = path.resolve(dir, item);

        if (excludes.includes(itemPath)) continue;

        const itemStat = await stat(itemPath);
        if (itemStat.isDirectory()) {
            ret.push(...await listChild(itemPath));
            continue;
        }
        // ret.push(path.basename(itemPath));
        ret.push(itemPath );
    }
    return ret;
};

listChild(path.resolve(__dirname, '../'),
    [path.resolve(__dirname, '../node_modules')])
    .then(fileNames => console.log(fileNames)).catch(e => console.log(e));
