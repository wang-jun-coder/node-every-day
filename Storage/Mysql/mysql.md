## Mysql

### InnoDB VS MYISAM
* InnoDB 支持事务， MYISAM 不支持
* InnoDB 支持外键，MYISAM 不支持
* InnoDB 支持行级锁，MYISAM 仅支持表锁
* InnoDB 不支持全文索引，MYISAM 支持
* InnoDB 支持崩溃后安全恢复，MYISAM 不支持
* InnoDB 适合插入更新较多的操作，MYISAM 适合插入较多的操作
* 对于自增和 count 操作，MYISAM 最快
* 大多说情况，建议使用 InnoDB

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


-- 复制表
CREATE TABLE employee_tbl1 LIKE employee_tbl;
INSERT INTO employee_tbl1 SELECT * FROM employee_tbl;
-- 可以指定列，列名等
CREATE TABLE employee_tbl2 AS (
	SELECT * FROM employee_tbl
);

-- 相关信息
SELECT VERSION();	-- 显示数据库版本 ：8.0.16
SELECT DATABASE();	-- 显示当前数据库 ：test
SELECT USER();		-- 显示当前用户	：wangjun@172.17.0.1
SHOW STATUS;		-- 显示当前状态	：...

-- 序列的重置与修改
ALTER TABLE employee_tbl DROP id;
ALTER TABLE employee_tbl ADD id BIGINT AUTO_INCREMENT FIRST, ADD PRIMARY KEY(id);
ALTER TABLE employee_tbl AUTO_INCREMENT = 100;

```

### mysql 事务

####ACID  

* **Atomicity** 原子性（不可分割），一个事物内操作，要不全部成功，要不全部失败回滚
* **Consistency** 一致性，在事务开始之前和事务结束以后，数据库的完整性没有被破坏
* **Isolation** 隔离性，多事务并发互相隔离，事务隔离分为不同级别，包括读未提交（Read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）
* **Durability** 持久性，事务执行结束，对数据的操作是永久的

#### Isolation 事务隔离
* **Read uncommitted** 读未提交，可能出现 脏读、不可重复读，幻读
* **read committed** 读提交，可能出现不可重复读，和幻读
* **repeatable read** 可重复读（默认级别），可能出现幻读
* **Serializable** 序列化，不会出现脏读幻读不可重复读等情况

#### 脏读，不可重复读，幻读
* 脏读：事务 a 读取了事务 b 修改但尚未提交的数据，若 b rollback，则 a 读取了无效的数据
* 不可重复读：事务 a 读取数据后事务 b 修改了该数据并提交，导致事务 a 再次获取数据与之前不同
* 幻读：两个完全相同的查询执行时，第二次查询的结果与数第次个数不同

#### 事务语句
* **开启事务** `BEGIN` 或 `START TRANSACTION` 
* **提交事务** `COMMIT` 或 `COMMIT WORK` 
* **回滚事务** `ROLLBACK ` 或 `ROLLBACK WORK` 
* **创建保存点** `SAVEPOINT identifier`可有多个
* **删除保存点** `RELEASE SAVEPOINT identifier` 删除事务保存点，若不存在则报错
* **回滚事至保存点** `ROLLBACK TO identifier` 
* **设置事务的隔离级别** `SET TRANSACTION`InnoDB 存储引擎提供事务的隔离级别有READ UNCOMMITTED、READ COMMITTED、REPEATABLE READ 和 SERIALIZABLE。



```sql
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
### 索引
#### 普通索引

```sql
-- 显示索引
SHOW INDEX FROM big_table;

-- 创建普通索引
CREATE INDEX `CREATE_INDEX_ON_BIG_TABLE_INT1` on big_table (`int1`);
ALTER TABLE big_table ADD INDEX `CREATE_INDEX_ON_BIG_TABLE_INT1`(`int1`);
-- 删除索引
DROP INDEX `CREATE_INDEX_ON_BIG_TABLE_INT1` on big_table;

-- 对于 这样的一条 sql， int1 无索引约 5s，加索引后，约 5ms （db 本地，数据量约 100 万）
SELECT * FROM big_table b where b.int1 > 0 and b.del_flg = 0 order by b.int1 LIMIT 0, 100;
```

#### 唯一索引

唯一索引对应列中不能有重复的行
```sql
CREATE UNIQUE INDEX `CREATE_INDEX_ON_BIG_TABLE_INT2` on big_table (`int2`);
ALTER TABLE big_table ADD UNIQUE INDEX `CREATE_INDEX_ON_BIG_TABLE_INT2`(`int2`);
```

### mysql 函数

#### 字符串函数

```sql
-- 返回字符串第一个字符的 ascii 码
SELECT ASCII(1) as numCode;

-- 返回字符串的字符数
SELECT CHAR_LENGTH('123abc好');	-- 7
SELECT CHARACTER_LENGTH('123abc好'); -- 7

-- 合并字符串
SELECT CONCAT('123', 'abc', '好' );	-- 123abc好
SELECT CONCAT_WS('-', '123', 'abc', '好' ); -- 123-abc-好

-- 返回第一个字符串在后续列表的位置
SELECT FIELD('a', '1','2','3','a','b','c','好'); -- 4

-- 返回在字符串s2中与s1匹配的字符串的位置
SELECT FIND_IN_SET('abc', '123,abc,456'); --2
-- 格式化数字， 保留两位小数
SELECT FORMAT(123456.7, 2); -- 123,456.79

-- 替换字符串
SELECT INSERT('123abc456', 4, 3, 'def');	-- 123def456
SELECT REPLACE('123abc456', 'abc', 'def');  -- 123def456

-- 查询字符串位置
SELECT LOCATE('abc', '123abc456');	-- 4 
SELECT POSITION('abc' in '123abc456'); -- 4

-- 返回从字符串 s 的第 number 个出现的分隔符 delimiter 之后的子串。
-- 如果 number 是正数，返回第 number 个字符左边的字符串。
-- 如果 number 是负数，返回第(number 的绝对值(从右边数))个字符右边的字符串。
SELECT SUBSTRING_INDEX('a-b-c', '-', 2); -- a-b
SELECT SUBSTRING_INDEX('a-b-c', '-', -2); -- b-c

-- 大小写转换
SELECT LCASE('ABc');	-- abc 
SELECT LOWER('ABc');	-- abc 
SELECT UCASE('abC');	-- ABC
SELECT UPPER('abc');	-- ABC

-- 字符串填充
SELECT LPAD('1', 2, '0'); -- 01
SELECT RPAD('1.2', 4, '0'); -- 1.20

-- 去掉空格
SELECT LTRIM('  123abc'); -- 123abc
SELECT RTRIM('123abc   '); -- 123abc
SELECT TRIM('   123abc   '); -- 123abc

-- 字符串截取
SELECT MID('123abc', 4, 3); -- abc
SELECT SUBSTR('123abc', 4, 3); -- abc
SELECT SUBSTRING('123abc', 4, 3); -- abc
SELECT LEFT('123abc', 3); -- 123
SELECT RIGHT('123abc', 3); -- abc 

-- 字符串重复
SELECT REPEAT('123', 3); -- 123123123

-- 反序
SELECT REVERSE('123abc'); -- cba321

-- 返回空格
SELECT SPACE(10); --           十个空格

-- 字符串比较
SELECT STRCMP('123', '456');	-- -1; 比较字符串 s1 和 s2，如果 s1 与 s2 相等返回 0 ，如果 s1>s2 返回 1，如果 s1<s2 返回 -1	

```
#### 数字函数

```sql
-- 数值转换
SELECT PI(); -- 3.141593
SELECT RAND(); -- 0-1 随机
SELECT ABS(-1); -- 1 
SELECT CEIL(1.1);	-- 2 
SELECT CEILING(1.1); -- 2 
SELECT FLOOR(1.9); -- 1
SELECT ROUND(1.5); -- 2
SELECT TRUNCATE(1.5, 2); -- 1.50
SELECT TRUNCATE(1.356, 2); -- 1.35 返回数值 x 保留到小数点后 y 位的值（与 ROUND 最大的区别是不会进行四舍五入）
SELECT DEGREES(PI()/2);	-- 90
SELECT RADIANS(90);	-- 1.5707963267948966
-- 计算
SELECT AVG(id) FROM employee_tbl;	-- 17.2857
SELECT MAX(id) FROM employee_tbl; -- 100
SELECT MIN(id) FROM employee_tbl; -- 1
SELECT SUM(id) FROM employee_tbl; -- 121
SELECT COUNT(id) FROM employee_tbl;	-- 7
SELECT GREATEST(1, 3, 4); -- 4, 最大值
SELECT LEAST(1, 3, 4); -- 1 最小值
SELECT 9 DIV 3;	-- 3
SELECT 9/3; -- 3.0000
SELECT 9+3; -- 12
SELECT MOD(10, 3); -- 1 余数
SELECT SIGN(-1); -- -1 获取符号
-- 三角函数&反三角函数
SELECT ACOS(PI()); -- NULL
SELECT ASIN(0); -- 0 
SELECT ATAN(0); -- 0 
SELECT ATAN2(-0.8, 2);	-- 0.3805063771123649
SELECT COS(2);
SELECT COT(2);
SELECT SIN(2);
SELECT TAN(2);
-- 指数，对数，开方
SELECT EXP(2); -- 7.38905609893065, e 的 2 次方
SELECT LN(2);	-- 0.6931471805599453, 2 的自然对数
SELECT LOG(20.085536923188); -- 3.0000000000000164
SELECT LOG10(100); -- 2
SELECT LOG2(4); -- 2 
SELECT POW(3,2); -- 9
SELECT POWER(3, 2); -- 9
SELECT SQRT(9); -- 3 
```


#### 日期函数

```sql
SELECT ADDDATE('2019-06-16', 100); -- "2019-09-24", 加 天
SELECT ADDTIME('2019-06-16 15:19:00', 100); -- "2019-06-16 15:20:00", 加秒
SELECT CURDATE(); -- 当前日期
SELECT CURRENT_DATE(); -- 当前日期
SELECT CURTIME(); -- 当前时间
SELECT CURRENT_TIME(); -- 当前时间
SELECT CURRENT_TIMESTAMP(); -- 当前日期和时间
SELECT SYSDATE(); -- 当前日期和时间

SELECT DATE('2019-06-16'); -- 从表达式获取日期
SELECT DATEDIFF('2019-06-16', '2019-02-14'); -- 122 单位： 天
SELECT DATE_ADD('2019-06-16 15:19:00', INTERVAL 1 MINUTE); -- "2019-06-16 15:20:00"
SELECT DATE_ADD('2019-06-16 15:19:00', INTERVAL 1 YEAR); -- "2020-06-16 15:19:00", 日期表达式
SELECT DATE_SUB('2019-06-16 15:19:00', INTERVAL 1 YEAR); -- "2018-06-16 15:19:00"

SELECT PERIOD_ADD(201906,2); -- 201908 年月组合添加月
SELECT PERIOD_DIFF(201906,201902); -- 4 年月组合差值
SELECT SUBDATE('2019-06-16 15:19:00', 100); -- "2019-03-08 15:19:00", 100 天前的日期
SELECT SUBTIME('2019-06-16 15:19:00', 100); -- "2019-06-16 15:18:00", 100 秒前的日期
SELECT DATE_FORMAT('2019-06-16 15:19:00', '%Y-%m-%d %r'); -- "2019-06-16 03:19:00 PM"

SELECT YEAR('2019-06-16 15:19:00'); -- 2019
SELECT EXTRACT(YEAR FROM '2019-06-16 15:19:00');
SELECT MONTH('2019-06-16 15:19:00'); -- 6
SELECT MONTHNAME('2019-06-16 15:19:00');  -- "June"
SELECT EXTRACT(MONTH FROM '2019-06-16 15:19:00');
SELECT DAY('2019-06-16 15:19:00'); -- 16
SELECT DAYOFMONTH('2019-06-16 15:19:00'); -- 16
SELECT DAYNAME('2019-06-16 15:19:00'); -- Sunday
SELECT WEEKDAY('2019-06-16 15:19:00'); -- 6, 0 周一， 1 周二
SELECT DAYOFWEEK('2019-06-16 15:19:00'); -- 1 
SELECT DAYOFYEAR('2019-06-16 15:19:00'); -- 167 
SELECT HOUR('2019-06-16 15:19:00'); -- 15
SELECT MINUTE('2019-06-16 15:19:00'); -- 19
SELECT SECOND('2019-06-16 15:19:00'); -- 0 
SELECT TIME('2019-06-16 15:19:00'); -- "15:19:00" 
SELECT WEEK('2019-06-16 15:19:00'); -- 24
SELECT WEEKOFYEAR('2019-06-16 15:19:00'); -- 24
SELECT YEARWEEK('2019-06-16 15:19:00', 24); -- 201924

SELECT FROM_DAYS(36500); -- "0099-12-07", 0000 年 1 月 1 日后 n 天的日期
SELECT TO_DAYS('2019-06-16 15:19:00'); -- 737591
SELECT LAST_DAY("0099-2-07"); -- "0099-02-28" 指定日期对应月的最后一天
SELECT TIME_FORMAT('2019-06-16 15:19:00', '%r'); -- "03:19:00 PM", 按格式转换时间

SELECT LOCALTIME(); -- "2019-06-16 07:32:09" 
select LOCALTIMESTAMP(); -- "2019-06-16 07:32:38"
SELECT NOW(); -- "2019-06-16 07:32:52"

SELECT MAKEDATE(2019, 180); -- "2019-06-29"
SELECT MAKETIME(13, 58, 23); -- "13:58:23"
SELECT MICROSECOND('2019-06-16 15:19:00.000100'); -- 100

SELECT QUARTER('2019-06-16 15:19:00'); -- 2， 季节， 1-4
SELECT SEC_TO_TIME(86400); -- "24:00:00", 秒转时间
SELECT TIME_TO_SEC('24:00:00'); -- 86400
SELECT STR_TO_DATE('August 10 2019', '%M %d %Y'); -- August 10 2017", "%M %d %Y

SELECT TIMEDIFF('24:00:00', '22:00:00'); -- "02:00:00"
```


#### 高级函数

```sql
-- 判断
SELECT CASE
 WHEN 1 > 0 
 	THEN '1>0'
 WHEN 2 > 0
 	THEN '2>0'
 ELSE '3>0'
 END; -- "1>0"
 
 SELECT IF(0, '0', '1'); -- 1,
 SELECT IFNULL(NULL, 's'); -- s, 第一个参数为 null， 则返回第二个参数
 SELECT ISNULL(NULL); -- 1 
 SELECT NULLIF('1', '1'); -- NULL, 两字符串相等，则返回 null， 否则返回第一个参数
SELECT COALESCE(NULL, 1, NULL, 2); -- 1, 从左往右， 第一个非空表达式

-- 转换
SELECT BIN(15); -- "1111"
SELECT BINARY('hello'); -- "hello" 
SELECT CAST('2019-06-16 15:52:33' AS DATE); -- "2019-06-16"
SELECT CONV('a', 16, 10); -- 10, 16 进制字符串 a, 转换十进制
SELECT CONVERT('哈哈哈' USING gbk); -- 将字符串的字符集转换为 gbk

-- 系统相关
SELECT CONNECTION_ID(); -- 73, 服务器连接数
SELECT CURRENT_USER(); -- "wangjun@%"
SELECT DATABASE();  -- test 
SELECT LAST_INSERT_ID(); -- 100
SELECT SESSION_USER(); -- "wangjun@172.17.0.1"
SELECT SYSTEM_USER(); -- "wangjun@172.17.0.1"
SELECT USER(); -- "wangjun@172.17.0.1"
SELECT VERSION(); -- "8.0.16"
```

#### 运算符
```sql
-- 四则运算
SELECT 1+2;
SELECT 1-2;
SELECT 1/2; -- 0.5000
SELECT 1 DIV 2; -- 0 
SELECT 1 % 2; -- 1 
SELECT 1 MOD 2; -- 1 


-- 判断
SELECT 1=1; -- 1 
SELECT 1 != 1; -- 0 
select 1 <> 1; -- 0 
SELECT 1 > 1; 
SELECT 1 < 1;
SELECT 1 >= 1;
SELECT 1 <= 1;
SELECT 1 BETWEEN 1 and 2; -- 1 
SELECT 1 NOT BETWEEN 2 AND 3; -- 1 
SELECT 1 in (1, 2, 3); -- 1 
SELECT 1 NOT IN (2, 3); -- 1 

SELECT NULL = NULL; -- NULL
SELECT NULL <=> NULL; -- 1 
SELECT 0 = NULL; -- NULL;

SELECT '1' LIKE '1%'; -- 1 
SELECT '1' REGEXP '^1$'; -- 1 
SELECT '1' RLIKE '^1$'; -- 1 
SELECT 0 IS NULL; -- 0 
SELECT 0 IS NOT NULL; -- 1 

-- 逻辑运算
SELECT 1 and 2; -- 1 
SELECT 1 and 0; -- 0 
SELECT 1 OR 0; -- 1 
SELECT 1 XOR 2; -- 0 
SELECT NOT 1; -- 0 

-- 位运算
SELECT 1 & 2; -- 0;
SELECT 1 | 2; -- 3
SELECT 1 ^ 2; -- 3 
SELECT !1; -- 0 
SELECT 1 << 1; -- 2;
SELECT 2 >> 1; -- 1 
```



























