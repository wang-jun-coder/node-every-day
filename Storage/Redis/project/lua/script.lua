
-- ******************************************** lua 基本语法 ********************************************

-- 变量声明
local key = {KEYS[1],KEYS[2]};
local value = {ARGV[1],ARGV[2]};

local table = {'this', 'is', 'table'};
local luaNil = nil;
local boolean = true
local number = 3.2;
local str = 'this is string';



-- 类型判断
local tk1 = type(KEYS[1]);
local tk2 = type(KEYS[2]);
local tv1 = type(ARGV[1]);
local tv2 = type(ARGV[2]);

-- 函数定义
local function factorial(num)
    if num == 0 then
        return 1
    else
        return num * factorial(num-1);
    end
end




-- ******************************************** 与redis 交互 ********************************************
-- redis.call(), 执行命令出错, 将导致脚本退出
redis.call('set', 'lua-key1', 'lua-value1');
local v1 = redis.call('get', 'lua-key1');



--[[
    redis.pcall(), 执行命令出错, 会返回一个带 err 域的 lua table

    {
        err:
    }

--]]
return {
    key,
    value,
    {table,  boolean, number, str, luaNil}, -- nil 位置需注意
    {tk1, tk2, tv1, tv2},
    v1,
    factorial(10)
};
