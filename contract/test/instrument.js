var MetaCoin = artifacts.require("./Instrument.sol");

contract('Instrument', function(accounts) {

  it("should add user to pool", function() {
    var instrument;
    var poolIdx;
    var midAgeForPool = 71;
    var age = 69;

    return Instrument.deployed()
    .then(function(instance) {
      instrument = instance;
      return instrument.addToPool({ from: accounts[0] }, age);
    })
    .then(function() {
      return instrument.poolForAge(age);
    })
    .then(function(pool) {
      poolIdx = pool;
      return instrument.pools();
    })
    .then(function(pools) {
      assert.equal(pools[poolIdx].midAge, midAgeForPool, "Did not place participant in the correct pool");
      assert.equal(pools[poolIdx].participants.get(accounts[0]), true, "Failed to create user");
    })
  });

  it("should delete from pool", function() {
    var instrument;
    var poolIdx;
    var midAgeForPool = 71;
    var age = 69;

    return Instrument.deployed()
    .then(function(instance) {
      instrument = instance;
      return instrument.addToPool({ from: accounts[0] }, age);
    })
    .then(function() {
      return instrument.poolForAge(age);
    })
    .then(function(pool) {
      poolIdx = pool;
      return instrument.removeFromPool([ acounts[0] ]);
    })
    .then(function() {
      return instrument.pools();
    })
    .then(function(pools) {
      assert.equal(pools[poolIdx].midAge, midAgeForPool, "Did not place participant in the correct pool");
      assert.equal(pools[poolIdx].participants.get(accounts[0]), false, "Failed to delete user");
    })
  });

  it("should convert from age to appropriate pool", function() {
    var instrument;
    var poolIdx;
    var midAgeForPool = 71;
    var age = 69;

    return Instrument.deployed()
    .then(function(instance) {
      instrument = instance;
      return instrument.getPoolForAge(age);
    })
    .then(function(pool) {
      poolIdx = pool;
      return instrument.pools();
    })
    .then(function(pools) {
      assert.equal(pools[poolIdx].midAge, midAgeForPool, "Failed to get the correct pool for certain age");
    });
  });

  it("should early exit with penalty", function() {
    var instrument;
    var poolIdx;
    var age = 21;

    return Instrument.deployed()
    .then(function(instance) {
      instrument = instance;
      return instrument.addToPool({ from: accounts[0] }, age);
    })
    .then(function() {
      return instrument.poolForAge(age);
    })
    .then(function(pool) {
      poolIdx = pool;
      return instrument.earlyExit();
    })
    .then(function() {
      return instrument.pools();
    })
    .then(function(pools) {
      assert.equal(pools[poolIdx].participants.get(accounts[0]), 10000, "Failed to let user exit");
      assert.equal(pools[poolIdx].balance, 0, "Failed to return funds");
      // need to get fund's balance somehow
      assert.equal(web3.fromWei(eth.getBalance(accounts[0])) , 0, "Failed to impose early exit penalty");
    });
  });

  it("should prevent exit after 5 year limit", function() {
    var instrument;
    var poolIdx;
    var age = 21;

    return Instrument.deployed()
    .then(function(instance) {
      instrument = instance;
      return instrument.addToPool({ from: accounts[0] }, age);
    })
    .then(function() {
      return instrument.poolForAge(age);
    })
    .then(function(pool) {
      poolIdx = pool;
      var promises = [];
      for (var i = 0; i < 5; i++) {
        promises.push(instrument.releaseDividends({ from: account[0] }));
      }
      return promises;
    })
    .then(function() {
      return instrument.earlyExit();
    })
    .then(function() {
      return instrument.pools();
    })
    .then(function(pools) {
      assert.equal(pools[poolIdx].participants.get(accounts[0]), true, "Failed to prevent 5yo user from exiting");
      // need to get fund's balance somehow
      assert.equal(pools[poolIdx].balance, 10000, "Should not let user leave with funds");
    });
  });

  it("should prevent exit if pool is recieving dividends", function() {
    var instrument;
    var poolIdx;
    var age = 69;

    return Instrument.deployed()
    .then(function(instance) {
      instrument = instance;
      return instrument.addToPool({ from: accounts[0] }, age);
    })
    .then(function() {
      return instrument.poolForAge(age);
    })
    .then(function(pool) {
      poolIdx = pool;
      return instrument.earlyExit();
    })
    .then(function() {
      return instrument.pools();
    })
    .then(function(pools) {
      assert.equal(pools[poolIdx].participants.get(accounts[0]), true, "Failed to prevent user over 65 (pool is collecting) from exiting");
    });
  });

  it("should be able to make dividend available", function() {
    var instrument;
    var poolIdx;
    var midAgeForPool = 71;
    var age = 69;
    var testAccount = "0x0f09879ab76195d325cfec0500cbde0ba2bc1f9d";

    return Instrument.deployed()
    .then(function(instance) {
      instrument = instance;
      return instrument.addToPool({ from: accounts[0] }, age);
    })
    .then(function() {
      return instrument.addToPool({ from: testAccount }, age);
    })
    .then(function() {
      return instrument.poolForAge(age);
    })
    .then(function(pool) {
      poolIdx = pool;
      return instrument.releaseDividends({ from: account[0] });
    })
    .then(function() {
      return instrument.withdraw([ testAccount ])
    })
    .then(function() {
      return instrument.collectDividend({ from: account[0] });
    })
    .then(function() {
      return instrument.collectDividend({ from: testAccount });
    })
    .then(function() {
      // get balance of account[0]
      assert.equal(web3.fromWei(eth.getBalance(accounts[0])), 10000, "Failed to allocate dividend");
      // get balance of testAccount
      assert.equal(web3.fromWei(eth.getBalance(testAccount)), 10000, "Acccidentally allocated dividend to inactive user");
    });
  });

  it("should increment counter and pool's mid upon dividend calling", function() {

    var instrument;
    var poolIdx;
    var midAgeForPool = 71;
    var age = 69;
    var testAccount = "0x0f09879ab76195d325cfec0500cbde0ba2bc1f9d";
    var SKIP_YEARS = 5;

    return Instrument.deployed()
    .then(function(instance) {
      instrument = instance;
      return instrument.addToPool({ from: accounts[0] }, age);
    })
    .then(function() {
      return instrument.addToPool({ from: testAccount }, age);
    })
    .then(function() {
      return instrument.poolForAge(age);
    })
    .then(function(pool) {
      poolIdx = pool;
      var promises = [];
      for (var i = 0; i < SKIP_YEARS; i++) {
        promises.push(instrument.releaseDividends({ from: account[0] }));
      }
      return promises;
    })
    .then(function() {
      return instrument.pools();
    })
    .then(function(pools) {
      assert.equal(pools[poolIdx].midAge, midAgeForPool + SKIP_YEARS, "Failed to update pools timetable after dividend releases");
    });
  });

  // it("should allow users to withdraw after dividend is available", function() {
  //   return Instrument.deployed()
  //   .then(function(instance) {
  //     return instance.getBalance.call(accounts[0]);
  //   })
  //   .then(function(balance) {
  //     assert.equal(balance.valueOf(), 10000, "User failed to receive dividend");
  //   });
  // });
});