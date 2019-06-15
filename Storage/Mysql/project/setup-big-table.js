const mysql      = require('mysql');
// const cluster = require('cluster');
//
// if (cluster.isMaster) {
//     const len = process
// }

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'wangjun',
    password : '123456',
    port     : '3307',
    database : 'test'
});

async function  insetIntoBigTable() {
    /**
    CREATE TABLE `big_table` (
        `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
        `int1` INT,
        `int2` INT,
        `int3` INT,
        `int4` INT,
        `int5` INT,
        `char` CHAR,
        `varchar` VARCHAR(500),
        `text` TEXT,
        `medium_text` MEDIUMTEXT,
        `create_time` DATETIME,
        `update_time` TIMESTAMP,
        `del_flg` TINYINT DEFAULT 0
    ) engine=InnoDB charset=utf8mb4 */

    function randomNum(min, max) {
        return Math.random() * (max-min) + min;
    }

    function randomInt(min, max) {
        const int = Math.round(randomNum(min, max));
        return Number(int.toFixed(0));
    }

    function randomStr(len) {
        len = len || 32;
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let ret = ``;
        for (let i = 0; i < len; i++) {
            ret += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return ret;
    }
    function zeroPrefix(num, len) {
        let str = num+'';
        return str.length >= len ? str : '0'.repeat(len-str.length)+str;
    }

    function randomDatetime() {
        const year = randomInt(1970, 2019);
        const month = zeroPrefix(randomInt(1, 12), 2);

        let maxDay = 30;
        if (Number(month) === 2) {
            maxDay = 28;
        }
        if ([1, 3, 5, 7, 8, 10, 12].includes(Number(month))) {
            maxDay = 31;
        }
        const day = zeroPrefix(randomInt( 1, maxDay),2);
        const hour = zeroPrefix(randomInt(0, 23), 2);
        const minute = zeroPrefix(randomInt(0, 59), 2);
        const second = zeroPrefix(randomInt(0, 59), 2);
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }

    const minInt = -2147483647;
    const maxInt = 2147483647;
    const sql = `
       INSERT INTO \`test\`.\`big_table\` 
            (\`int1\`, \`int2\`, \`int3\`, \`int4\`, \`int5\`, \`char\`, \`varchar\`, \`text\`, \`medium_text\`, \`create_time\`, \`update_time\`, \`del_flg\`) 
       VALUES (
           '${randomInt(minInt, maxInt)}', 
           '${randomInt(minInt, maxInt)}', 
           '${randomInt(minInt, maxInt)}', 
           '${randomInt(minInt, maxInt)}', 
           '${randomInt(minInt, maxInt)}', 
           '${randomStr(1)}', 
           '${randomStr(300)}', 
           '${randomStr(300)}', 
           '${randomStr(3000)}', 
           '${randomDatetime()}', 
           '${randomDatetime()}', 
           '${randomInt(0,1)}'
       );
    `;
    return  new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                console.log(sql);
                return reject(error)
            }
            return  resolve(results);
        });
    });
}


const insertRows = async (con, rows) => {
    for (let i = 0; i < rows; i++) {
        await insetIntoBigTable(con);
    }
};
connection.connect(function (err, ok) {
    if (err) return  console.log(err);
    insertRows(connection, 1000000)
        .then(() => {
            console.log(`insert complete`);
            connection.end()
        })
        .catch(e => {
            console.log(e);
            connection.end();
        });
});


