const dgram = require('node:dgram');
const server = dgram.createSocket('udp4');
const client = dgram.createSocket("udp4");

let count = 0;
const Transmit = function (id) {
  this.packet_id = id,
  this.x =  2.13 * Math.floor(Math.random() * 10),
  this.y = this.x + Math.floor(Math.random() * 5),
  this.z = this.y * 7.3333
}


server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(JSON.parse(msg));
  
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);
