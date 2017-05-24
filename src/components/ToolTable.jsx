import  { Table }  from 'react-bootstrap';
import React from 'react';

const ToolTable = (props) => (
    <Table responsive striped bordered condensed hover>
    <thead>
      <tr>
        <th>Tools</th>
        <th>Drawer</th>
        <th>Containter</th>
        <th>Toolbox</th>
      </tr>
    </thead>
    <tbody>
        {  
            props.tools.map((tool, i) => (
                <tr key={i}>
                    <td>{tool.name}</td>
                    <td>{tool.drawer.name}</td>
                    <td>{tool.container.name}</td>
                    <td>{tool.toolbox.name}</td>
                </tr>
            ))
        }
    </tbody>
  </Table>
)

export default ToolTable; 