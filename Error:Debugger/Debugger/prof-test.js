
const array = [];

for (let i = 0; i < 1000, i++;) {
    array.push({
        index: i,
        buffer: Buffer.alloc(1024, i)
    })
}

const end = Date.now() + 1000;
while (Date.now() < end) {}
