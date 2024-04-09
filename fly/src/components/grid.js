import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component


const GridExample = () => {
  // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([
      { Drone: "Drone 1", xPos: "Tesla", yPos: "some" },
      { Drone: "Drone 2", xPos: "Tesla", yPos: "Ford",},
      { Drone: "Drone 3", xPos: "Tesla", yPos: "Ford",},
      { Drone: "Drone 4", xPos: "Tesla", yPos: "Ford",},
    ]);
    
    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
      {field : "Drone"},
      { field: "xPos" },
      { field: "yPos" },
    ]);
  
    return (
      // wrapping container with theme & size
      // <div
      // className="ag-theme-quartz" // applying the grid theme
      // style={{ height: 250 }} // the grid will fill the size of the parent container
      // >
         <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
        />
      // </div>
    )
  }

  export {GridExample};