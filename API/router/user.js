const Router = require("@koa/router");
const path = require("path")
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
    let { account, user_name, password } = body;

    if (!account) {
        ctx.status = 400
        ctx.body = {
            msg:"请输入账号"
        }
        return;
    }
    if (!user_name) {
        ctx.status = 400
        ctx.body = {
            msg:"请输入用户名"
        }
        return;
    }
    if (!password) {
        ctx.status = 400
        ctx.body = {
            msg:"请输入密码"
        }
        return;
    }

    let result = await userDb.login(account)

    if (result.length > 0) {
        ctx.status = 400
        ctx.body = {
            msg:"账号已存在，请直接登录"
        }
        return;
    } else {
        let regist = await userDb.regist(body)
        if (regist) {
            ctx.status = 200
            ctx.body = {
                msg:"注册成功，请登录"
            }
        }
    }
})
router.post("/avatar", async (ctx) => {
    const file = ctx.request.files.file;
    const { user_id } = ctx.request.body;
    let result = await userDb.login(user_id, "user_id");
    let baseName = path.basename(file.path)
    let avatar = `http://${ctx.host}/user/${baseName}`
    if (result.length > 0) {
        let ava = userDb.update({ user_id, avatar })
        ctx.status = 200;
        ctx.body = {
            url
        }
        console.log(ava)
    } else {
        ctx.status = 400;
        ctx.body = {
            msg:"未登录或登录已过期，请重新登录"
        }
    }
})
module.exports = router