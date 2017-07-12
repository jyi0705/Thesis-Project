pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TestUtils.sol";

contract TestInstrumentUtils {

  function testAddressCoverter() {
    string str = string(msg.sender);
    address addr = UtilsLib.parseAddr(str);
    Assert.equal(msg.sender, addr, "Parse address should convert string -> address");
  }
}
