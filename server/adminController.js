const User = require('../database/userModel')

module.exports = {
  addTestResultToUser: (req, res) => {
    let testResults = req.body.testResults
    User.findOneAndUpdate({walletId: req.body.walletId}, 
                          { $set: {
                              verified: true
                            },
                            $push: {
                              testResults: {
                                isLiving: testResults.isLiving,
                                date: new Date(),
                                age: testResults.age 
                              }
                            }
                          },
                          { new: true },
                          (err, updatedUser) => {
                            if(err) return console.log('err', err)
                            res.json({ success: true, message: 'updated user', updatedUser: updatedUser })
                          })
  }
}