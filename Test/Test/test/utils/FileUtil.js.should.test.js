const path = require('path');
const { expect } = require('chai');
const FileUtil = require('../../src/utils/FileUtil');


describe('#src/FileUtil.js', function() {
    // 使用内置 before, after 时, 需注意 回调函数, 普通函数与箭头函数的区别
    before(async () => {
        console.log(`before test`);
    });
    after(async () => {
        console.log(`after test`);
    });

    it('should init Error', function () {
        let initErr = null;
        let fileUtil = null;
        try {
            fileUtil = new FileUtil();
        } catch (e) {
            initErr = e;
        }
        expect(initErr).to.be.a('Error');
        expect(fileUtil).to.be.equal(null);
    });

    it('should init success', function () {
        let initErr = null;
        let fileUtil = null;
        try {
            fileUtil = new FileUtil(path.resolve(__dirname,'../../src/assets'));
        } catch (e) {
            initErr = e;
        }
        expect(initErr).to.be.a('null');
        expect(fileUtil).to
            .have.property('readFileAsync')
            .be.a('function')
            .lengthOf(1);
        expect(fileUtil).to
            .have.property('readFileSync')
            .be.a('function')
            .lengthOf(1);
    });

    it('should readFileSync Error', function () {
        let fileUtil = new FileUtil(path.resolve(__dirname,'../../src/assets'));

        let readErr = null;
        try {
            fileUtil.readFileSync('xx.txt');
        } catch (e) {
            readErr = e;
        }
        expect(readErr).to.be.a('Error');
    });

    it('should readFileSync Dir Error', function () {
        let fileUtil = new FileUtil(path.resolve(__dirname,'../../src/assets'));

        let readErr = null;
        try {
            fileUtil.readFileSync('data');
        } catch (e) {
            readErr = e;
        }
        expect(readErr).to.be.a('Error');
    });

    it('should readFileSync Success', function () {
        let fileUtil = new FileUtil(path.resolve(__dirname,'../../src/assets'));

        let readErr = null;
        let content = null;

        try {
            content = fileUtil.readFileSync('data.txt');
        } catch (e) {
            readErr = e;
        }
        expect(readErr).to.equal(null);
        expect(content).to.be.a('string')
            .have.property('length');
    });

    it('should readFileAsync Error', async () => {
        let fileUtil = new FileUtil(path.resolve(__dirname,'../../src/assets'));

        let readErr = null;
        try {
            await fileUtil.readFileAsync('xx.txt');
        } catch (e) {
            readErr = e;
        }
        expect(readErr).to.be.a('Error');
    });

    it('should readFileAsync dir Error', async () => {
        let fileUtil = new FileUtil(path.resolve(__dirname,'../../src/assets'));

        let readErr = null;
        try {
            await fileUtil.readFileAsync('data');
        } catch (e) {
            readErr = e;
        }
        expect(readErr).to.be.a('Error');
    });

    it('should readFileAsync Success', async () => {
        let fileUtil = new FileUtil(path.resolve(__dirname,'../../src/assets'));

        let readErr = null;
        let content = null;

        try {
            content = await fileUtil.readFileAsync('data.txt');
        } catch (e) {
            readErr = e;
        }
        expect(readErr).to.equal(null);
        expect(content).to.be.a('string')
            .have.property('length');
    });
});
