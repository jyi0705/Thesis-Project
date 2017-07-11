pragma solidity ^0.4.4;

import "./IterableMap.sol";

contract Instrument {

  /* Contract-specific structures */
  // struct Participant {
  //   address addr;
  //   uint startAge;
  // }

  struct Pool {
    IterableMap participants;
    uint totalEth;
    uint midAge;
  }

  /* Local variables */
  Pool[] pools;
  uint YEAR_GAP = 6; 
  uint cycleYear = 0;
  address[] verified;

  /**

   */
  function Instrument() {
    // TODO : make contract
    // init, make pools, etc
  }
  
  /**

   */  
  function createPool(uint midAge) {
    // TODO : create a new pool for the collection
    //private
  }
  
  /**

   */
  function addToPool() {
    // TODO : add a new user to the correct 
    // pool in the pool collection
    // user
  }
  
  /**

   */
  function poolForAge() {
    // TODO : find the right pool for a new participant
    // public
  }
  
  /**

   */
  function earlyExit() {
    // TODO : logic for leaving early
    // user
  }
  
  /**
   Admin passes the contract a list of people to withdraw
   from program. The program will loop through 
   */
  function removeFromPool(address[] addr) {
    // TODO : set the live boolean to false for these addr
    // admin
  }

  /**

   */
  function releaseDividend() {
    // TODO : release dividend, 
    // called by admin
  }

  /**

   */
  function collectDividend() {
    // TODO : collect dividend, 
    // called by user
  }
  
  /**

   */
  function selfDestruct() {
    // TODO : kill contract, return eth to users
    // admin
  }
}

