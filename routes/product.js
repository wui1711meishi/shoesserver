/**
 * Created by wq on 2018/5/22.
 */
var express = require('express');
var router = express.Router();
var query=require('../lib/sql')

/* GET users listing. */
router.get('/',function (req,res) {
    query('select * from shoes',function (err,data) {
        res.json(data)
    })
})
router.post('/add',function (req,res) {
    let name=req.body.name;
    let ename=req.body.ename;
    let price=req.body.price;
    let discount=req.body.discount;
    let description=req.body.description;
    let category=req.body.category;
    let fine=req.body.fine;
    let label=String(req.body['label[]']);


    query(`insert into shoes (name,ename,price,discount,description,category,fine,label) value ('${name}','${ename}','${price}','${discount}','${description}','${category}','${fine}','${label}')`,function (err,data) {
        if(data.affectedRows=='1'){
            console.log('ok')
        }else{
            console.log('no')
        }
    })
})

module.exports = router;