import React, { Component } from 'react';

class Contributing extends Component {
  render() {
      console.log('you are in contributing')
    return (
  <div className="scroll-point" id="contributing">
      <section className="contributing py-4 bg-white">
          <div className="container">
              <h2 className="mb-4">How to contribute</h2>
              <div className="alert alert-warning text-center" role="alert">
                  <strong>Thanks to some bug-finding by the Ethereum community, a new contract has been deployed.</strong><br />
                  If you're getting ready to contribute, make sure to use the contract address specified below.<br />
                  <small>Previous versions of the token contract <em>will not</em> be enabled, so any Ether transfers to them will be rejected.</small>
              </div>
              <div className="row">
                  <div className="col-lg-6 text-center">
                      <p className="lead">The crowdsale begins on:</p>
                      <p className="h1">July 4<sup>th</sup>, 2017 <small><span className="text-muted">at</span></small> 2:00 P.M. UTC</p>
                      <hr />
                      <p>and will run until:</p>
                      <p className="h3">July 11<sup>th</sup>, 2017 <small><span className="text-muted">at</span></small> 2:00 P.M. UTC</p>
                  </div>
                  <div className="col-lg-6">
                      <div className="card card-inverse card-primary">
                          <div className="card-block">
                              <h4 className="card-title">Token contract and generator</h4>
                              <hr className="jumbotron-hr" />
                              <p className="card-text text-white">
                                  To participate in the TONTINE ICO, just send as much Ether as you want to the TONTINE token/crowdsale
                                  contract. Make sure you provide enough gas for the transaction&mdash;100,000 or so ought to do it.
                              </p>
                              <p className="card-text text-white text-center"><small><strong>
                                  OUR WALLET ADDRESS
                              </strong></small></p>
                              <div className="text-center">
                                  View on <a className="text-white" href="https://etherscan.io/address/$$$$ourwallet" target="_blank">Etherscan</a>
                                  or <a className="text-white" href="https://etherchain.org/account/$$$$$ourwallet" target="_blank">etherchain</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div id="stats">
                  <hr />
                  <h2 className="mb-4">Crowdsale Statistics</h2>
                  <div className="row text-center">
                      <div className="col-lg-4">
                          <p className="h4">Ether contributed</p>
                          <p id="total-ether">&mdash;</p>
                          <p id="total-ether-message" className="text-muted"></p>
                      </div>
                      <div className="col-lg-4">
                          <p className="h4">Contributions in USD</p>
                          <p id="total-usd">&mdash;</p>
                          <p id="total-usd-message" className="text-muted"></p>
                      </div>
                      <div className="col-lg-4">
                          <p className="h4">Tokens issued</p>
                          <p id="total-tokens">&mdash;</p>
                          <p id="total-tokens-message" className="text-muted"></p>
                        </div>
                    </div>
                  </div>
              </div>
          </section>
        </div>
    )
  }
}

export default Contributing;