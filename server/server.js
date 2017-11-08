const express = require('express'),
      parser = require('body-parser'),
      PORT = process.env.PORT || 3003,
      morgan = require('morgan'),
      mongoose = require('mongoose'),
      userRoutes = require('./userRoutes'),
      adminRoutes = require('./adminRoutes'),
      dotenv = require('dotenv'),
      path = require('path')
      env = process.env.NODE_ENV || 'development',
      config = require('../config')[env];

const result = dotenv.config()

if (result.error) {
  throw result.error
}

mongoose.connect(process.env.DB_URL);
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to DB')
});

const app = express()
  .use(parser.json())
  .use(parser.urlencoded({ extended: true }))
  .use(morgan('dev'))
  .use(express.static('public'))
  .use('/api/user', userRoutes)
  .use('/api/admin', adminRoutes)
  .get('*.js', (req, res, next) => {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  })
  .get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })
  .listen(PORT, () => {
    console.log(`Successfully connected to server on PORT: ${PORT}`)
  });

// app.listen(PORT, err => {
//   if(err){
//     console.log('Err in connecting to the server');
//   } else {
//     console.log(`Successfully connected to server on PORT: ${PORT}`);
//   }
// })