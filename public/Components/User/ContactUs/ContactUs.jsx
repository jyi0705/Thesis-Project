import React, { Component } from 'react';
import './contactus.css';
import axios from 'axios';
import swal from 'sweetalert2';
import '../../../../node_modules/sweetalert2/src/sweetalert2.scss';
import '../../../../node_modules/sweetalert2/src/colors.scss';

class ContactUs extends Component {
  constructor(props){
    super(props);
    this.state = {
      ethPrice: null
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const addCommas = str => {
      return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
        return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
        });
      }
    axios.get("https://api.etherscan.io/api?module=account&action=balance&address=0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe&tag=latest&apikey=IUKZ7J9R48Z4EZAE6XG6VGAYIWU36RPZYQ")
      .then(price => {
        let priceOfEth = addCommas(price.data.result / Math.pow(10,18));
        this.setState({ethPrice: priceOfEth});
      })
      .catch(err => {
        console.log(err);
      })
  }

  onChange(event) {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  onSubmit() {
    swal({
      title: 'Success',
      text: 'You will hear back within 48 hours',
      type: 'success',
      confirmButtonText: 'Confirm'
    })
    axios.post('/api/user/contact', this.state)
    .then(result => {
      //console.log(result);
    })
    .catch(error => {
      //console.log('post error', error);
    })
  }

  render(){
    return(
  <div className="container" id="contact">
    <section id="content">      
        <h1>Contact the Team</h1>
        <p>
          We'd love to hear feedback from you -- both bad and good. Help us make the 
          app better!
        </p>
        <form onSubmit={this.onSubmit}>
          <div>
            <input 
              className="field"
              type="text" 
              name="name" 
              onChange={this.onChange}
              placeholder="Name" 
              required/>
          </div>
          <div>
            <input 
              className="field"
              type="email" 
              name="email"
              onChange={this.onChange}
              placeholder="Email" 
              required/>
          </div>
          <div>
            <textarea 
              className="field"
              type="text" 
              name="comments"
              onChange={this.onChange}
              placeholder="Message" 
              required 
              style={{marginTop: 0 + 'em', height: 22 + 'em'}}></textarea>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
    </section>
      <div id="donation-support" className="donation">
          <h1 className="donation-title">Donate to support Development</h1>
          <hr className="donation-hr"/>
      </div>
      <div>
            <p>
              <b>Gennuity's mission</b> is to provide individual's income and help accumulate assests during retirement.
              All funds received and any proposal to spend it are visible on the blockchain for anyone to see.
              The process is fully transparent and governed by fraud-proof rules programmed on the blockchain, 
              so you'll know your donations will be well taken care of.
              </p>
            <div className="donation-address">
              <h2>Donation Address</h2>
              <hr/>
              <div className="donation-amount">
                <div className="wallet-address"><h4>Wallet Address:</h4><h4 className="eth-wallet"> 0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359</h4></div>
                <div className="amount-received"><h4>Amount Received:</h4><h4 className="eth-amount"> {this.state.ethPrice} Ether </h4></div>
              </div>
            </div>
      </div>
  </div>
    )
  }
}

export default ContactUs;