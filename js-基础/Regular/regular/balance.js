


// 首先匹配 <div, 然后是除 > 以外的任意字符, 然后再跟 >, 这样匹配 div 开头标签 => <div[^>]*>
// 匹配 </div> => <\/div>
const reg = /<div[^>]*>(.|\s)*<\/div>/g;

// 对于开启标签和结束标签匹配的 case 没有问题
console.log(`<div class="a"><div class="b">this is 
content</div></div>`.match(reg));
// [ '<div class="a"><div class="b">this is content</div></div>' ]

// 开始标签和结束不相等? 如何处理????, js 正则暂不支持 <?R> 类的递归引用
console.log(`<div class="a"><div class="b">this is content</div></div></div>`.match(reg));
// [ '<div class="a"><div class="b">this is content</div></div></div>' ] ???
