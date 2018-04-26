var router = require('koa-router')();
const empService = require("../service/empService.js")
router.prefix('/emp');

router.get('/getEmpByPage', async function(ctx, next) {
	ctx.body = await empService.getEmpByPage(ctx.request.query);
});

module.exports = router;