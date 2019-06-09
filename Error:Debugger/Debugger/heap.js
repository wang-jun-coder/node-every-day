const heapdump = require('heapdump');

heapdump.writeSnapshot(`${Date.now()}.heapsnapshot`);
const array = [];

for (let i = 0; i < 1000, i++;) {
    array.push({
        index: i,
        buffer: Buffer.alloc(1024, i)
    })
}
console.log(process.pid);
setTimeout(() => console.log('exit'), 100*1000);

