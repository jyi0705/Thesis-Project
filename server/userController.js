const User = require('../database/userModel')

module.exports = {
  getAllUsers: function(req, res) {
    User
      .find({})
      .exec( function(err, users) {
        if (err) return console.log(err)
        res.json({ success: true, message: 'all users', users: users })
      })
  },
  create: function(req, res) {
    console.log(req.body)
    var newUser = new User(req.body);
    newUser.save(function(err, user) {
      console.log(user)
      if (!user) return res.json({success: false, message: 'user already exists'})
      if (err) return console.log(err)
      res.json({success: true, message: 'user created', user: user});
    })
  }
}