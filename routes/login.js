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
    let username=req.body.username;
    let password=req.body.password;
    let code=req.body.code;
    console.log(code);
    if(code.toUpperCase()!==req.session.code.toUpperCase()){
        res.send('验证码错误')
        return
    }
    else {
        query(`select * from admin where user='${username}'`,function (err,result) {
            if(err){
                throw err
            }
            if(result.length!==0){
                if(password===result[0].pass){
                    req.session.login='yes';
                    req.session.username=username;
                    res.send('ok')
                }else{
                    res.send('密码错误')
                }
            }else{
                res.send('账号不存在')
            }
        });
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