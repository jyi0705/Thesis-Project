const express = require('express');
const parser = require('body-parser');
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');

const app = express()
  .use(parser.json())
  .use(parser.urlencoded({ extended: true }))
  .use(express.static('/public'))
  .use(morgan('dev'))


app.listen(PORT, err => {
  if(err){
    console.log('Err in connecting to the server');
  } else {
    console.log(`Successfully connected to server on PORT: ${PORT}`);
  }
})