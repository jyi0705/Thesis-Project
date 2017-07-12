import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar.jsx';
import Portal from './Portal.jsx';

class Admin extends Component {
  constructor() {
    super();
  }

  render(){
    return(
      <div>
        <Sidebar/>
        <Portal/>
      </div>
    )
  }
}


export default Admin;