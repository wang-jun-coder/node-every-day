const mysql = require('mysql');
const util = require('util');
const connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'wangjun',
    password : '123456',
    port     : '3307',
    database : 'test'
});
connection.connect(); // 链接数据库

// promisify
const beginTransAction = async connection => {
    return util.promisify(connection.beginTransaction).call(connection);
};
const commitTransaction = async connection => {
    return util.promisify(connection.commit).call(connection);
};
const rollbackTransaction = async connection => {
    return util.promisify(connection.rollback).call(connection);
};
const execSql = async (connection, sql) => {
    return  util.promisify(connection.query).call(connection, sql);
};

// demo
const transfer = async () => {
    /**
     CREATE TABLE `employee_tbl` (
         `id` bigint(20) NOT NULL AUTO_INCREMENT,
         `name` char(10) NOT NULL DEFAULT '',
         `date` datetime NOT NULL,
         `singin` tinyint(4) NOT NULL DEFAULT '0' COMMENT '登录次数',
         `balance` bigint(20) DEFAULT '0',
         PRIMARY KEY (`id`)
     ) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8
     * */
    /**
     INSERT INTO `employee_tbl`
        (`id`, `name`, `date`, `singin`, `balance`)
     VALUES
         ('1', '小明', '2016-04-22 15:25:33', '1', '0'),
         ('2', '小王', '2016-04-20 15:25:47', '3', '300'),
         ('3', '小丽', '2016-04-19 15:26:02', '2', '100');
     * */

    // case1 小王转账 200 给小明, 余额足够, 要不转账成功要不失败

    try {
        // 开启事务
        await beginTransAction(connection);
        const wangInfo = await execSql(connection, 'select balance from employee_tbl where id = 2');
        if (!wangInfo || !wangInfo[0] || !wangInfo[0].balance || wangInfo[0].balance < 200) {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error(`余额不足`);
        }
        // - 200
        await execSql(connection, 'update employee_tbl set balance = balance-200 where id = 2 ');
        // + 200
        await execSql(connection, 'update employee_tbl set balance = balance+200 where id = 1');

        // 提交事务
        await commitTransaction(connection);
    } catch (e) {
        console.log(`wang transfer to ming err: ${e}`);
        await rollbackTransaction(connection);
    }


    try {
        // 开启事务
        await beginTransAction(connection);
        const liInfo = await execSql(connection, 'select balance from employee_tbl where id = 3');
        if (!liInfo || !liInfo[0] || !liInfo[0].balance || liInfo[0].balance < 200) {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error(`余额不足`);
        }
        // - 200
        await execSql(connection, 'update employee_tbl set balance = balance-200 where id = 3 ');
        // + 200
        await execSql(connection, 'update employee_tbl set balance = balance+200 where id = 1');
        // 提交事务
        await commitTransaction(connection);
    } catch (e) {
        console.log(`li transfer to ming err: ${e}`);
        await rollbackTransaction(connection);
    }
};


transfer()
    .then(() => {
        console.log('transfer success');
        connection.end();
    })
    .catch(e => {
        console.log(`transfer err: ${e}`);
        connection.end();
    });
