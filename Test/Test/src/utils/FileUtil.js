const fs = require('fs');
const path = require('path');

class FileUtil {

    constructor(dir) {
        if (!dir) {
            throw Error('参数错误');
        }
        this.dir = dir;
    }

    // 异步文件读取
    async readFileAsync(fileName) {
        return new Promise((resolve, reject) =>{
            const filePath = path.resolve(this.dir, fileName);
            fs.stat(filePath, (error, stat) => {
                if (error) return reject(error);
                if (!stat.isFile()) return reject(new TypeError('文件类型错误, 无法读取'));

                fs.readFile(filePath, {encoding:'utf8'}, (error, content) => {
                    if (error) return reject(error);
                    return  resolve(content);
                });
            });
        });
    }

    // 同步文件读取, 会 throw error
    readFileSync(fileName) {
        const filePath = path.resolve(this.dir, fileName);

        const stat = fs.statSync(filePath);
        if (!stat.isFile()) throw new Error('文件类型错误, 无法读取');
        return fs.readFileSync(filePath, {
            encoding: 'utf8'
        });
    }

}

module.exports = FileUtil;
