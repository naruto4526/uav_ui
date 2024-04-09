import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const BorChart = ({data}) => {
    return (
      <BarChart
      height={350}
      width = {500}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 10,
        left: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="height" fill="#8884d8" activeBar={<Rectangle fill="purple" stroke="blue" />} />
    </BarChart>
    );
}
export {BorChart};
