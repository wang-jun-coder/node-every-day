// 三斜线指令
// 指包含单个 xml 标签的单行注释, 注释内容会作为编译器指令使用
// 三斜线指令尽可以房子包含它的文件顶端, 一个三斜线指令前面只能出现单行或多行注释,包括其他三斜线指令
// 若三斜线指令出现在一个语句或声明之后, 会被当做普通单行注释

let a = 0;

/// <reference path="...." />
// 用于声明文件间的依赖, --out, --outFile 时, 可以作为调整输入内容顺序的一种方法

// 预处理文件
// 编译器对输入文件进行预处理来处理所有三斜线引用指令, 将额外文件加入编译构成, 相对于当前文件
// 不能引用自己或不存在的文件
// 使用 --noResolve 时, 三斜线引用会被忽略


/// <reference types="..." />
// 声明对某个包的引用


/// <reference no-default-lib="true"/>
// 把一个文件标记成默认库

/// <amd-module name='NamedModule'/>
// 给 AMD 模块传入模块名

