import './App.css';
import React, {useEffect, useState} from 'react';
import {ChartLine}  from './components/posChart';
import { BorChart } from './components/barChart';
import { GridExample } from './components/grid';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

const DATA =  [
  { x: 100, y: 20, z : 100},
  { x: 120, y: 100},
  { x: 170, y: 300},
  { x: 10, y: 250},
  { x: 150, y: 300},
  { x: 110, y: 280},
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
const commands = (commandNo) => {
  switch (commandNo) {
    case 1:
      return () => {console.log('first command')};
    case 2:
      return () => {console.log('second command')};
    case 3:
      return () => {console.log('third command')};
    case 4:
      return () => {console.log('fourth command')};
  }
}
function App() {
  const [drone, selectDrone] = useState(0);
  const [graph, selectGraph] = useState(1);
  const [data, setData] = useState(DATA);
  const [barData, setBarData] = useState(BARDATA);
  const [dialogData, setDialogData] = useState(data[0]);
  const request = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/');
      const data = await response.json();
      console.log(data); 
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() =>{
    setTimeout(() => {
      let tempArray = [];
      for(let index = 0; index < data.length; index++) {
      const dataObj = {
        x : Math.floor(Math.random()*181),
        y : Math.floor(Math.random()*300)
      }
      tempArray.push(dataObj);
      //setData(tempArray);
      const anotherArray = [barData.at(-1), ...barData.slice(0,-1)];
      setBarData(anotherArray);
    }
    }, 2500);
  }, [data]);

  return (
  <div>
    <div className= "header">
      <p>Header</p>
    </div>
      <div className="App">
      <div className = "controlBox borderClass tableClass">
          <div className = "Commands">
            <button className="Command" onClick = {() => {
              drone == 1 ? selectDrone(0) : selectDrone(1);
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
          <div className = "DialogBox ag-theme-quartz" style={{ height: 250 }}>
            <GridExample/>
          </div>
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
            <button className="Command" onClick = {commands(1)}>Command2</button>
            <button className="Command" onClick = {commands(2)}>Command2</button>
            <button className="Command" onClick = {commands(3)}>Command3</button>
            <button className="Command" onClick = {commands(4)}>Command4</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
