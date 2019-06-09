const zookeeper = require('node-zookeeper-client');

const client = zookeeper.createClient(`localhost:2181`);
const path = `/service`;


client.on('connected', () => {
    console.log(`micro-service-1 has connected server`);
    client.create(path, Buffer.from('hello test'), error => {
        if (error) {
            console.log(`client create ${path} error: ${error.message}`);
            return;
        }

        console.log(`${path} has created successfully`);
        client.close();
    });
});
client.connect();
