import React, { Component } from 'react';
import axios from 'axios';

class Admin extends Component {
  constructor(){
    super();
    this.state= {
      username: '',
      password: '',
      authenticator: null
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmitClick(stateObj) {
    axios.post('http://localhost:3000/api/users', {
      username: stateObj.username,
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
          this.handleSubmitClick(this.state);
          }}>
          <label>
            Username:
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Google Authenticator:
            <input
              name="authenticator"
              type="number"
              placeholder="Enter Google 2FA"
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}


export default Admin;