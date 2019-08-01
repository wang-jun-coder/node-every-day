### InnoDB VS MYISAM
#### InnoDB 支持事务， MYISAM 不支持

* myisam 强调性能，查询速度快，不支持事务
* innoDB 提供事务支持

#### InnoDB 支持行级锁，MYISAM 仅支持表锁
* myisam 仅支持表锁
* InnoDB 支持行级锁和表级锁，行锁大幅度提高了并发性能，需注意，InnoDB 若不能确定扫描范围，也会锁全表

#### 对于自增和 count 操作，MYISAM 最快
* myisam 记录了行数，查询速度非常快
* innodb 需要扫描表才能计算行数
* 注意 innodb 最大 id 丢失的问题
	* 新建表，设置 ID 自增主键
	* insert 10 条记录，删除两条（目前已保留数据最大 id 是 8，实际自增主键最大 id 10）
	* 重启 mysql，再次 insert 
	* 此时 id 变成了 8，丢失了 10 的信息（myisam 不会丢失）

#### 存储结构不同
* myisam 每个表存储三个文件，
	* .frm 存储表定义
	* .myd 存储数据
	* .myi 存储索引
* Innodb 存储一个文件中（分区表可存储多个）

#### 存储空间
* myisam 可以被压缩，存储空间较小，支持 静态表，动态表，压缩表
* innodb 需要更多的内存和存储，因其会在主内存中建立专用的缓冲池用于高速缓冲数据和索引

#### 表主键
* myisam 允许无索引和主键的表存在
* innodb 没有设置主键或非空唯一索引，会自动生成一个六个字节的主键（用户不可见）

#### ~~InnoDB 不支持全文索引，MYISAM 支持~~
* innodb 从 mysql 5.6 开始提供全文索引的支持

#### InnoDB 支持外键，MYISAM 不支持
#### InnoDB 支持崩溃后安全恢复，MYISAM 不支持
#### InnoDB 适合插入更新较多的操作，MYISAM 适合插入较多的操作
#### 大多数情况，建议使用 InnoDB
