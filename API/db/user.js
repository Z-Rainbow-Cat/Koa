const db = require("./index")
const user = {
    login(account,type="account"){
        return new Promise((resolve, rej) => {
            let sql = `SELECT * FROM USER WHERE ${type} = ${account}`  
            db.query(sql,(err,res)=>{
                if(err){
                    console.log(`select error-------${err.message}`)
                    rej(err.message)
                }else{
                    console.log('--------------------------SELECT----------------------------');
                    console.log(res);
                    resolve(res) ;
                    console.log('------------------------------------------------------------\n\n');  
                }
            })
        })
    },
    regist(params){
        let {account,user_name,password} = params ;
        return new Promise((resolve,reject)=>{
            let sql = `INSERT INTO USER (user_name,account,password) VALUE(${user_name},${account},${password})`
            
            db.query(sql,params,(err,res)=>{
                if(err){
                    console.log(`insert error-------${err.message}`)
                    reject(err.message)
                }else{
                    console.log('--------------------------insert----------------------------');
                    console.log(res);
                    resolve(res) ;
                    console.log('------------------------------------------------------------\n\n');  
                }
            })
        })
    },
    update(params) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE USER SET avatar = '${params.avatar}' WHERE user_id = ${params.user_id}`
            db.query(sql,function (err, result) {
                if(err){
                        console.log('[UPDATE ERROR] - ',err.message);
                        return;
                }        
                console.log('--------------------------UPDATE----------------------------');
                console.log('UPDATE affectedRows',result.affectedRows);
                console.log('-----------------------------------------------------------------\n\n');
                });
        })
    }
}
module.exports = user ;