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
    let user=req.body.username;
    let pass=req.body.password;
    let code=req.body.code;
    let sessionCode=req.session.code;
    if(sessionCode.toLowerCase()==code.toLowerCase()){
        query('select * from admin',function (err,data) {
            if(err) throw err;
            if(data[0].user==user){
                if(data[0].pass==pass){
                    res.send('3')
                }else {
                    res.send('2')
                }
            }else {
                res.send('1')
            }
        })
    }else {
        res.send('0');
    }
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