import React from 'react';
import axios from 'axios';
import Countbox from '../components/Countbox';
import '../css/Dashboard.css';


class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = { 
      toolboxes: '',
      drawers:'',
      containers:'',
      tools:''
    };
  }

  componentDidMount() {
    var context = this;
    axios.get('http://104.154.162.68:8080/api/toolboxes')
    .then(function (response) {
      console.log(response);
      context.setState({toolboxes: response.data.items})
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('http://104.154.162.68:8080/api/drawers')
    .then(function (response) {
      console.log(response);
      context.setState({drawers: response.data.items})
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('http://104.154.162.68:8080/api/containers')
    .then(function (response) {
      console.log(response);
      context.setState({containers: response.data.items})
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('http://104.154.162.68:8080/api/tools')
    .then(function (response) {
      console.log(response);
      context.setState({tools: response.data.items})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="counts">
        <Countbox itemColor='blue' itemName={'Toolboxes'} itemCount={this.state.toolboxes.length} />
        <Countbox itemColor='red' itemName={'Drawers'} itemCount={this.state.drawers.length} />
        <Countbox itemColor='orange' itemName={'Containers'} itemCount={this.state.containers.length} />
        <Countbox itemColor='green' itemName={'Tools'} itemCount={this.state.tools.length} />
      </div>
    );
  }
}

export default Dashboard;


