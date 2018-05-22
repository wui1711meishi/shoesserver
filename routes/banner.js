/**
 * Created by wq on 2018/5/22.
 */
var express = require('express');
var router = express.Router();
var query=require('../lib/sql')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('banner');
});

module.exports = router;