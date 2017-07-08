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
    uint total;
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
  }
  
  /**

   */  
  function createPool(uint lowAge) {
    // TODO : create a new pool for the collection
  }
  
  /**

   */
  function addToPool() {
    // TODO : add a new user to the correct 
    // pool in the pool collection
  }
  
  /**

   */
  function poolForAge() {
    // TODO : find the right pool for a new participant
  }
  
  /**

   */
  function earlyExit() {
    // TODO : logic for leaving early
  }
  
  /**
   Admin passes the contract a list of people to withdraw
   from program. The program will loop through 
   */
  function removeFromPool(address[] addr) {
    // TODO : set the live boolean to false for these addr
  }
  
  /**
   
   */
  function withdrawl(address[] addr) {
    // TODO : set the live boolean to false for these addr
  }

  /**

   */
  function releaseDividend(Pool[] pools) {
    // TODO : release dividend, 
    // try to set timer until it can be called again
  }
  
  /**

   */
  function selfDestruct() {
    // TODO : kill contract, return eth to users
  }


}