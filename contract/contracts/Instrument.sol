pragma solidity ^0.4.4;

import "./IterableMapping.sol";
import "./UtilsLib.sol";

contract Instrument {

  /* Contract-specific structures */
  struct Participant {
    uint startAge;
    bool verified;
    bool added;
  }

  struct Pool {
    IterableMapping.itmap participants;
    uint totalEth;
    uint midAge;
  }

  /* Local variables */
  Pool[] pools;
  mapping(address => Participant) waitlist;
  address owner;
  uint LOW_AGE = 20;
  uint GAP = 6;

  // struct Verify { address walletAdd; bool verified; }
  /**

   */
  function Instrument() {
    owner = msg.sender;
    for (var i = 0; i < 12; i++) {
      createPool(LOW_AGE + GAP / 2 + i * GAP);
    }
  }
  
  function pool(uint idx) returns (uint participants, uint totalEth, uint midAge) {
    participants = pools[idx].participants.size;
    totalEth = pools[idx].totalEth;
    midAge = pools[idx].midAge;
  }
  /**

   */  
  function createPool(uint midAge) {
    // TODO : create a new pool for the collection
    // pools.push(Pool({
    //   participants: participants.set(this, 0, address),
    //   total: 1.
    //   midAge: midAge
    // }))
    Pool storage newPool;
    newPool.midAge = midAge;
    newPool.totalEth = 0;
    pools.push(newPool);
  }
  
  /**

   */
  function verify(address addr, uint age) {
    waitlist[addr].verified = true;
    waitlist[addr].startAge = age;
    waitlist[addr].added = false;
  }

   /**

   */
  function signContract() payable {
    // uint index = poolForAge(user).participants.size;
    // poolForAge(user).participants.set(this, index, user);
    Participant user = waitlist[msg.sender];
    if (!user.verified || user.added) {
      //TODO : Event -> failed to add participant
      return;
    } 
    
    //TODO : move money to pool
    user.verified = false;
    user.added = true;
    uint poolIdx = poolForAge(user.startAge);
    IterableMapping.set(pools[poolIdx].participants, msg.sender, true);
    //TODO : Event -> added participant
  }
  
  /**

   */
  function poolForAge(uint age) returns (uint idx) {
    uint BASE = 20;
    uint GAP = 6;
    uint currentMid = BASE + GAP / 2;
    idx = 0;

    while (age > currentMid + GAP / 2 && idx < 12) {
      currentMid += GAP + 1;
      idx++;
    }
  }
    // function g(num) {
    //   i = 23;
    //   j = 0;
    //   while (i < 100) {
    //     if (num <= i + 3) {
    //       break;
    //     }
    //     i += 7;
    //     j++;
    //   }
    //   return j;
    // };
    
    // 
    // function f() {
    //   var arr = [];
    //   var SKIP = 6;
    //   i = 20;
    //   j = 26;
    //   for (let k = 0; k < 14; k++) {
    //     arr.push(JSON.stringify([i, j]));
    //     i = j + 1;
    //     j = i + 6;
    //   }
    //   return arr;
    // };

  
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

  }

  /**

   */
  function withdrawl(address[] addr) {
    // TODO : set the live boolean to false for these addr
    // for(uint i = 0; i < addr.length; i++) {
    //   for(uint j = 0; j < verified.length; j++) {
    //     if(addr[i] === verified[j].walletAdd) {
    //       verified[j].verified = false;
    //     }
    //   }
    // }
    
  }

  /**

   */
  function collectDividend() {
    // TODO : collect dividend, 
    // called by user
  }

    /**

   */
  function releaseDividend() {
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

