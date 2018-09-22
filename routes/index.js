'use strict'
var express = require('express');
var router = express.Router();
var express = require('express');
var mongoose = require('mongoose');





//Setting up Database - Mongo  
mongoose.connect('mongodb://fabiotest:fabio1993@ds117362.mlab.com:17362/todo-test');
var db = mongoose.connection;

db.on('error', function(err) {
    console.log('connection error', err);
});
db.once('open', function() {
    console.log('connected to database');
});


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/* GET home page. */
router.get('/', function(req, res, next) {
    // pushMessage('1', '1', '1', '1');
   
});


module.exports = router;


