-- ******************************************** lua 基本语法 ********************************************

-- 变量声明
local retTable = {};

-- 取参数
local k1 = KEYS[1];
local k2 = KEYS[2];
local v1 = ARGV[1];
local v2 = ARGV[2];
table.insert(retTable, {k1, k2, v1, v2}); -- ["key1","key2","1","2.3"]

-- 变量声明
local tableIns = {'this', 'is', 'table'};
local luaNil = nil;
local boolean = true
local number = 3.2;
local str = 'this is string';
-- 注意 nil 的位置
table.insert(retTable, {tableIns, boolean, number, str, luaNil}); -- [["this","is","table"],1,3,"this is string"]

-- 类型判断
local tk1 = type(KEYS[1]);
local tk2 = type(KEYS[2]);
local tv1 = type(ARGV[1]);
local tv2 = type(ARGV[2]);
table.insert(retTable, {tk1, tk2, tv1, tv2}); -- ["string","string","string","string"]

-- 类型转换
local numV1 = tonumber(v1);
local numV2 = tonumber(v2);
local str1 = tostring(1.1);
local str2 = 'this'..' is'..' str' -- 字符串拼接
local str2Len = #str2;

table.insert(retTable, {numV1, type(numV1), numV2, type(numV2), str1, type(str1), str2, type(str2), str2Len, type(str2Len)});
-- [1,"number",2,"number","1.1","string","this is str","string",11,"number"]

-- 函数定义
local function factorial(num)
    if num == 0 then
        return 1
    else
        return num * factorial(num-1);
    end
end
table.insert(retTable, factorial(3)); -- 6

-- 多返回值, 返回最大值和其索引
local function max(a) -- 不确定参数个数, 可用 ... 表示变长参数, 类似 js 中的 ...rest
    local index = 1;
    local m = a[index];

    for i, val in ipairs(a) do
        if val > m then
            index = i;
            m = val;
        end
    end
    return m, index
end
local m, index = max({1, 9, 5, 3,7});
table.insert(retTable, {m, index}); -- [9,2]

-- ******************************************** 与redis 交互 ********************************************
local redisTable = {};
table.insert(retTable, redisTable);
-- redis.call(), 执行命令出错, 将导致脚本退出
redis.call('set', 'lua-key1', 'lua-value1');
local rv1 = redis.call('get', 'lua-key1');
table.insert(redisTable, rv1); -- "lua-value1"

-- 一次添加多个数据, 如: zadd set-name 0 a 1 b 等等
local function mAdd(cmd, key, values)
    local args = {cmd, key};
    for i, v in ipairs(values) do
        table.insert(args, v);
    end
    return redis.call(unpack(args));
end

local function randomScoreAndVal(len)
    local random = {}
    for i = 1, len do
        local score = math.random(0, 100);
        local key = 'value'..i;
        table.insert(random, score);
        table.insert(random, key);
    end
    return random;
end

mAdd('zadd', 'zset', randomScoreAndVal(10));
table.insert(redisTable, redis.call('zrange', 'zset', 0, 5, 'WITHSCORES'));
-- ["value3","9","value1","17","value8","37","value5","58","value7","69","value10","75"], zset 随机添加, 所以输出值可能不同

--[[
    redis.pcall(), 执行命令出错, 会返回一个带 err 域的 lua table
    lua 脚本返回值只能是数组, 如果是 带域的 table 会被忽略
    脚本执行时,会被 redis 封装成一个 lua 函数进行执行
    redis 对 lua 有一定限制, 比如不能声明全局变量??
--]]

table.insert(redisTable, redis.pcall('zrange')['err']);
-- "@user_script: 109: Wrong number of args calling Redis command From Lua script"

return retTable;
