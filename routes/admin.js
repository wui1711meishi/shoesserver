var express = require('express');
var router = express.Router();
var query=require('../lib/sql')

/* GET home page. */
router.get('/',function (req,res) {
    query('select * from admin',function (err,data) {
        res.json(data)
    })
})

module.exports = router;
