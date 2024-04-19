const express = require('express');
const app = express();
const cors = require('cors'); 
// CORS is enabled for all origins 
app.use(cors());
app.use(express.json());
app.use('/',require('./endpoint.js'));
app.listen(8080, ()=>console.log("server is listening at: 8080"));

setTimeout(() => {
  let tempArray = [];
  for(let index = 0; index < data.length; index++) {
  const dataObj = {
    x : Math.floor(Math.random()*181),
    y : Math.floor(Math.random()*300),
    label : 'Drone ' + index
  }
  tempArray.push({
    data : [dataObj],
    id : data[index].id,
    color : data[index].color,
  });
  setData(tempArray);
  }
  const anotherArray = [barData.at(-1), ...barData.slice(0,-1)];
  setBarData(anotherArray);
  joinRoom();
}, 2500);



// source(like drone name or number),
// Distance to next closest object,
// Magnetometer(NEWS),
// Gyro orientation(tilt),
// accleration/speed,
// Pressure,
// Temperature(on board & ambient),
// GPS geo-location,
// How many photos taken,
// Battery charge,
// Motor(s) RPM,
// Current on board RTC time & time since operation(millis())
// altitude


//For Commands:
//1DroneNumber,1fly or 1,2Hover or 1,3 or 1,4
//PacketCount, DroneNo., Mode, CommandNo.
//1:2:4,      0/1 ,  1-4, [Message]

//
