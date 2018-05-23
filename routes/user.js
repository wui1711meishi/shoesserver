var express = require('express');
var router = express.Router();
var query=require('../lib/sql')

/* GET users listing. */
router.get('/',function (req,res) {
    query('select * from user',function (err,data) {
        res.json(data)
    })
})
router.get('/order',function (req,res) {
    let id=req.query.id;
    query('select * from orders where uid='+id,function (err,data) {
        res.json(data)
    })
})
router.get('/car',function (req,res) {
    let id=req.query.id;
    query('select * from car where uid='+id,function (err,data) {
        res.json(data)
    })
})

module.exports = router;
