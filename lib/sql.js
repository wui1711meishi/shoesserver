let mysql = require("mysql");
let open = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database:"gocar"
};

let pool=mysql.createPool(open);
function query(str,callback) {
    pool.getConnection(function (err,sql) {    //获取一个接口
        if (err){
            callback(err);
        }else{
            sql.query(str,function (err, res) {
                if (err){
                    callback(err);
                }else{
                    callback(null,res);
                    sql.release();   //把接口还回去
                }
            });
        }
    });
}
module.exports = query;
