const router = require('koa-router')();
const {
    addstudio,
    query,
    updateStudio,
    deleteStudio
} = require("../service/studioService.js")

router.prefix('/studio');


//添加影院
router.post('/addstudio', async(ctx, next) => {
    ctx.body = await addstudio(ctx.request.body)
});

//查询影院
router.get('/query', async(ctx, next) => {
    ctx.body = await query(ctx.request.query)
});



// 修改影院信息
router.post('/updateStudio', async(ctx, next) => {
    ctx.body = await updateStudio(ctx.request.body)
});

// 删除影院
router.post('/deleteStudio', async(ctx, next) => {
    ctx.body = await deleteStudio(ctx.request.body)
});


module.exports = router;