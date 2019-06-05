const fs = require('fs');

const output = fs.createWriteStream(`${process.pid}.log`, {
    encoding: 'utf8'
});

const times = 0;
setInterval(() => {
    output.write(`${Date.now()}: ${process.pid} ${times}\n`);
}, 1000);
