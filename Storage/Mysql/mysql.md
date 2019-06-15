## Mysql

### 安装

基于 docker 可以很快速方便的安装部署 mysql, [这是一个简单的教程](https://www.runoob.com/docker/docker-install-mysql.html)

```bash
# 拉取最新版镜像, 或指定镜像 mysql：5.6
docker pull mysql	

# 启动 docker
docker run \	
-p 3307:3306 	\						# 此处由于我本地3306 已占用，转用 3307
--name mysql-latest \					# 命名容器名称，便于操作
-v $PWD/conf:/etc/mysql/conf.d \		# 映射当前目录下的 conf 到 mysql 的 conf.d MySQL(5.7.19)的默认配置文件是 /etc/mysql/my.cnf 文件。如果想要自定义配置，建议向 /etc/mysql/conf.d 目录中创建 .cnf 文件。新建的文件可以任意起名，只要保证后缀名是 cnf 即可。新建的文件中的配置项可以覆盖 /etc/mysql/my.cnf 中的配置项。
-v $PWD/logs:/logs \					# 映射 log
-v $PWD/data:/var/lib/mysql \			# 映射数据
-e MYSQL_ROOT_PASSWORD=123456 \			# 设置默认密码
-d \									# 后台运行
mysql									# 指定镜像（mysql:5.6）

# 进入 mysql 容器
docker exec -it mysql-latest bash

# 关闭 mysql 容器
docker stop mysql-latest
docker rm mysql-latest

# mysql 登录, 然后输入密码
mysql -u root -p 

# 创建远程用户
CREATE USER 'wangjun'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'wangjun'@'%';

# 修改用户密码
ALTER USER 'wangjun'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
```
### 基本使用

```sql
-- 显示 db 列表
SHOW DATABASES;

-- 选择要操作的数据库
USE mysql;

-- 显示当前数据库的所有表
SHOW TABLES;

-- 显示 user 表的所有列
SHOW COLUMNS FROM user;

-- 显示 user 表的所有索引
SHOW INDEXES FROM user 

-- 显示数据库内表状态信息
SHOW TABLE STATUS from mysql;

-- 创建数据库
CREATE DATABASE test;

-- 创建一张表
CREATE TABLE IF NOT EXISTS `num_type`  (
	`num_id` BIGINT UNSIGNED AUTO_INCREMENT COMMENT '极大无符号整数值，自增主键',
	`tiny_int` TINYINT COMMENT '小整数值，1 字节',
	`small_int` SMALLINT COMMENT '大整数值，2 字节',
	`medium_int` MEDIUMINT COMMENT '大整数值，3 字节',
	`intger` INT COMMENT '大整数值，4 字节',
	`big_int` BIGINT COMMENT '极大整数值，8 字节',
	`float` FLOAT COMMENT '单精度浮点型，4 字节',
	`double` DOUBLE COMMENT '双精度浮点型，8 字节',
	`decimal` DECIMAL COMMENT '小数值，对DECIMAL(M,D) ，如果M>D，为M+2否则为D+2',
	PRIMARY KEY (`num_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `time_type`(
	`time_id` BIGINT UNSIGNED AUTO_INCREMENT,
	`date` DATE COMMENT '日期值，3 字节，YYYY-MM-DD，1000-01-01/9999-12-31',
	`time` TIME COMMENT '时间值，3 字节，HH:MM:SS， -838:59:59/838:59:59',
	`year` YEAR COMMENT '年份值，YYYY，1901、2155',
	`date_time` DATETIME COMMENT '混合日期时间值 八字节，YYYY-MM-DD HH:MM:SS，1000-01-01 00:00:00/9999-12-31 23:59:59',
	`time_stamp` TIMESTAMP COMMENT '时间戳，4 字节，1970-01-01 00:00:00/2038 结束时间是第 2147483647 秒，北京时间 2038-1-19 11:14:07，格林尼治时间 2038年1月19日 凌晨 03:14:07',
	PRIMARY KEY(`time_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

CREATE TABLE IF NOT EXISTS `str_type` (
	`str_id` BIGINT UNSIGNED AUTO_INCREMENT,
	`char` CHAR COMMENT '定长字符串，0-255 字节',
	`var_char` varchar(100) COMMENT '变长字符串，0-65535 字节',
	`tiny_text` TINYTEXT COMMENT '短文本字符串，0-255 字节',
	`text` TEXT COMMENT '长文本数据，0-65535 字节',
	`medium_text` MEDIUMTEXT COMMENT '中等长度文本数据，0-16 777 215字节',
	`long_text` LONGTEXT COMMENT '极大文本数据，0-4 294 967 295字节',
	`tiny_blob` TINYBLOB COMMENT '0-255个字符的二进制字符串',
	`medium_blob` MEDIUMBLOB COMMENT '二进制形式中等长度文本字符串，0-16 777 215字节',
	`blob` BLOB COMMENT '二进制形式长文本数据，0-65535 字节',
	`long_blob` LONGBLOB COMMENT '二进制形式极大文本数据，0-4 294 967 295字节',
	PRIMARY KEY (`str_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

-- 删除 test 数据库
DROP DATABASE test;

-- 删除 test 表
DROP TABLE test

-- 插入记录
INSERT INTO `num_type` (`tiny_int`, `small_int`, `medium_int`, `intger`, `big_int`, `float`, `double`, `decimal`) values (127, 32767, 8388607, 2147483647, 9223372036854775807, 1.333333333333333, 1.333333333333333, 1.333333333333333);
INSERT INTO `num_type` VALUES (NULL, 127, 32767, 8388607, 2147483647, 9223372036854775807, 1.333333333333333, 1.333333333333333, 1.333333333333333);

-- 查询记录
SELECT * FROM `num_type`;
SELECT `tiny_int`, `big_int` FROM `num_type`;

-- where
SELECT `tiny_int`, `big_int` FROM `num_type` WHERE `num_id` > 1;

-- update
update `num_type` set `tiny_int`=-11 where `num_id`=2;
update `num_type` set `tiny_int`=`tiny_int`+1 where `num_id`=2;
UPDATE `str_type` SET `tiny_text`=REPLACE(`tiny_text`, '1', '22') where `str_id`=1;
update `num_type` num, `str_type` str set num.`tiny_int` = 3, str.`char`= str.`char`+3 where num.`num_id`>0 and str.`str_id`>0;

-- delete 
DELETE FROM `num_type` WHERE `num_id` = 2;

-- like
-- %：表示任意 0 个或多个字符。可匹配任意类型和长度的字符
-- _：表示任意单个字符。匹配单个任意字符，它常用来限制表达式的字符长度语句。
-- []：表示括号内所列字符中的一个（类似正则表达式）。指定一个字符、字符串或范围，要求所匹配对象为它们中的任一个。
-- [^] ：表示不在括号所列之内的单个字符。其取值和 [] 相同，但它要求所匹配对象为指定字符以外的任一个字符。特殊字符（如： “%”、“_”、“[”）也有效
select * FROM `study_schedule` WHERE `link` like 'n%';

-- union
SELECT a.country FROM apps a WHERE a.id > 1
-- UNION ALL 	-- 包括重复数据
UNION -- 不包括重复数据 
SELECT w.country FROM Websites w WHERE w.id >= 1;

-- order by
-- DESC 从大到小；ASC 从小到大

SELECT * FROM apps WHERE id > 0 ORDER BY id DESC;

-- group by
SELECT `name`, count(`name`) FROM `employee_tbl`  GROUP BY `name`;
-- WITH ROLLUP， 可以实现在分组统计数据基础上再进行相同的统计, 
-- coalesce(a,b,c), 如果a==null,则选择b；如果b==null,则选择c；如果a!=null,则选择a；如果a b c 都为null ，则返回为null（没意义）
SELECT COALESCE(`name`, '总数'), count(`name`), sum(`singin`) FROM `employee_tbl` GROUP BY `name` with ROLLUP;


-- inner join 获取两个表中字段匹配关系的记录
SELECT
emp.name,
addr.addr
FROM employee_tbl emp 
INNER JOIN employee_addr addr 
WHERE addr.emp_id = emp.id;

SELECT
emp.name,
addr.addr
FROM employee_tbl emp, employee_addr addr 
WHERE addr.emp_id = emp.id;

-- left join 获取左表所有记录，即使右表没有对应匹配的记录
SELECT
emp.name,
addr.addr
FROM employee_tbl emp 
LEFT JOIN employee_addr addr 
ON addr.emp_id = emp.id;

-- right join 获取右表所有记录，即使左表没有对应匹配的记录
SELECT
emp.name,
addr.addr
FROM employee_tbl emp 
RIGHT JOIN employee_addr addr 
ON addr.emp_id = emp.id;

-- alter
ALTER TABLE employee_tbl ADD col INT;
ALTER TABLE employee_tbl MODIFY col BIGINT;
ALTER TABLE employee_tbl ALTER col SET DEFAULT 1000;
ALTER TABLE employee_tbl CHANGE col col1 VARCHAR(50);
ALTER TABLE employee_tbl DROP col1;
ALTER TABLE employee_tbl RENAME employee_tbl1;
ALTER TABLE employee_tbl1 RENAME employee_tbl;
ALTER TABLE employee_tbl engine=MYISAM;
ALTER TABLE employee_tbl engine=InnoDB;


```

### mysql 事务

####ACID  

* **Atomicity** 原子性（不可分割），一个事物内操作，要不全部成功，要不全部失败回滚
* **Consistency** 一致性，在事务开始之前和事务结束以后，数据库的完整性没有被破坏
* **Isolation** 隔离性，多事务并发互相隔离，事务隔离分为不同级别，包括读未提交（Read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）
* **Durability** 持久性，事务执行结束，对数据的操作是永久的

#### 事务语句
* **开启事务** `BEGIN` 或 `START TRANSACTION` 
* **提交事务** `COMMIT` 或 `COMMIT WORK` 
* **回滚事务** `ROLLBACK ` 或 `ROLLBACK WORK` 
* **创建保存点** `SAVEPOINT identifier`可有多个
* **删除保存点** `RELEASE SAVEPOINT identifier` 删除事务保存点，若不存在则报错
* **回滚事至保存点** `ROLLBACK TO identifier` 
* **设置事务的隔离级别** `SET TRANSACTION`InnoDB 存储引擎提供事务的隔离级别有READ UNCOMMITTED、READ COMMITTED、REPEATABLE READ 和 SERIALIZABLE。

```js
BEGIN;
INSERT INTO transaction_test VALUES (7);
INSERT INTO transaction_test VALUES (8);
COMMIT;


BEGIN;
INSERT INTO transaction_test VALUES (9);
INSERT INTO transaction_test VALUES (10);
ROLLBACK;
COMMIT;
```































