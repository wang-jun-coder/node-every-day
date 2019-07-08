const http = require('http');
const { createClient, ACL, CreateMode } = require('node-zookeeper-client');
const util = require('util');
const PORT = 4000;
const LISTEN_HOST = '0.0.0.0';

// 从环境变量获取 zk 配置
const {ZOOKEEPER_HOST='127.0.0.1', ZOOKEEPER_PORT='2181'} = process.env;
console.log(`env: ${ZOOKEEPER_HOST}:${ZOOKEEPER_PORT}`);


const client = createClient(`${ZOOKEEPER_HOST}:${ZOOKEEPER_PORT}`);
client.once('connected', () => {
    console.log('zookeper on connect');
   registerService().then(() => {
    console.log('register service node success');
   }).catch(error => {
       console.log(error);
       process.exit();
   });
});
client.on('error', error => {
    console.log(`zookeeper err: ${error}`);
    throw error;
});
client.connect();

// 注册服务, 应放在服务启动后
const registerService = async ()=> {
    const exists = util.promisify(client.exists);
    const create = util.promisify(client.create);

    // docker 内, 服务ip 均为动态, 故动态获取 ip 绑定至注册中心
    const BindHost = client.connectionManager.socket.localAddress;
    const service = '/service';
    const serviceName = `${service}/demo`;
    const currentNodePath = `${serviceName}/node-`;
    const currentNodeInfo = `${BindHost}:${PORT}`;

    const rootNode = await exists.call(client, service);
    console.log(`rootNode`);
    console.log(rootNode);
    if (!rootNode) {
        // 新建根结点
        await create.call(client, service, null, ACL.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
    }
    // 创建服务节点(持久节点)
    const serviceNode = await exists.call(client, serviceName);
    console.log(`serviceNode`);
    console.log(serviceNode);
    if(!serviceNode) {
        await create.call(client, serviceName, null, ACL.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
    }
    // 创建微服务节点(临时顺序结点)
    await create.call(client, currentNodePath, Buffer.from(currentNodeInfo), ACL.OPEN_ACL_UNSAFE, CreateMode.EPHEMERAL_SEQUENTIAL);
    console.log(`complete`);
};


// 启动服务, 服务启动成功后注册服务
const server = http.createServer((req, res) => {
    const msg = `this is response from ${LISTEN_HOST}:${PORT} service`;
    // console.log(client.connectionManager.socket.localAddress);
    // console.log(client.connectionManager.socket.localAddress);
    res.end(msg);
});


server.listen(PORT, LISTEN_HOST, ()=> {
    console.log(`server has running at http://${LISTEN_HOST}:${PORT}`);
    // client.connect(); // 连接注册中心, 一旦连接成功开始注册服务
});
