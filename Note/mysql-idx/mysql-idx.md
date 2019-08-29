## 索引

### 基本概念

* 定义：索引是一种高效获取数据的数据结构
* mysql 索引类型：B-tree 索引和 hash 索引
	* MyISAM 和 Innodb 存储引擎仅支持 BTREE 索引
	* MEMORY 和 HEAP 存储引擎支持 BTREE 和 hash 索引
* 优缺点
	* 优点
		* 加快查询速度
		* 唯一索引，可保证数据库中每行数据的唯一性
		* 加速表的连接
		* 使用分组和排序子句进行数据查询时，显著减少分组和排序时间
	* 缺点
		* 占用额外空间
		* 降低性能（增删改），索引需动态维护
* 分类
	* 从数据结构角度
		* B+Tree 索引，MyISAM 和 Innodb 存储引擎仅支持 BTREE 索引 
		* hash 索引，效率高，但不能使用范围查询，MEMORY 和 HEAP 存储引擎支持 BTREE 和 hash 索引
		* 全文索引，mysql 5.6 及以后，MyISAM 和 Innodb 都支持
		* R-Tree 索引
	* 从物理存储角度
		* 聚集索引
		* 非聚集索引
	* 从逻辑角度
		* 普通索引：数据库中基本索引类型，允许索引列插入重复值和空值
		* 唯一索引：索引列值必须唯一，允许空值，主键索引是特殊的唯一索引，不许有空值
		* 单列索引：一个索引只包含单个列，一个表可以有多个单列索引
		* 组合索引：在表的多个字段组合上创建的索引，只有在查询条件中使用了这些字段的左边字段时，索引才会被使用
		* 全文索引：在定义索引列上支持值的全文查找，允许索引列中插入重复值或空值，全文索引可在 char varchar 或者 text 类型上创建，
			* mysql 5.6 以前，只有 MyISAM 支持全文索引
			* mysql 5.6 及以后，MyISAM 和 Innodb 均支持全文索引

### explain

* id: select 的序列号，按 select 出现顺序增长，有几个 select 就有几个 id
* select_type: 表示查询中每个 select 子句的类型
	* simple：简单查询，不包含子查询和 union
	* primary：复杂查询中最外层的 select
	* subquery：包含在 select 中的子查询（不在 from 子句中）
	* derived：包含在 from 子句中的子查询，mysql 会将结果存在临时表
* table: 当前行在访问那个表
* partitions：
* type：表示 mysql 在表中找到所需行的方式，又称访问类型
	* 从最优到最差：`system > const > eq_ref > ref > fulltext > ref_or_null > index_merge > unique_subquery > index_subquery > range > index > ALL`
* possible_keys：可能使用到的索引，但未必会使用
* key：实际查询中使用的索引，如未使用索引，则为 null
* key_len：表示索引中使用的字节数，可通过该列计算查询中使用的索引长度
* ref：表示上述表连接的匹配条件，即那些列或常量被用于查找索引列上的值
* rows：估计要读取并检测的行数
* filtered: 返回的结果行占预估行的百分比
* extra：不适合在其他列显示但又十分重要的额外信息

### 索引设计与优化
* 设计原则
	* 最左前缀匹配原则
	* 使用区分度高的列做索引（不同值对应的行占所有列的百分比）
	* 不对索引列进行计算
	* 不对更新十分频繁的列设置索引
	* 不对区分度不大的列设置索引
	* 多表关联的的字段需要建立索引
* 优化注意事项
	* 不走索引的情况
		* 前导模糊， like %xxx
		* 类型转换， 非字符串转换字符串等情况
		* 组合索引情况下，不满足最左匹配
		* 负向条件，如：!=, <>, not in, not exists, not like 等
		* 对索引列进行计算，如 col * 2 = 200


### 参考资料
* [MySQL - 索引详解](https://juejin.im/entry/5a448726f265da43062b10f1)
* [MySQL 表与索引设计攻略](https://juejin.im/post/5b207b026fb9a01e2b2cc8a0#heading-10)
* [mysql explain详解](https://cloud.tencent.com/developer/article/1093229)
* [MySQL索引背后的数据结构及算法原理](http://blog.codinglabs.org/articles/theory-of-mysql-index.html)
