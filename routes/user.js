var express = require('express');
var router = express.Router();
var query=require('../lib/sql')

/* GET users listing. */
router.get('/',function (req,res) {
    query('select * from user',function (err,data) {
        res.json(data)
    })
})

module.exports = router;
