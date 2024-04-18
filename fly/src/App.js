import './App.css';
import React, {useEffect, useState} from 'react';
import {ChartLine}  from './components/posChart';
import { BorChart } from './components/barChart';
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3001");
const listenSocketCreated = false;
socket.on("connection", (socket) => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

const sendCommand = (message) => {
  socket.emit("sendToEsp", {message: message});
}

const DATA =  [
  {
    data : [{ x: 100, y: 20, label: 'Drone 1'}],
    color : '#0a4082',
    id : 1
  },
  {
    data : [{x: 120, y: 100, label: 'Drone 2'}],
    color : '#0a4082',
    id : 2
  },
  {
    data : [{x: 170, y: 300, label: 'Drone 3'}],
    color : '#0a4082',
    id : 3
  },
  {
    data : [{x: 10, y: 250, label: 'Drone 4'}],
    color : '#0a4082',
    id : 4
  },
  {
    data : [{x: 150, y: 300, label: 'Drone 5'}],
    color : '#0a4082',
    id : 5
  },
  {
    data : [{x: 110, y: 280, label: 'Drone 6'}],
    color : '#0a4082',
    id : 6
  },
];
const BARDATA = [
  {
    name: 'Drone 1',
    height: 4000,
    amt: 2400,
  },
  {
    name: 'Drone 2',
    height: 3000,
    amt: 2210,
  },
  {
    name: 'Drone 3',
    height: 2000,
    amt: 2290,
  },
  {
    name: 'Drone 4',
    height: 2780,
    amt: 2000,
  },
  {
    name: 'Drone 5',
    height: 1890,
    amt: 2181,
  }
];
const commands = (commandNo, drones, PacketCount, setPacketCount) => {
  return () => {
    let message = '';
    message += PacketCount;
    setPacketCount(PacketCount + 1);
    message += ',' + drones.join(':') + ',';
    message += 0 + ',';
    message += commandNo;
    sendCommand(message);
  }
  // switch (commandNo) {
  //   case 1:
  //     return () => {
  //       sendCommand('on')
  //     };
  //   case 2:
  //     return () => {sendCommand('off')};
  //   case 3:
  //     return () => {
  //       var json = `{ "foo": 1, "bar": 2, "baz": 3 }`;
  //       var obj = JSON.parse(json);
  //       var values = Object.values(obj);
  //       values = values.join(',');
  //       sendCommand(values);
  //     }
  //   case 4:
  //     return () => {console.log('fourth command')};
}

function App() {
  const [drone, selectDrone] = useState([]);
  const [graph, selectGraph] = useState(1);
  const [data, setData] = useState(DATA);
  const [barData, setBarData] = useState(BARDATA);
  const [dialogData, setDialogData] = useState(data[0]);
  const [sendMessage, setSendMessage] = useState(true);
  const [text, setText] = useState('');
  const [dataFromDrone, setDataFromDrone] = useState('');
  const [PacketCount, setPacketCount] = useState(0);
  useEffect(() => {
    socket.on("data_available", (data) => {
      // const dataArray = data.message.split(',');
      // const droneDataObj = {};
      // droneDataObj.x = dataArray[0];
      // droneDataObj.y = dataArray[1];
      // droneDataObj.z = dataArray[2];
      setDataFromDrone(data.message);
      console.log(dataFromDrone);
    });
  }, [socket]);
  console.log(dataFromDrone);
  const findDrone = (droneId) => {
    for (let droneData of data) {
      if (droneData.id == droneId) return droneData.data[0];
    }
  }

  const highlightOnGraph = (drone) => {
    for (let droneData of data) {
      if (drone.includes(droneData.id)) droneData.color = '#eb3449';
      else droneData.color = '#0a4082';
    }
    // for (let drone of data) {
    //   if (drone.id === droneId) drone.color = '#eb3449';
    //   else drone.color = '#0a4082';
    // }
  }

  return (
  <div>
    <div className= "header">
      <p>Header</p>
    </div>
      <div className="App">
      <div className = "controlBox borderClass">
          <div className = "Commands tableClass">
            <div className = "selectAllDrones">
              <input type = "checkbox" onChange={(e) => {
                if (e.target.checked) {
                  selectDrone([1,2,3,4]);
                  highlightOnGraph([1,2,3,4]);
                } else {
                  selectDrone([]);
                  highlightOnGraph([]);
                }
              }}/>
              <p className = "textInTextContainer selectDronesText">Select all drones</p>
            </div>
            <button className={"Command" + (drone.includes(1) ? " selected": '')} onClick = {() => {
              let temp;
              temp = [...drone];
              if (drone.includes(1)) {
                temp = [...drone];
                temp.splice(temp.indexOf(1), 1);
              } else temp.push(1);
              selectDrone(temp);
              highlightOnGraph(temp);
            }}>Drone 1</button>
            <button className={"Command" + (drone.includes(2) ? " selected": '')} onClick = {() => {
              let temp;
              temp = [...drone];
              if (drone.includes(2)) {
                temp = [...drone];
                temp.splice(temp.indexOf(2), 1);
              } else temp.push(2);
              selectDrone(temp);
              highlightOnGraph(temp);
            }}>Drone 2</button>
            <button className={"Command" + (drone.includes(3) ? " selected": '')} onClick = {() => {
              let temp;
              temp = [...drone];
              if (drone.includes(3)) {
                temp.splice(temp.indexOf(3), 1);
              } else temp.push(3);
              selectDrone(temp);
              highlightOnGraph(temp);
            }}>Drone 3</button>
            <button className={"Command" + (drone.includes(4) ? " selected": '')} onClick = {() => {
              let temp;
              temp = [...drone];
              if (drone.includes(4)) {
                temp = [...drone];
                temp.splice(temp.indexOf(4), 1);
              } else temp.push(4);
              selectDrone(temp);
              highlightOnGraph(temp);
            }}>Drone 4</button>
            <button className={"Command" + (drone.includes(5) ? " selected": '')} onClick = {() => {
              drone == 1 ? selectDrone(0) : selectDrone(5);
            }}>Drone 1</button>
            <button className="Command" onClick = {() => {
              drone == 2 ? selectDrone(0) : selectDrone(2);
            }}>Drone 2</button>
            <button className="Command" onClick = {() => {
              drone == 3 ? selectDrone(0) : selectDrone(3);
            }}>Drone 3</button>
            <button className="Command" onClick = {() => {
              drone == 4 ? selectDrone(0) : selectDrone(4);
            }}>Drone 4</button>
          </div>
          {(drone.length == 1) ? (<div className = "DialogBox" >
            <div class = "row">
              <p>Xpos</p>
              <p>:</p>
              <p>{findDrone(drone[0]).x}</p>
            </div>
            <div class = "row">
              <p>Ypos</p>
              <p>:</p>
              <p>{findDrone(drone[0]).y}</p>
            </div> 
          </div>): <p></p>}
        </div>
        <div className = "graphBox borderClass">
          <div className = "dronePicker">
            <button className={graph == 1 ? "selectedDrone" : "otherDrone"} onClick={() => selectGraph(1)}>Position</button>
            <button className={graph == 2 ? 'selectedDrone' : "otherDrone"} onClick={() => selectGraph(2)}>Elevation</button>
          </div>
          <div className = "graphContainer">
            <div className = "graph">
              {graph=== 1 ?(<ChartLine data = {data} setDialogData={setDialogData}/>) :
              (<BorChart data = {barData}/>)
              }
            </div>
          </div>
        </div>
        <div className = "controlBox borderClass">
          <div className = "Commands">
            <button className="Command" onClick = {commands(1, drone, PacketCount, setPacketCount)}>Command1</button>
            <button className="Command" onClick = {commands(2, drone, PacketCount, setPacketCount)}>Command2</button>
            <button className="Command" onClick = {commands(3, drone, PacketCount, setPacketCount)}>Command3</button>
            <button className= {"Command" + (sendMessage ? " selected": '')} onClick = {() => {
              setSendMessage(!sendMessage);
            }}>Send Message</button>
          </div>
          {sendMessage ? (<div className='textcontainer'>
            <p className = 'textInTextContainer'>Type in message to send: </p>
            <input type = "text" className='textBox' onChange = {(text) => setText(text.target.value)} onKeyDown={(e) => {
              if (e.key === 'Enter') {
                console.log("wors");
                console.log(text);
                sendCommand(text);
              }
            }}/>
          </div>) : <p></p>}
        </div>
      </div>
    </div>
  );
}

export default App;
