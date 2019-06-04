
console.log(`p1.js: ${__filename} argv: ${process.argv}`);

process.on('message', msg => console.log(`p1.js process.on message: ${JSON.stringify(msg)}`));
process.on('exit', code => console.log(`p1.js exit: ${code}`));

console.log(`p1.js process.connected: ${process.connected}`);
if (process.connected) {
    process.send({
        name: 'message',
        value: 'this is message value from p1.js'
    }, error => console.log(`p1.js send message p1 error: ${error}`));
}

setInterval(() => console.log(`p1.js alive`), 1000);
