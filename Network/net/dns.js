// const dns = require('dns');
// // 不发请求, 直接调用系统底层方法, 受 host文件 影响
// const label = 'dns.lookup: github.com';
// const domain = `github.com`;
// console.time(label);
// dns.lookup(domain, (err, address, family) => {
//     console.timeEnd(label); // dns.lookup: github.com: 9.383ms, 约 10ms 左右
//     console.log(`${domain}: ${err} ${address} ${family}`); // 本地修改了 host, 导致解析结果为 host 内地址
// });


const { Resolver } = require('dns');
const resolver = new Resolver();
resolver.setServers(['4.4.4.4', '8.8.8.8', '114.114.114.114']);


const label = 'dns resolve4: github.com';
console.time(label);
const domain = `github.com`;

// 网络请求, 不受 host 影响, 请求速度较慢
resolver.resolve4(domain, (err, address)=> {
    // 4.4.4.4 超时
    // 114.114.114.114 约 20ms 左右
    // 8.8.8.8, 50-100ms 左右
    // 三个一起约 6s 左右
    console.timeEnd(label);
    console.log(`${err} ${address}`);
});

