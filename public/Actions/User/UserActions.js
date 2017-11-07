import axios from 'axios';
import { account, web3, Instrument } from '../../web3.js'
export const GET_POOL_INFO = 'GET_POOL_INFO';
export const GET_ETH_PRICE = 'GET_ETH_PRICE';
export const IS_VERIFIED = 'IS_VERIFIED'

// put the functions that directly interact with the blockchain inside of here
// as the payload
// to call these function use store.dispatch(getPoolEthAmount)
// you can get the state by using store.getState()
export const isVerified = (walletAddress) => {
  const request = axios.get(`/api/user/find/${walletAddress}`)
  return {
    type: IS_VERIFIED,
    payload: request
  }
}

export const getPoolInfo = async (Instrument, Account) => {
  let instrument;
  let poolIdx;
  let poolInfoObj = {};
  let isFound;
  
  await Instrument.deployed().then(instance => {
    instrument = instance;
    return instrument.poolForAddress.call({from: Account});
  }).then((indexObj) => {
    // let indexObjParse = JSON.parse(indexObj)
    poolIdx = JSON.parse(indexObj[0])
    isFound = JSON.parse(indexObj[1])
    return instrument.pool.call(poolIdx);
  }).then((pool) => {
    poolInfoObj.numPart = JSON.parse(pool[0])
    poolInfoObj.poolEthTotal = JSON.parse(pool[1])
    poolInfoObj.midAge = JSON.parse(pool[2])
  })
  if(isFound) {
    return {
      type: GET_POOL_INFO,
      payload: poolInfoObj
    };
  }
  return {
    type: GET_POOL_INFO,
    payload: false
  };
};

export const getEthPrice = () => {
  const request = axios.get('/api/user/ethPrice')
  return {
    type: GET_ETH_PRICE,
    payload: request
  }
}