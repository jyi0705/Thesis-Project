import axios from 'axios';
import { account, web3, Instrument } from '../../web3.js'

export const IS_ADMIN = 'IS_ADMIN';

export const isAdmin = (userAddress) => {
  const request = axios.get(`/api/admin/${userAddress}`)
  return {
    type: IS_ADMIN,
    payload: request
  };
};