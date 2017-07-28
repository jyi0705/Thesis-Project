import React, { Component } from 'react';
import './GetDividend.css'

const GetDividend = ({ handleGetDivClick, adminDividend }) => {
  let showDivButton = null
  if(adminDividend !== 0) {
    showDivButton = <button onClick={handleGetDivClick}>Collect</button>
  }
  return (
    <div className="get-admin-div">
      <p>Current Dividend: {adminDividend} ETH</p>
      {showDivButton}
    </div>
  )
}

export default GetDividend