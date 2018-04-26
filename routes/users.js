const router = require('koa-router')();
const {
    login,
    isUse,
    reg,
    isLogin
} = require("../service/usersService.js")

router.prefix('/users');


//登陆查询
router.get('/login', async(ctx, next) => {
    ctx.body = await login(ctx.request.query)
    console.log(ctx.request.query)
});

router.post('/isLogin', async(ctx, next) => {
    var {
        data
    } = await isLogin(ctx.request.body)
        console.log(data)
    ctx.cookies.set(
        "cid",
        "hello world", {
            damain: "localhost",
            path: "/",
            maxAge: 10 * 60 * 1000,
            httpOnly: true,
        }
    )
    if (data.length === 1) {
        ctx.session.username = ctx.request.body.username
    }
    ctx.body = data
});


//注册验证是否重名
router.get("/isUse", async(ctx, next) => {
    ctx.body = await isUse(ctx.request.query)
})

//注册插入数据
router.post("/reg", async(ctx, next) => {
    console.log(ctx.request.body)
    ctx.body = await reg(ctx.request.body)
})

module.exports = router;