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
    let fine=Boolean(req.body.fine);
    let label=String(req.body['label[]']);


    query(`insert into shoes (name,ename,price,discount,description,category,fine,label) value ('${name}','${ename}','${price}','${discount}','${description}','${category}','${fine}','${label}')`,function (err,data) {
        if(data.affectedRows=='1'){
            res.send('1')
        }else{
            res.send('0')
        }
    })
})
router.get('/changeget',function (req,res) {
    let id=req.query.id;
    query('select * from shoes where id='+id,function (err,data) {
        res.json(data)
    })
})
router.post('/change',function (req,res) {
    let name=req.body.name;
    let ename=req.body.ename;
    let price=req.body.price;
    let discount=req.body.discount;
    let description=req.body.description;
    let category=req.body.category;
    let fine=String(req.body.fine);
    let id=req.body.id;
    let label=String(req.body['label[]']);

    query(`update shoes set name='${name}',ename='${ename}',price='${price}',discount='${discount}',description='${description}',category='${category}',fine='${fine}',label='${label}' where id=${id}`,function (err,data) {
        if(data.affectedRows=='1'){
            res.send('1')
        }else{
            res.send('0')
        }
    })
})
router.post('/delete',function (req,res) {
    let id=req.body.id;
    query(`delete from shoes where id=${id}`,function (err,data) {
        if(data.affectedRows=='1'){
            res.send('1')
        }else{
            res.send('0')
        }
    })
})

module.exports = router;