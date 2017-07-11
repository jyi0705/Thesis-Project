import React, { Component } from 'react';

import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import instrument_artifacts from '../../build/contracts/Instrument.json'
var Instrument = contract(instrument_artifacts);

var accounts;
var account;
var instrument;

export default class Pools extends Component {
  contructor(props) {
    super(this);

    this.state = {
      pools: null
    };

    this.init();
  }

  init() {
    Instrument.setProvider(web3.currentProvider);

    web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
  
      Instrument.deployed().then(instance => {
        instrument = instance;
        return instrument.pools({ from: account[0] });
      }).then(pools => {
        this.state.pools = pools;
      }).catch(e => {
        console.log(e);
        self.setStatus("Error getting balance; see log.");
      });
    });
  }
  
  render() {
    var pools = this.state.pools.map((pool, idx) => (
      < Pool 
        key={idx}
        midAge={pool.midAge }
        participants={pool.participants.length}
        totalEth={pool.participants.totalEth} 
      />
    )); 

    return (
      <ul>
        {pools}
      </ul>
    );
  }
};

var Pool = (props) => (
  <div>
    <h1>Pool Mean Age : { props.midAge }</h1>
    <h2>Participants : { props.participants }</h2>
    <h2>Total Eth : { props.totalEth }</h2>
  </div>
);