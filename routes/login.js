/**
 * Created by wq on 2018/5/21.
 */
var express = require('express');
var router = express.Router();
var query=require('../lib/sql');
var svgCaptcha = require('svg-captcha');
var session = require('express-session');


/* GET users listing. */
router.post('/',function (req,res) {
    let user=req.body.user;
    let pass=req.body.pass;
    query('select * from user',function (err,data) {
        let a=data.some((val,ind)=>{
            return val.user==user&&val.pass==pass;
        })
        if(a){
            res.send('ok')
        }else{
            res.send('no')
        }
    })
});
router.get('/captcha', function (req, res) {
    var captcha = svgCaptcha.create({
        ignoreChars: '0o1iD',
        color: false,
        background: '#ccc'
    });
    req.session.code = captcha.text;
    res.type('svg'); // 使用ejs等模板时如果报错 res.type('html')
    res.status(200).send(captcha.data);
});



module.exports = router;