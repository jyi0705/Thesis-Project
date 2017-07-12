var Instrument = artifacts.require("./Instrument.sol");

contract('Instrument', (accounts) => {
 
  it("should get pool from user age", () => {
    var instrument;
    var age1 = 100;
    var pool1 = 11;
    var age2 = 97;
    var pool2 = 11;
    var age3 = 33;
    var pool3 = 1;
    var age4 = 20;
    var pool4 = 0;
    var age5 = 41;
    var pool5 = 3;
    var age6 = 35;
    var pool6 = 2;
    var age7 = 50;
    var pool7 = 4;
    var age8 = 67;
    var pool8 = 6;
    var age9 = 0;
    var pool9 = 0;
    var age10 = 130;
    var pool10 = 12;
    var ages = [age1, age2, age3, age4, age5, age6, age7, age8, age9, age10];
    var pools = [pool1, pool2, pool3, pool4, pool5, pool6, pool7, pool8, pool9, pool10];

    return Instrument.deployed()
    .then(instance => {
      instrument = instance;
      var promises = ages.map(age => instrument.poolForAge.call(age));
      return Promise.all(promises);
    })
    .then(pools => {
    // pools [ { [String: '11'] s: 1, e: 1, c: [ 11 ] },
    // { [String: '11'] s: 1, e: 1, c: [ 11 ] },
    // { [String: '1'] s: 1, e: 0, c: [ 1 ] },
    // { [String: '0'] s: 1, e: 0, c: [ 0 ] },
    // { [String: '3'] s: 1, e: 0, c: [ 3 ] },
    // { [String: '2'] s: 1, e: 0, c: [ 2 ] },
    // { [String: '4'] s: 1, e: 0, c: [ 4 ] },
    // { [String: '6'] s: 1, e: 0, c: [ 6 ] },
    // { [String: '0'] s: 1, e: 0, c: [ 0 ] },
    // { [String: '12'] s: 1, e: 1, c: [ 12 ] } ]
      pools.forEach((pool, idx) => {
        assert.equal(pool.c[0], pools[idx], "Should correctly map from age to pool");
      });
    });
  });

  it("should add user to pool", () => {
    var instrument;
    var poolIdx;
    var midAgeForPool = 71;
    var age = 69;

    return Instrument.deployed()
    .then(instance => {
      instrument = instance;
      console.log('account', new BigNumber(0))
      return instrument.verify(accounts[0], age);
    })
    .then(() => {
      return instrument.poolForAge.call(age);
    })
    .then(() => {
      return instrument.pool.call(poolIdx);
    })
    .then(pool => {
      console.log("not added yet", pool);
      assert.equal(pool[1].c[0], 0, "Initial user number is incorrect");
      assert.equal(pool[2].c[0], midAgeForPool, "Did not place participant in the correct pool");
    })
    .then((pool) => {
      poolIdx = pool.c[0];
      return instrument.signContract({ from: accounts[0] });
    })
    .then(() => {
      return instrument.pool.call(poolIdx);
    })
    .then(pool => {
      console.log("added", pool);
      assert.equal(pool[1].c[0], 1, "Failed to create user");
      assert.equal(pool[2].c[0], midAgeForPool, "Did not place participant in the correct pool");
    })
  });

  it("should delete from pool", () => {
    var instrument;
    var poolIdx;
    var midAgeForPool = 71;
    var age = 69;

    return Instrument.deployed()
    .then((instance) => {
      instrument = instance;
      return instrument.signContract({ from: accounts[0] }, age);
    })
    .then(() => {
      return instrument.poolForAge(age);
    })
    .then(pool => {
      poolIdx = pool;
      return instrument.removeFromPool([ accounts[0] ]);
    })
    .then(() => {
      return instrument.pools();
    })
    .then(pools => {
      assert.equal(pools[poolIdx].midAge, midAgeForPool, "Did not place participant in the correct pool");
      assert.equal(pools[poolIdx].participants.get(accounts[0]), false, "Failed to delete user");
    })
  });

  it("should convert from age to appropriate pool", () => {
    var instrument;
    var poolIdx;
    var midAgeForPool = 71;
    var age = 69;

    return Instrument.deployed()
    .then((instance) => {
      instrument = instance;
      return instrument.getPoolForAge(age);
    })
    .then(pool => {
      poolIdx = pool;
      return instrument.pools();
    })
    .then(pools => {
      assert.equal(pools[poolIdx].midAge, midAgeForPool, "Failed to get the correct pool for certain age");
    });
  });

  it("should early exit with penalty", () => {
    var instrument;
    var poolIdx;
    var age = 21;

    return Instrument.deployed()
    .then((instance) => {
      instrument = instance;
      return instrument.signContract({ from: accounts[0] }, age);
    })
    .then(() => {
      return instrument.poolForAge(age);
    })
    .then(pool => {
      poolIdx = pool;
      return instrument.earlyExit();
    })
    .then(() => {
      return instrument.pools();
    })
    .then(pools => {
      assert.equal(pools[poolIdx].participants.get(accounts[0]), 10000, "Failed to let user exit");
      assert.equal(pools[poolIdx].balance, 0, "Failed to return funds");
      // need to get fund's balance somehow
      assert.equal(web3.fromWei(eth.getBalance(accounts[0])) , 0, "Failed to impose early exit penalty");
    });
  });

  it("should prevent exit after 5 year limit", () => {
    var instrument;
    var poolIdx;
    var age = 21;

    return Instrument.deployed()
    .then(instance => {
      instrument = instance;
      return instrument.signContract({ from: accounts[0] }, age);
    })
    .then(() => {
      return instrument.poolForAge(age);
    })
    .then(pool => {
      poolIdx = pool;
      var promises = [];
      for (var i = 0; i < 5; i++) {
        promises.push(instrument.releaseDividends({ from: accounts[0] }));
      }
      return promises;
    })
    .then(() => {
      return instrument.earlyExit();
    })
    .then(() => {
      return instrument.pools();
    })
    .then(pools => {
      assert.equal(pools[poolIdx].participants.get(accounts[0]), true, "Failed to prevent 5yo user from exiting");
      // need to get fund's balance somehow
      assert.equal(pools[poolIdx].balance, 10000, "Should not let user leave with funds");
    });
  });

  it("should prevent exit if pool is recieving dividends", () => {
    var instrument;
    var poolIdx;
    var age = 69;

    return Instrument.deployed()
    .then(instance => {
      instrument = instance;
      return instrument.signContract({ from: accounts[0] }, age);
    })
    .then(() => {
      return instrument.poolForAge(age);
    })
    .then(pool => {
      poolIdx = pool;
      return instrument.earlyExit();
    })
    .then(() => {
      return instrument.pools();
    })
    .then(pools => {
      assert.equal(pools[poolIdx].participants.get(accounts[0]), true, "Failed to prevent user over 65 (pool is collecting) from exiting");
    });
  });

  it("should be able to make dividend available", () => {
    var instrument;
    var poolIdx;
    var midAgeForPool = 71;
    var age = 69;
    var testAccount = "0x0f09879ab76195d325cfec0500cbde0ba2bc1f9d";

    return Instrument.deployed()
    .then(instance => {
      instrument = instance;
      return instrument.signContract({ from: accounts[0] }, age);
    })
    .then(() => {
      return instrument.signContract({ from: testAccount }, age);
    })
    .then(() => {
      return instrument.poolForAge(age);
    })
    .then(pool => {
      poolIdx = pool;
      return instrument.releaseDividends({ from: accounts[0] });
    })
    .then(() => {
      return instrument.withdraw([ testAccount ])
    })
    .then(() => {
      return instrument.collectDividend({ from: accounts[0] });
    })
    .then(() => {
      return instrument.collectDividend({ from: testAccount });
    })
    .then(() => {
      // get balance of account[0]
      assert.equal(web3.fromWei(eth.getBalance(accounts[0])), 10000, "Failed to allocate dividend");
      // get balance of testAccount
      assert.equal(web3.fromWei(eth.getBalance(testAccount)), 10000, "Acccidentally allocated dividend to inactive user");
    });
  });

  it("should increment counter and pool's mid upon dividend calling", () => {

    var instrument;
    var poolIdx;
    var midAgeForPool = 71;
    var age = 69;
    var testAccount = "0x0f09879ab76195d325cfec0500cbde0ba2bc1f9d";
    var SKIP_YEARS = 5;

    return Instrument.deployed()
    .then(instance => {
      instrument = instance;
      return instrument.signContract({ from: accounts[0] }, age);
    })
    .then(() => {
      return instrument.signContract({ from: testAccount }, age);
    })
    .then(() => {
      return instrument.poolForAge(age);
    })
    .then(pool => {
      poolIdx = pool;
      var promises = [];
      for (var i = 0; i < SKIP_YEARS; i++) {
        promises.push(instrument.releaseDividends({ from: accounts[0] }));
      }
      return promises;
    })
    .then(() => {
      return instrument.pools();
    })
    .then(pools => {
      assert.equal(pools[poolIdx].midAge, midAgeForPool + SKIP_YEARS, "Failed to update pools timetable after dividend releases");
    });
  });

  // it("should allow users to withdraw after dividend is available", () => {
  //   return Instrument.deployed()
  //   .then(instance => {
  //     return instance.getBalance.call(accounts[0]);
  //   })
  //   .then((balance) => {
  //     assert.equal(balance.valueOf(), 10000, "User failed to receive dividend");
  //   });
  // });
});