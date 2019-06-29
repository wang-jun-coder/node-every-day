// 命名空间
// 命名空间是位于全局命名空间下的一个普通的带有名字的 js 对象
// 多文件下可以通过 --outFile 合并在一起

// 模块
// 和命名空间一样, 可以包含代码和声明, 但模块还可以生命以来
// 对于 nodejs 来说, 模块是默认并推荐的组织代码的方式


// 命名空间和模块的陷阱
// 对模块不应使用 ///<refrence> 引用模块文件, 应使用 import
// import 路径, 编译器会首先尝试查找相应路径下的.ts .tsx 或 .d.ts, 若都查不到, 则会查找外部模块
// 不必要的命名空间, 命名空间转换为模块, 不应导出命名空间, 不同模块中, 本身的作用域不同, 不会导致命名冲突, 无需使用命名空间导致层级过深

// 模块的取舍
// ts 每个模块文件与生成的 js 文件一一对应. 
// 当目标模块系统为 commonjs 或 umd 时, 无法使用 outFile 选项, 当 为 amd 或 system 时, 则可以
