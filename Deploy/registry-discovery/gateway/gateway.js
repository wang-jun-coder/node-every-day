const http = require('http');
const util = require('util');
const { createClient, ACL, CreateMode } = require('node-zookeeper-client');
const request = require('request');

const PORT = 3000;
const HOST = '127.0.0.1';


const client = createClient('127.0.0.1:2181');

client.on('connected', () => {
    console.log(`connected zookeeper`);
});
client.on('error', error => {
  console.log(error);
  // 每次查询应缓存查询结果, 此处 demo 暂不处理
  // 当与 zookeeper 发生错误时
  // 可以从缓存中获取数据, 并尝试重新连接 zookeeper
});
client.connect();
const getChildren = util.promisify(client.getChildren);
const getData = util.promisify(client.getData);

const listService = async path => {
  // 此处应先查询缓存数据, 在没有缓存的情况下再向注册中心查询, 并缓存查询结果
  return await getChildren.call(
      client,
      path,
      event => {
        console.log(event);
      }
  );
};
const queryService = async path => {
  // 此处应先查询缓存数据, 在没有缓存的情况下再向注册中心查询, 并缓存查询结果
  const data = await getData.call(
    client,
    path,
    event=>{
      // 此处为监听事件, 一旦数据有变化, 应该重新查询当前节点, 并且更新缓存
      console.log(event);
    }
  );
  return data.toString();
};

const onRequest = async (req, res) => {
  const { service, api } = req.headers; // 使用原对象, 未进行解析, 通过 header 传递数据比较简单
  // 此处为简单示例, 暂不进行异常判断
  const serviceNodes = await listService(`/service/${service}`);
  if(!serviceNodes || serviceNodes.length <= 0) {
    throw new Error('未发现服务');
  }
  // 多个服务节点可选, 可进行负载均衡配置, 此处简单起见取第一个
  const nodePath = `/service/${service}/${serviceNodes[0]}`;
  const data = await queryService(nodePath);
  if(!data) throw new Error('服务信息错误');
  const [host, port] = data.split(':');

  const url = `http://${host}:${port}`;
  console.log(url);
  req.pipe(request(url)).pipe(res);
};

const server = http.createServer((req, res) => {
  onRequest(req, res).catch(e => {
    console.log(`on request error: ${e}`);
    res.statusCode = e.code || 500;
    res.statusMessage = e.message || 'internal server error';
    res.end();
  });
});

server.listen(PORT, HOST, () => {
  console.log(`gateway running on http://${HOST}:${PORT}`);
});
