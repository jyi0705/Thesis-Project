import { combineReducers } from 'redux';
import admins from './Admin/AdminReducer';
import { UserPool } from './User/UserPoolReducer'

const RootReducer = combineReducers({
  UserPool
})

export default RootReducer;