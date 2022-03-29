const Router = require("@koa/router");
const router = new Router({prefix:"/user"})
const userDb = require("../db/user")
router.post("/login",async (ctx)=>{
    let {account,password} = ctx.request.body;

    let result = await userDb.login(account)

    if(result.length === 0){
        ctx.status = 400
        ctx.body = {
            msg:"账号不存在"
        }
    }else{
        let user = result[0]
        if(user.password === password){
            ctx.status = 200
            ctx.body = user
        }else{
            ctx.status = 400
            ctx.body = {
                msg:"您输入的密码错误"
            }
        }
    }
})
router.post("/regist",async (ctx)=>{
    let body = ctx.request.body;

    let result = await userDb.regist(body)

    console.log(result)
})
module.exports = router