const dgram = require('node:dgram');

const client = dgram.createSocket("udp4");
const Transmit = function (id) {
  this.packet_id = id,
  this.x =  2.13 * Math.floor(Math.random() * 10),
  this.y = this.x + Math.floor(Math.random() * 5),
  this.z = this.y * 7.3333
}
const transmitObj = new Transmit(1);
const message = Buffer.from(JSON.stringify(transmitObj));
client.send(message, 20001, 'localhost', (err) => {
  client.close();
});