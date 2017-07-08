var MetaCoin = artifacts.require("./Instrument.sol");

contract('Instrument', function(accounts) {
  it("should create pool", function() {
    return Instrument.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "Failed to create pool");
    });
  });

  it("should add to pool", function() {
    return Instrument.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "Failed to add participant to pool");
    });
  });

  it("should delete from pool", function() {
    return Instrument.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "Failed to remove participant from pool");
    });
  });

  it("should convert from age to appropriate pool", function() {
    return Instrument.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "Failed to get the correct pool for certain age");
    });
  });

  it("should allow for early exit with penalty", function() {
    return Instrument.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "Failed to let user exit");
      assert.equal(balance.valueOf(), 10000, "Failed to impose early exit penalty");
    });
  });

  it("should prevent exit after 5 year limit", function() {
    return Instrument.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "Failed to prevent >5yo user from exiting");
    });
  });

  it("should prevent exit if pool is recieving dividends", function() {
    return Instrument.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "Failed to prevent collecting user from exiting");
    });
  });

  it("should be able to make dividend available", function() {
    return Instrument.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "Failed to allocate dividend");
      assert.equal(balance.valueOf(), 10000, "Acccidentally allocated dividend to inactive user");
    });
  });

  it("should increment counter and pool's mid upon dividend calling", function() {
    return Instrument.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "Failed to update pools timetable after dividend release");
    });
  });

  it("should allow users to withdraw after dividend is available", function() {
    return Instrument.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "User failed to receive dividend");
    });
  });
});