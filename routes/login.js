/**
 * Created by wq on 2018/5/21.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('login');
});

module.exports = router;