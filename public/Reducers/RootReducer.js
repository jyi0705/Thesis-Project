import { combineReducers } from 'redux';
import pool from './User/UserPoolReducer';


const RootReducer = combineReducers({
  pool
})

export default RootReducer;