pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/IterableMap.sol";

contract TestIterableMap {

  function beforeEach() {
    IterableMap iterMap;
  }

  function testHasCorrectMethods() {
    Assert.exists(iterMap.set, "Iterable map should have set");
    Assert.exists(iterMap.get, "Iterable map should have get");
    Assert.exists(iterMap.forEach, "Iterable map should have for each");
    Assert.exists(iterMap.delete, "Iterable map should have delete");
  }
  
  function testCanSetAndGetParticipant() {
    uint testAddr = "123394230954969340";

    iterMap.set(testAddr, true);

    Assert.equal(iterMap.get(testAddr), true, "Iterable map should set participant");
  }

  function testCanRemoveParticipant() {
    uint testAddr = "123394230954969340";

    iterMap.set(testAddr, true);

    Assert.equal(iterMap.get(testAddr), true, "Iterable map should set participant");

    iterMap.delete(testAddr);

    Assert.equal(iterMap.get(testAddr), false, "Iterable map should delete participant");
  }

  function testCanIterateOverParticipants() {
    uint testAddr1 = "123394230954969340";
    uint testAddr2 = "009283948905834098";
    uint testAddr3 = "00928394865834098";
    uint count = 0;
    uint expectedCount = 3;

    iterMap.set(testAddr1, true);
    iterMap.set(testAddr2, true);
    iterMap.set(testAddr3, true);

    iterMap.forEach(function(uint addr) {
      count++;
    });

    Assert.equal(count, expected, "Iterable map should be able to iterate");
  }

  function testIterMapIntegration() {
    uint testAddr1 = "123394230954969340";
    uint testAddr2 = "009283948905834098";
    uint testAddr3 = "00928394865834098";
    uint count = 0;
    uint expectedCount = 3;

    iterMap.set(testAddr1, true);
    iterMap.set(testAddr2, true);
    iterMap.set(testAddr3, true);

    iterMap.forEach(function(uint addr) {
      count++;
      if (addr != testAddr1)
        iterMap.delete(addr);
    });

    Assert.equal(count, expectedCount, "Iterable map should be able to iterate");
    Assert.equal(iterMap.get(testAddr1), true, "Iterable map should be able to insert and keep");
    Assert.equal(iterMap.get(testAddr2), true, "Iterable map should be able to insert and delete");
    Assert.equal(iterMap.get(testAddr3), true, "Iterable map should be able to insert and delete");
  }
}
