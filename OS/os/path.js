const path = require('path');

// path.basename() 返回 path 的最后一部分
console.log(path.basename(`C:\\temp\\file.html`));          // C:\temp\file.html
console.log(path.win32.basename(`C:\\temp\\file.html`));    // file.html
console.log(path.basename(`/Users/wangjun/Desktop/file.html`));         // file.html
console.log(path.posix.basename(`/Users/wangjun/Desktop/file.html`));   // file.html
console.log(path.basename(`/Users/wangjun/Desktop/file.html`, '.html')); // file
console.log(path.basename(`/Users/wangjun/Desktop/file.html`, '.png')); // file.html

// 路径定界符, : ;
console.log(path.delimiter);    // :
console.log(process.env.PATH);  // /usr/local/opt/apr/bin:/usr/local/opt/apr-util/bin:/usr/local/opt/ruby/bin:/Users/wangjun/.nvm/versions/node/v8.9.1/bin:/Users/wangjun/.cargo/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin:/Users/wangjun/Library/Android/sdk/ndk-bundle/:/Users/wangjun/.fzf/bin:/Users/wangjun/Desktop/source/flutter/bin
console.log(process.env.PATH.split(path.delimiter));    // ["/usr/local/opt/apr/bin","/usr/local/opt/apr-util/bin","/usr/local/opt/ruby/bin","/Users/wangjun/.nvm/versions/node/v8.9.1/bin","/Users/wangjun/.cargo/bin","/usr/local/bin","/usr/bin","/bin","/usr/sbin","/sbin","/opt/X11/bin","/Users/wangjun/Library/Android/sdk/ndk-bundle/","/Users/wangjun/.fzf/bin","/Users/wangjun/Desktop/source/flutter/bin"]

// 返回路径的目录
console.log(path.dirname('/Users/wangjun/Desktop/file.html'));  // /Users/wangjun/Desktop

// 返回路径扩展名
console.log(path.extname('file.html'));     // .html
console.log(path.extname('file.html.gz'));  // .gz
console.log(path.extname('file.'));         // .
console.log(path.extname('file'));          // 空字符串
console.log(path.extname('.file'));         // 空字符串

// 格式化一个路径, 注意: 如果提供了 pathObject.dir，则忽略 pathObject.root。如果 pathObject.base 存在，则忽略 pathObject.ext 和 pathObject.name。
console.log(path.format({
    // root: '/',
    dir: '/Users/wangjun',
    base: 'file.html',
    // name: 'file',
    // ext: '.html'
}));    // /Users/wangjun/file.html

// 判断是否为绝对路径
console.log(path.isAbsolute(`/Users/wangjun/Desktop/file.html`));   // true
console.log(path.isAbsolute(`os/path.js`)); // false
console.log(path.isAbsolute(`.`));          // false
console.log(path.isAbsolute(`..`));         // false

// 拼接路径
console.log(path.join('/Users', '.', 'wangjun', '..', 'wangjun', 'Desktop', 'file.html')); // /Users/wangjun/Desktop/file.html

// 规范化路径(解析..和.)
console.log(path.normalize('/Users/./wangjun/../wangjun/Desktop/file.html')); // /Users/wangjun/Desktop/file.html

// 解析路径
console.log(path.parse(`/Users/wangjun/Desktop/file.html`));
// { root: '/',
//   dir: '/Users/wangjun/Desktop',
//   base: 'file.html',
//   ext: '.html',
//   name: 'file' }

// 子对象
console.log(path.posix); // posix 上 path 的相关实现
console.log(path.win32); // win32 上 path 的相关实现

// 计算相对路径
console.log(path.relative('/Users/xx', '/Users/wangjun/Desktop/file.html')); // ../wangjun/Desktop/file.html

// 合并绝对路径
console.log(path.resolve('/Users/xx', '../wangjun/Desktop/file.html')); // /Users/wangjun/Desktop/file.html

// 路径分割符, windows: \  linux/mac: /
console.log(path.sep); // /


