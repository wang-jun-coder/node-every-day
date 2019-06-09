const zookeeper = require('node-zookeeper-client');

const client = zookeeper.createClient('localhost:2181');
const path = '/service';


const listChildren = (client, path) => {
    client.getChildren(
        path,
        event => {
            console.log(`${event}`);
            listChildren(client, path);
        },
        (err, children, stat) => {
            console.log(`${err} ${JSON.stringify(children)} ${JSON.stringify(stat)}`);
        }
    )
};


client.once('connected', () => {

    client.exists(path, function (error, stat) {
        if (error) {
            console.log(error.stack);
            return;
        }

        if (stat) {
            console.log('Node exists.');

            listChildren(client, '/');

            client.getData(path, event => {
                console.log(`${path}: ${event}`);
            }, (err, data, stat) => {
                console.log(`-------------------`);
                console.log(data.toString());
                console.log(`-------------------`)
            });
        } else {
            console.log('Node does not exist.');
        }
    });
});
client.connect();


