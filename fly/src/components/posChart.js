import React, { PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const ChartLine = ({data, setDialogData}) => {
    const findDrone = (event) => {
      const xClick = event.xValue;
      const yClick = event.yValue;
      let minDistance;
      let clickedDrone = data[0];
      for (let drone of data) {
        const dist = Math.sqrt(Math.pow((drone.x - xClick), 2) + Math.pow((drone.y - yClick), 2));
        if (!minDistance || dist < minDistance) {
          minDistance = dist;
          clickedDrone = drone;
        }
      }
      setDialogData(clickedDrone);
    }
    return (
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 5,
          }}
          height={350}
          width = {500}
          onClick={findDrone}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="x" unit="cm" />
          <YAxis type="number" dataKey="y" name="y" unit="cm" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Drone Position" data={data} fill="#8884d8" />
        </ScatterChart>
    );
  }

  export {ChartLine};

