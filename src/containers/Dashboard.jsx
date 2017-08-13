import React from 'react';
import Countbox from '../components/Countbox';
import ToolboxTable from '../components/ToolboxTable';
import DrawerTable from '../components/DrawerTable';
import ContainerTable from '../components/ContainerTable';
import ToolTable from '../components/ToolTable';
import '../css/Dashboard.css';
import { listAll } from '../utils/backend-api';
import Entities from '../entities/Entities';



class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { 
      toolboxes: [],
      drawers: [],
      containers: [],
      tools: [],
      showEntity: Entities.TOOLBOX
    };
  }

  componentDidMount() {
    Object.keys(Entities).forEach((entity) => {
      listAll(Entities[entity])
        .then((items) => {
          this.setState({ [Entities[entity]]: items });
          this.setState({showEntity: Entities.TOOLBOX});
        });
    });
  }

  handleClick = (entityToShow) => {
    if(this.state.showEntity !== entityToShow)
      this.setState({showEntity: entityToShow});
  }


  render() {
    let componentToShow = null;
    if (this.state.showEntity === Entities.TOOLBOX)
      componentToShow = <ToolboxTable data={this.state.toolboxes} />;
    else if (this.state.showEntity === Entities.DRAWER)
      componentToShow = <DrawerTable data={this.state.drawers} />;
    else if (this.state.showEntity === Entities.CONTAINER)
      componentToShow = <ContainerTable data={this.state.containers} />;
    else if (this.state.showEntity === Entities.TOOL)
      componentToShow = <ToolTable data={this.state.tools} />;

    return (
      <div>
        <div className='counts'>
          <Countbox itemColor='blue'   itemName={'Toolboxes'}  itemCount={this.state.toolboxes.length}  onClick={() => this.handleClick(Entities.TOOLBOX)} />
          <Countbox itemColor='red'    itemName={'Drawers'}    itemCount={this.state.drawers.length}    onClick={() => this.handleClick(Entities.DRAWER)} />
          <Countbox itemColor='orange' itemName={'Containers'} itemCount={this.state.containers.length} onClick={() => this.handleClick(Entities.CONTAINER)} />
          <Countbox itemColor='green'  itemName={'Tools'}      itemCount={this.state.tools.length}      onClick={() => this.handleClick(Entities.TOOL)} />
        </div>
        {componentToShow}
      </div>
    );
  }
}

export default Dashboard;