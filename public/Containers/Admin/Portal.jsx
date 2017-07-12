import React, { Component } from 'react';
import DeleteUsers from './DeleteUsers.jsx';
import Pools from './Pools.jsx';
import Dividends from './Dividends.jsx';

var Portal = (props) => (
  <div>
    <DeleteUsers/>
    <Pools/>
    <Dividends/>
  </div>
);

module.exports = Portal;