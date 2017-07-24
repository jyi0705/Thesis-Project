import { combineReducers } from 'redux';
import { Admin } from './Admin/AdminReducer';
import { UserPool } from './User/UserPoolReducer';
import { SmartContract } from './User/UserPoolReducer';
import { account, web3, Instrument } from '../web3'

const Web3Instance = () => {
  return {
    Web3: web3,
    Account: account,
    Instrument: Instrument
  } 
}

const RootReducer = combineReducers({
  SmartContract,
  UserPool,
  Admin,
  Web3Instance
})

export default RootReducer;