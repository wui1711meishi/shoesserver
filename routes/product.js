/**
 * Created by wq on 2018/5/22.
 */
var express = require('express');
var router = express.Router();
var query = require('../lib/sql');
var fs = require('fs');
var multer = require('multer');
var path = require('path');

var upload = multer({
    dest: './bin'
});
router.post('/', upload.single('file'), function (req, res, next) {
    res.send(req.file.path)
});

/* GET users listing. */
router.get('/', function (req, res) {
    query('select * from shoes', function (err, data) {
        res.json(data)
    })
});
router.post('/add', function (req, res) {
    let name = req.body.name;
    let ename = req.body.ename;
    let price = req.body.price;
    let discount = req.body.discount;
    let description = req.body.description;
    let category = req.body.category;
    let fine = Boolean(req.body.fine);
    let label = String(req.body['label[]']);
    let img = JSON.parse(req.body.fileList);
    let bigimg = JSON.parse(req.body.fileList_1);

    let str = [];
    img.forEach(val => {
        let newpath = '/' + Date.now() + val.name;
        fs.renameSync(val.response, './public/images' + newpath);
        let image = '/api/images' + newpath;
        let obj = {name: val.name, url: image};
        str.push(JSON.stringify(obj));
    });
    let images = str.join('--');

    let str_1 = [];
    bigimg.forEach(val => {
        let newpath = '/' + Date.now() + val.name;
        fs.renameSync(val.response, './public/bigimages' + newpath);
        let image = '/api/bigimages' + newpath;
        let obj = {name: val.name, url: image};
        str_1.push(JSON.stringify(obj));
    });
    let bigimages = str_1.join('--');

    query(`insert into shoes (name,ename,price,discount,description,category,fine,label,img,bigimg) values ('${name}','${ename}','${price}','${discount}','${description}','${category}','${fine}','${label}','${images}','${bigimages}')`, function (err, data) {
        if (err) throw err;
        else {
            if (data.affectedRows == '1') {
                res.send('1')
            } else {
                res.send('0')
            }
        }
    })
});


router.get('/changeget', function (req, res) {
    let id = req.query.id;
    query('select * from shoes where id=' + id, function (err, data) {
        res.json(data)
    })
});
router.post('/change', function (req, res) {
    let name = req.body.name;
    let ename = req.body.ename;
    let price = req.body.price;
    let discount = req.body.discount;
    let description = req.body.description;
    let category = req.body.category;
    let fine = String(req.body.fine);
    let id = req.body.id;
    let label = String(req.body['label[]']);
    let img = JSON.parse(req.body.fileList);
    let bigimg = JSON.parse(req.body.fileList_1);
    let str = [];
    img.forEach(val => {
        if (val.response) {
            let newpath = '/' + Date.now() + val.name;
            fs.renameSync(val.response, './public/images' + newpath);
            let image = '/api/images' + newpath;
            let obj = {name: val.name, url: image};
            str.push(JSON.stringify(obj));
        } else {
            let obj = {name: val.name, url: val.url};
            str.push(JSON.stringify(obj));
        }
    });
    let images = str.join('--');

    let str_1 = [];
    bigimg.forEach(val => {
        if (val.response) {
            let newpath = '/' + Date.now() + val.name;
            fs.renameSync(val.response, './public/bigimages' + newpath);
            let image = '/api/bigimages' + newpath;
            let obj = {name: val.name, url: image};
            str_1.push(JSON.stringify(obj));
        } else {
            let obj = {name: val.name, url: val.url};
            str_1.push(JSON.stringify(obj));
        }
    });
    let bigimages = str_1.join('--');
    query(`update shoes set name='${name}',ename='${ename}',price='${price}',discount='${discount}',description='${description}',category='${category}',fine='${fine}',label='${label}',img='${images}',bigimg='${bigimages}' where id=${id}`, function (err, data) {
        if (data.affectedRows == '1') {
            res.send('1')
        } else {
            res.send('0')
        }
    })
});
router.post('/delete', function (req, res) {
    let id = req.body.id;
    query(`delete from shoes where id=${id}`, function (err, data) {
        if (data.affectedRows == '1') {
            res.send('1')
        } else {
            res.send('0')
        }
    })
})

router.post('/order', function (req, res) {
    let size=req.body.size;
    let color=req.body.color;
    let num=req.body.num;
    let sid=req.body.sid;
    let name="";
    let price="";
    let img="";
    let ordernumber=new Date().getTime();
    query(`select * from shoes where id=${sid}`,(err,data)=> {
        name=data[0].name;
        price=data[0].price;
        img=JSON.parse(data[0].img.split('--')[0]).url;
        query(`insert into orders (sid,ordernumber,name,price,size,color,num,img) value ('${sid}','${ordernumber}','${name}','${price}','${size}','${color}','${num}','${img}')`,function (err,data) {

        })

    })
})
// 添加购物车按钮
router.post('/addcar',function (req,res) {
    let sid=req.body.id;
    let user=sessionStorage.user;
    query(`select * from user where user=${user}`,function (err,data) {
        console.log(data)
    })
})

router.post('/adar', function (req, res) {
    let add=req.body.add;
    let sid=req.body.sid;
        query(`update orders set address='${add}' where sid=${sid}`,function (err,data) {

        })
    query(`select ordernumber from orders where sid=${sid}`,function (err,data) {
        res.json(data);
    })
})

router.get('/my',function (req,res) {
    query(`select * from orders`,function (err,data) {
        res.json(data);
    })
})

router.get('/del',function (req,res) {
    let id=req.query.id;
    query(`delete from orders where id=${id}`,function (err,data) {

    })
})

router.get('/car',function (req,res) {
    query(`select * from orders`,function (err,data) {
        res.json(data)
    })
})

module.exports = router;