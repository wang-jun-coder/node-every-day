const supertest = require('supertest');
const path = require('path');
const { expect } = require('chai');
const app = require('../src/app');

describe('app.js', () => {

    it('should user response status code 404', function (done) {
        this.timeout(100);  // 设置测试超时时间, 注意普通函数与箭头函数区别
        supertest(app)
            .get('/user')
            .expect(404, done);
    });

    it('should readFileAsync response status code 200', async function() {
        const res = await supertest(app)
            .get('/readFileAsync?fileName=data.txt')
            .expect(200)
            .expect('Content-Type', 'text/html');
        expect(res).to.be.a('object')
            .have.property('text').with.to.be.a('string');
    });

    it('should readFileAsync response status code 500', async () =>  {
        const res = await supertest(app)
            .get('/readFileAsync?fileName=data')
            .expect(500);
        expect(res).to.be.a('object')
            .have.property('text').with.to.be.a('string').with.lengthOf(0);
    });

    it('should readFileSync response status code 200', async () =>  {
        const res = await supertest(app)
            .get('/readFileSync?fileName=data.txt')
            .expect(200)
            .expect('Content-Type', 'text/html');
        expect(res).to.be.a('object')
            .have.property('text').with.to.be.a('string');
    });

    it('should readFileSync response status code 500', async () =>  {
        const res = await supertest(app)
            .get('/readFileSync?fileName=data')
            .expect(500);
        expect(res).to.be.a('object')
            .have.property('text').with.to.be.a('string').with.lengthOf(0);
    });
});
