import React, { Component } from 'react';
import axios from 'axios';

class ApprovalPage extends Component {
  constructor(){
    super();
    this.state= {
      ethWallet: '',
      email: '',
      age: null
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSaveClick(stateObj) {
    axios.post('http://localhost:3000/postUserInfo', {
      ethWallet: stateObj.ethWallet,
      email: stateObj.email,
      age: stateObj.age
    })
      .then(userInfo => {
        res.status(202).send(userInfo);
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleInputChange(event){
    let target = event.target;
    let name = event.target.name;
    this.setState({ [name] : target.value });
  }

  render(){
    return(
      <div>
        <form onSubmit={(event) => {
          event.preventDefault();
          this.handleSaveClick(this.state);
          }}>
          <label>
            Ethereum Wallet:
            <input
              name="ethWallet"
              type="text"
              placeholder="Enter Ethereum Wallet"
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              name="email"
              type="email"
              placeholder="Enter Email Address"
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Age:
            <input
              name="age"
              type="number"
              placeholder="Enter Age"
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
          <button>
          </button>
        </form>
        <br />
        <br />
          <b>INSTRUCTIONS TO SEND IN MOUTH SWAB:</b>

      </div>
    )
  }
}


export default ApprovalPage;