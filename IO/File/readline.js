const readline = require('readline');
const fs = require('fs');

// const rl1 = readline.createInterface({
//     input: fs.createReadStream('readline.js'),
//     output: process.stdout
// });
//
// let num = 0;
// rl1.on('line', chunk => {
//     console.log(`${num++}: ${chunk}`);
// });
//



const rl2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
});

rl2.prompt();
// rl2.question('你叫什么名字?\n', answer => {
//    console.log(answer);
// });

// <ctrl>-Z, SIGTSTP
rl2.on('SIGTSTP', () => {
    console.log(`<ctrl>-Z`);
});

// <ctrl>-C, SIGINT
rl2.on('SIGINT', () => {
    rl2.question('真的要退出吗?Y/n', answer => {
        if (answer === `Y`) {
            console.log(`goodbye`);
            rl2.close();
        }
    });
});
