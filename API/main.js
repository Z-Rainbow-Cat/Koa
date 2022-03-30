const Koa = require("koa")
const userRouter = require("./router/user");
const path = require("path")
const db = require("./db")
let app = new Koa()

const KoaBody = require("koa-body")
app.use(KoaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, "./static/user"),
    keepExtensions:true
  }
}))
// 配置静态路径
const Static = require("koa-static")
app.use(Static(path.join(__dirname,"static")))
app.use(Static(path.join(__dirname, "./public")))

app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200; 
    } else {
      await next();
    }
  });


app.use(userRouter.routes()).listen(3000,()=>{
    db.connect((err)=>{
        if(err) throw err
        console.log("连接成功")
    })
    console.log("server start")
})