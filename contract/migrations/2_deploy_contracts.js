var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var IterableMapping = artifacts.require("./IterableMapping.sol");
var TestMapping = artifacts.require("./TestMapping.sol");
var Instrument = artifacts.require("./Instrument.sol");
var UtilsLib = artifacts.require("./UtilsLib.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);

  deployer.deploy(IterableMapping);
  deployer.link(IterableMapping, Instrument);
  deployer.deploy(Instrument);

  deployer.deploy(IterableMapping);
  deployer.deploy(UtilsLib);
  deployer.link(UtilsLib, TestMapping);
  deployer.link(IterableMapping, TestMapping);
  deployer.deploy(TestMapping);
};
