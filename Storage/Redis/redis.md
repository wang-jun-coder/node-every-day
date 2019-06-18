## redis

### redis vs memcached
* memcached 只支持key-value， redis 有相对丰富的数据类型
* memcached 内存数据库，断电丢失，redis 支持持久化（rdb，aof）可恢复
* memcached 不支持事务，redis 支持事务操作
* memcached 多线程，redis 单线程
* memcached 使用物理内存，redis 则是物理内存+交换内存
* memcached 不支持分布式集群，redis 支持



### [安装](https://hub.docker.com/_/redis)
```bash
docker pull redis 
docker run \
# 设置名称
--name redis-latest \
# 映射本机端口 6378 给 docker 6379，使得 redis 可访问
-p 6378:6379 \
# 映射当前目录
-v $PWD/data:/data \
-d redis:latest \
redis-server \
# 开启 aof
--appendonly yes \
# 设置密码
--requirepass 123456 \
# 设置 db 个数，默认 16
--databases 64

docker stop redis-latest
docker rm redis-latest
```

### redis 持久化
#### 持久化类型
* RDB
	* 在指定的时间间隔内生成数据集的时间点快照
* AOF 
	* 记录服务器所有写操作命令，新命令追加到文件末尾。
	* 可以在后台对 AOF 文件进行重写，使得 AOF 文件体积不会超过保存数据集状态所需的实际大小
* RDB + AOF
	* 优先使用 AOF 还原数据集，通常 AOF 比 RDB 文件保存的数据集更完整
* 不使用持久化，数据仅存在服务器运行时

### 优缺点
* RDB
	* 适合备份，保存了 redis 某个时间点的数据集，方便还原指定版本
	* 文件紧凑，适合用于灾难恢复
	* 最大化性能，保存 RDB 时仅需要 fork 子进程，父进程无需 io 操作
	* 恢复速度相比 AOF 快
	* 故障时丢失数据，保存时间点间隔不能过近（至少 5 分钟）
	* 数据集较大 fork 可能耗时过长
	
* AOF
	* 完整性高，默认每秒一次保存，仍可保持良好性能，最多只丢失 1s 数据
	* append only，不需要 seek 文件操作
	* 自动重写，新的 AOF 文件保存恢复当前数据集最小的命令集合
	* 有序保存所有写操作，便于分析读取
	* aof 文件通常大于 rdb
	* aof 速度可能慢于 rdb
	* 可能部分写命令阻塞导致数据恢复异常




### [redis 基本使用](http://redisdoc.com/)

```bash
# 字符串
SET key value EX 100 # 100s 后过期， EX 可换 PX， 单位为毫秒
SET key value NX  # 当 key 不存在才插入，成功 OK 失败 nil， XX 存在才插入
SETNX key value # key 不存在才操作，成功 1， 失败 0
SETEX key 100 value # 设置 key， 100s 后过期
PSETEX key 10000 value # 设置 key 10000ms 后过期
GET key # 获取 key 对应字符串的值，不存在，nil， 非字符串 报错
GETSET key new-value #设置 key 新值，并返回旧值
STRLEN key # 返回字符串值的长度，不存在为 0，非字符串报错
APPEND key # 追加 key 对应的字符串值，不存在相当 set，存在则拼接，非字符串报错
SETRANGE key 5 redis # 从 key 对应的字符串值的第五位开始用 redis 覆盖，返回新字符串长度，若 key 不存在当空字符串处理，若 5 大于原字符串长度，缺少的用零字节`\x00`填充
GETRANGE key 0 4 # 获取 key 【0，4】范围的字符串值，若大于字符串长度则忽略
GETRANGE key -1 # 获取 key 对应字符串值的最后一位，不支持嵌套
INCR key #对 key 对应的值加一，返回+1 后的值，key 不存在认为 0，key 对应值不能转为整数，报错，范围 64 位有符号整数。
INCRBY key 3 # 类似INCR，只是值一次+3
INCRBYFLOAT key 3.3 # 类似 INCR，浮点型+3.3，最多只保留小数点后 17 位，若值不为字符串或不能解释成双精度浮点型，则报错, 64位有符号数字内
DECR key # INCR 相反操作
DECRBY key 2 # INCRBY 相反操作
MSET key1 value1 key2 value2 # 一次设置多个key-value
MSETNX key1 value1 key2 value2 #给定键都不存在，才设置，即使有一个存在，也不设置
MGET key1 key2 # 获取多个 key 对应的值

# hash 
HSET key field value # 设置 key 对应一个 hash，其 field 为 value
HSETNX key field value # 不存在才操作，成功返回 1 失败 0
HGET key field # 获取 key 对应的 hash 的 field 对应的值，不存在 nil
HEXISTS key field # 判断 key 对应的 hash 是否存在 field
HDEL key field1 field2 # 删除 key 对应的 hash 的 field1 field2，不存在的 field 被忽略
HLEN key # 返回 key 对应 hash 中 field 的数量
HSTRLEN key field # 返回 key 对应 hash 中 field 1 对应字符串长度
HINCRBY key field 10 # 对 field 值 +10， 64 位(bit)有符号数字范围内， 类似INCRBY
HINCRBYFLOAT key field 3.2 # 对应 field 值 +3.2， 类似 INCRBYFLOAT
HMSET key field1 value1 field2 value2 # 一次设置多个 field
HMGET key field1 field2 # 一次获取多个 field，key 不存在当做空表处理，返回 nil 列表
HKEYS key # 返回 key 对应 hash 的所有 filed
HVALS key # 返回 key 对应 hash 的所有 value
HGETALL key # 以 【key1 value1 key2 value2】 返回 hash 数据，不存在的 key 返回空列表
 HSCAN key 0 MATCH * COUNT 10 # 迭代获取 key 对应的 hash 值， 与 SCAN 类似

# 列表
LPUSH key value1 value2 # key 不存在则创建，value从左到右依次插入表头
LPUSHX key value1 value2 # 当且仅当 key 存在，且是一个列表，才插入
RPUSH key value1 value2 # 类似LPUSH，但插入表尾
RPUSHX key value1 value2 # 类似 LPUSHX，但插入表尾
LPOP key # 移除并返回 key 的表头元素，不存在 nil
RPOP key # 类似LPOP，返回表尾
RPOPLPUSH key1 key2 # 移除key1 表尾元素，作为 key2 的表头，并返回该值，key1 不存在，返回 nil 不做其他操作
LREM greet 2 hello # 表头向表尾搜索，移除 2 个与 hello 相等的元素，数字大于 0 从表头向表尾，小于 0 反向，等于零，移除所有
LLEN greet # 获取列表长度，不存在返回 0，类型不对，返回错误
LINDEX greet 2 # 获取 greet 列表 下标为 2 的元素，负数从表尾开始
LINSERT greet BEFORE morning hello # 向 greet 的 morning 前 插入 hello ， 可用 AFTER，返回插入后的列表长度
LSET greet 1 hello # 将列表 greet 下标为 1 的元素设置为 hello，超出范围或空列表将报错
LRANGE greet 0 12 # 返回greet 列表 0 到 12 的元素，可用负数标识倒数
LTRIM greet 0 12 # 仅保留闭区间内的元素，删除其他元素，可用负数标识倒数
BLPOP greet1 greet2 100 # 阻塞获取列表元素，列表无元素则等待，直到超时或有元素插入，只有当 greet1 greet2 均为空表才会阻塞，在事务中不阻塞
BRPOP greet1 100 # 同 BLPOP，但是取表尾
BRPOPLPUSH list1 list2 10 # POPLPUSH 的阻塞版本，当list1为空时阻塞

# set 集合
SADD key value1 value2 # 将 value1 value2 加入集合 key 中，已存在元素会忽略，key 为空则创建集合，非集合类型报错
SISMEMBER key value1 # 判断 value1 是否为集合 key 的成员，是返回 1 不是返回 0
SPOP key # 随机返回并移除集合内的一个元素，不存在或空集合返回 nil
SRANDMEMBER key 12 # 随机返回集合内的元素，数字大于零，最大返回集合元素列表，为负数，返回列表可能有重复，长度为数字绝对值，不传默认为 1
SREM key value # 移除 key 集合中的 value 元素，可跟多个，不存在则忽略，key 非集合，返回错误
SMOVE set set1 value # 将 set 中的 value 移动到 set1 集合中，set 不存在或不包含 value，则无操作，若 set1 存在value，仅删除 set 中的 value
SCARD key # 返回 key 对应集合的数量，不存在返回 0
SMEMBERS set # 返回 set 中的所有成员
SSCAN key 0 MATCH * COUNT 1 # 迭代获取集合中的元素，类似 scan
SINTER set1 set2 # 求多个集合的交集，不存在的视为空集合
SINTERSTORE set set1 set2 # 将 set1 set2 的交集存储到 set 中，若 set 存在则会覆盖
SUNION set1 set2 # 求集合的并集
SUNIONSTORE set set1 set2 # 求并集并存储至 set
SDIFF set1 set2 # 求集合差集
SDIFFSTORE set set1 set2 # 求差集并存至 set

# 有序集合 
ZADD set 0 value0 1 value1 # 以 score value 的形式，加入有序集合 set 中
ZSCORE set value1 # 获取集合元素的 score 值
ZINCRBY set 10 value1 # 给 set 的元素加指定分数
ZCARD set # 返回有序集合的长度
ZCOUNT set 0 10 # 返回分数在【0，10】之间的元素个数
ZRANGE set 0 10 WITHSCORES # 正序（正序）获取第 0 至 10 元素，WITHSCORES 指定返回分值
ZREVRANGE set 0 10 WITHSCORES # 逆序（递减）获取元素
ZRANGEBYSCORE set (0 12 WITHSCORES LIMIT 0 10 # 根据分值范围返回元素集合，可通过( 标记开区间，支持 -inf 和 +inf，WITHSCORES 控制是否返回分值，limit 类似 sql
ZREVRANGEBYSCORE set (0 12 WITHSCORES LIMIT 0 10 # 逆序获取， 类似 ZRANGEBYSCORE 
ZRANK set value # 返回 value 在 set 中的排名（从小到大排序），最大为 0
ZREVRANK set value # 返回排名，类似ZRANK ss（从大到小），最大为 0
ZREM set value1 value2 # 移除 set 中的 value1 value2 元素，不存在的 value 会被忽略
ZREMRANGEBYRANK set 0 12 # 按排名范围移除集合内的元素，负数标识倒数，从 0 开始，（从小到大排序）
ZREMRANGEBYSCORE set 0 12 # 移除分值闭区间内的元素，可用(控制开区间
ZRANGEBYLEX set 0 12 LIMIT 0 1 # 获取分值再闭区间的元素，相同分值使用字典序，- + 分别标识正负无穷， ( [ 指定区间开闭，可用元素代替分值，limit 类似 sql
ZLEXCOUNT set 0 12 # 类似 ZRANGEBYLEX，但返回个数
ZREMRANGEBYLEX set 0 12 # 类似 ZRANGEBYLEX 但是删除这些元素，并返回删除的个数
ZSCAN set 0 MATCH * COUNT 10 # 类似 scan，返回元素和分值的集合
ZUNIONSTORE salary 2 programmer manager WEIGHTS 1 3 SUM # 求两个有序集的并集，这两个集合分别为 programmer 和 manager，programmer 的分值*1，manager 集合的分值 *3，salary 分值为元素各子集的分值和 
ZINTERSTORE sum_point 2 mid_test fin_test # 类似ZUNIONSTORE，但是求交集

# HyperLogLog 估算个数使用，如统计 pv uv 等
PFADD uv a b c # 向 uv 这个 HyperLogLog 中添加元素，HyperLogLog 可能会更新
PFCOUNT uv # uv 这个 HyperLogLog 包含的唯一元素的近似数量
PFMERGE all pv uv # 将 pv uv 合并到 all 中

# 地理位置
GEOADD cn 13.361389 38.115556 p1 # 向 cn 中添加 p1 元素，并指定经纬度，可同时插入多个
GEOPOS cn p1 p2 # 获取 cn 中 p1 p2 的位置，返回二维数组，若某个 key 不存在，则该数组项为 nil 如: [[13.361389338970184,38.115556],nil]
GEODIST cn p1 p2 km # 获取两个地理位置之间的距离，km 指定单位千米，可用 m，km，mi，ft， 若有一个位置不存在，则返回 nil
GEORADIUS cn 15 37 200 km WITHDIST WITHCOORD # 指定 cn 中，距离 15，37 半径 200km 内的元素列表
GEORADIUS cn p1 200 km WITHDIST WITHCOORD # 类似 GEORADIUS，但是使用 p1 所在的位置作为圆心
GEOHASH cn p1 # 获取位置的 geohash 值

# 位图
SETBIT bitmap 100 1 # 设置bitmap 对应的字符串，第 100 位的值（0、1），位置范围[0, 512M]
GETBIT bitmap 100 # 获取位图指定位置的值
BITCOUNT bitmap 0 100 # 计算字符串指定范围内 设置为 1 的比特位数量，不指定范围则计算整个位图范围
BITPOS bitmap 1 0 100 # 返回位图中第一个值为 1 的二进制位的位置，不指定范围则检测整个位图
BITOP AND bitmap bitmap1 bitmap2 # 对指定位图进行位运算并存至 bitmap，AND、OR、NOT、XOR，只有 not 不支持多个key 运算
BITFIELD mykey INCRBY i8 100 1 GET u4 0 # @see http://redisdoc.com/bitmap/bitfield.html
 
# 数据库相关操作
EXISTS key # 检查 key 是否存在
TYPE key # 检查 key 类型
RENAME key key1 # 重命名 key 为 key1
RENAMENX key key1 # 当 key1 不存在才重命名 key 为 key1
MOVE key 1 # 将指定的 key 移动至 1 号 db
DEL key key1 # 删除多个 key，不存在的 key 会被忽略
RANDOMKEY # 随机返回 db 中的一个 key
DBSIZE # 返回当前 db key 的数量
KEYS * # 返回匹配表达式的所有 key 列表，复杂度较高
SCAN 0 MATCH * COUNT 100 # 迭代获取符合表达式的 key
SORT key # 返回或保存给定列表、集合、有序集合 key 中经过排序的元素 @see http://redisdoc.com/database/sort.html
FLUSHDB # 清空当前 db 下的所有键
FLUSHALL # 清空整个 redis 数据，所有 db 的 key
SELECT 1 # 选中 1 号 db
SWAPDB 0 1 # 交换 db 数据

# 过期
EXPIRE key 100 # 设置 key 100s 后过期
EXPIREAT cache 1560783424 # 设置指定时间戳过期，unix
TTL key # 返回剩余时间 秒，当 key 不存在时，返回 -2 。 当 key 存在但没有设置剩余生存时间时，返回 -1
PERSIST key # 移除生存时间，当生存时间移除成功时，返回 1 . 如果 key 不存在或 key 没有设置生存时间，返回 0
PEXPIRE key 1000 # 设置过期时间，毫秒
PEXPIREAT key 1560783424000 # 设置过期时间戳毫秒
PTTL key # 返回剩余时间，类似 TTL，单位 毫秒

# 事务
MULTI # 开始一个事务，此命令后的多条命令会按先后顺讯放入队列，由 EXEC 命令原子性的执行
EXEC # 执行事务块内的命令，如果某些 key 处于 watch 监视，且事务块中有和这个 key 相关的命令，那么 exec 只在这些 key 没有被其他命令所改动的情况下执行生效，否则事务被打断
DISCARD # 放弃当前事务，若此时 watch 了某些 key，则取消所有 watch
WATCH key1 key2 # 监视一个或多个 key，若在事务执行前这些 key 被其他命令改动，那么事务被打断
UNWATCH # 取消对所有 key 的监视，EXEC 或 DISCARD 先执行，就不需要 UNWATCH 了

# lua 脚本
EVAL "return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}" 2 key1 key2 value1 value2 # 执行一段脚本，指定参数个数，参数名称和对应的值
EVALSHA a42059b356c875f0717db19a51f6aaca9ae659ea 2 k1 k2 v1 v2 # 执行脚本，类似 EVALSHA，若脚本缓存不存在 报错 NOSCRIPT
SCRIPT LOAD "return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}" # 加载 lua 脚本，返回 sha1 校验和，可通过 EVALSHA 执行
SCRIPT EXISTS a42059b356c875f0717db19a51f6aaca9ae659ec a42059b356c875f0717db19a51f6aaca9ae659ea # 判断一个或多个脚本是否存在，返回列表 0 表示不存在， 1 表示存在
SCRIPT FLUSH # 清空脚本缓存
SCRIPT KILL # 关闭当前运行的且没有执行过写操作的脚本，若脚本进行了写操作，且无限循环，只能通过 SHUTDOWN NOSAVE 停止 redis 进程来停止脚本运行

# 持久化
SAVE # 同步保存，rdb，会阻塞所有操作
BGSAVE # 后台异步保存，rdb，fork 子进程保存，保存完毕子进程自动退出
BGREWRITEAOF # 后台执行 aof 重写操作，重新创建 aof，
LASTSAVE # 最近一次 Redis 成功将数据保存到磁盘上的时间，以 UNIX 时间戳格式表示，十位

# pub、sub
PUBLISH channel "this is message form channel" # 向指定频道发送消息
SUBSCRIBE channel1 channel2 # 监听指定频道消息
PSUBSCRIBE channel* new* # 监听符合表达式的频道
UNSUBSCRIBE channel1 channel2 # 取消消息订阅
PUNSUBSCRIBE channel* new* # 取消符合表达式的监听，无参则取消 使用PSUBSCRIBE 订阅的频道 
PUBSUB CHANNELS * # 获取符合表达式的活跃频道列表, 模式订阅的不算
PUBSUB NUMSUB channel1 channel2 # 获取频道订阅者个数
PUBSUB NUMPAT # 客户端订阅的所有模式的数量总和
SLAVEOF 127.0.0.1 6378 # 将当前服务器变为 指定服务器的从服务器
SLAVEOF NO ONE # 不丢弃同步所得，转为主服务器
ROLE # 返回当前服务器角色，master 、 slave 或者 sentinel， 主服务器将返回属下从服务器的 IP 地址和端口。从服务器将返回自己正在复制的主服务器的 IP 地址、端口、连接状态以及复制偏移量。Sentinel 将返回自己正在监视的主服务器列表。

# 客户端与服务器
CONFIG SET requirepass 123456 # 设置密码（建议通过配置文件设置）
AUTH password # 认证密码
QUIT # 关闭连接
INFO # redis 信息
SHUTDOWN SAVE # 保存并关闭，可用 NOSAVE 不保存
TIME # 返回服务器时间，第一个字符串是当前时间戳（10 位），第二个则是当前这一秒已过去的微妙数
CLIENT SETNAME client1 # 为当前链接命名
CLIENT GETNAME # 获取当前链接的名称，未设置则返回 nil
CLIENT LIST # 返回所有连接到服务器的客户端信息和统计数据
CLIENT KILL 127.0.0.1:61312 # 关闭指定客户端链接，数据来源 CLIENT LIST

# 配置相关
CONFIG GET * # 获取符合表达式的 redis 可配置参数列表
CONFIG SET requirepass 123456 # 动态调整redis 配置，立即生效，可配置参数使用 CONFIG GET * 获取
CONFIG RESETSTAT # 重置 info 中的某些统计状态
CONFIG REWRITE # 将当前配置写入 redis.conf 中

# 调试相关
PING # 检测链接是否正常服务器正常返回 PONG
ECHO message # 打印信息，返回 message
OBJECT REFCOUNT key # 返回 key 引用所存储值的次数
OBJECT ENCODING key # 返回 key 的编码类型
OBJECT IDLETIME key # 返回 key 自存储以来空闲的时间，单位：秒
CONFIG get slowlog* # 查看当前 slowlog 的配置
SLOWLOG GET 1 # 查看 slowlog 日志， 数字指定数量，不传则默认 slowlog-max-len
SLOWLOG LEN # 查看当前慢日志列表
MONITOR # 实时输出 redis 接收到的命令
DEBUG OBJECT key # 返回 key 对应的 obeject 信息，内存地址，引用次数，编码类型等
DEBUG SEGFAULT # 崩溃redis，模拟 bug 

# 内部命令
MIGRATE 127.0.0.1 6378 poster_123 0 100 AUTH 123456 COPY # 迁移 key 至指定 redis 的 0 号 db，设置超时 100ms，指定密码 123456， copy 则是保留当前实例 key ，replace 则会删除当前实例的 key
DUMP key # 序列化指定 key
RESTORE r-key 0 "\x00\x05value\b\x008\xdb-\x87h\xb3\x11V" REPLACE # 反序列化某个值到指定键上，并设置 ttl，0 标记不设置过期时间 replace 指定若 key 存在则覆盖，否则若 key 存在则报错
SYNC # 复制功能的内部命令
PSYNC ? -1 # 复制功能的内部命令

```












