import React, { Component } from 'react';
import ApprovalPageButton from './ApprovalPageButton';
import ApprovalPage from './ApprovalPage';

class App extends Component {
  constructor(){
    super();

  }

  render(){
    return(
      <div>
        <ApprovalPageButton />
        <ApprovalPage />
      </div>
    )
  }
}

export default App;