/**
 * Created by wq on 2018/5/22.
 */
var express = require('express');
var router = express.Router();
var query=require('../lib/sql');
var fs=require('fs');
var multer=require('multer');


router.get('/bannerset',function (req,res) {
    query('select * from banner',function (err,result) {
        if(err) throw err;
        else {
            res.send(result);
        }
    })
});


var upload=multer({
    dest:'./bin'
});
router.post('/',upload.single('file'),function(req, res, next) {
    res.send(req.file.path)
});


router.post('/submit',function (req,res) {
    let body=req.body;
    let sid=body.input;
    let img=JSON.parse(body.fileList);
    let str=[];
    img.forEach(val=>{
        if(val.response){
            let newpath='/'+Date.now()+val.name;
            fs.renameSync(val.response,'./public/banner'+newpath);
            let image = '/api/banner' + newpath;
            let obj = {name: val.name, url: image};
            str.push(JSON.stringify(obj));
        }else{
            let obj = {name: val.name, url: val.url};
            str.push(JSON.stringify(obj));
        }
    });
    query(`insert into banner (sid,img) values ('${sid}','${str}')`,function (err,result) {
        if(err) throw err;
        else {
            if(result.affectedRows=='1'){
                res.send('1');
            }else {
                res.send('0');
            }
        }
    })
});

router.get('/del',function (req,res) {
    query(`delete from banner where id=${req.query.id}`,function (err,result) {
        if(err) throw err;
        else {
            if(result.affectedRows=='1'){
                res.send('1')
            }else {
                res.send('0')
            }
        }
    })
});

router.get('/update',function (req,res) {
    let id=req.query.id;
    query(`select * from banner where id=${id}`,function (err,result) {
        if(err) throw err;
        res.json(result)
    })
});

router.post('/changeget',function (req,res) {
    let id=req.body.id;
    let sid=req.body.input;
    let filelist=JSON.parse(req.body.fileList);
    let str=[];
    filelist.forEach(val => {
        if (val.response) {
            let newpath = '/' + Date.now() + val.name;
            fs.renameSync(val.response, './public/banner' + newpath);
            let image = '/api/banner' + newpath;
            let obj = {name: val.name, url: image};
            str.push(JSON.stringify(obj));
        } else {
            let obj = {name: val.name, url: val.url};
            str.push(JSON.stringify(obj));
        }
    });
    let images = str.join('--');
    query(`update banner set sid=${sid},img='${images}' where id=${id}`, function (err, data) {
        if (data.affectedRows == '1') {
            res.send('1')
        } else {
            res.send('0')
        }
    })
});

module.exports = router;