const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const { ReadlineParser } = require('@serialport/parser-readline')
const cors = require("cors");
const { SerialPort } = require('serialport')
app.use(cors());
const port = new SerialPort({
  path: 'COM5',
  baudRate: 115200
})
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});



io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("sendToEsp", (data) => {
    console.log(data.message);
    writeToPort(data.message);
    // socket.join(data);
    // socket.emit("data_available", {response:'yo whatsup'});
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

const writeToPort = (message) => {
  port.write(`${message}\n`, function(err) {
    if (err) {
      return console.log('Error on write: ', err.message)
    }
    console.log('message written')
  })
}

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
parser.on('data', (data) => {
  console.log('data is ' + data);
  io.emit('data_available', {message : data});
});














// SerialPort.list().then((ports) => {
//   for (let port of ports) console.log(port);
// })
