var router = require('koa-router')();
const selfService = require("../service/selfService.js")
router.prefix('/selfBlog');

router.post('/addBlog', async function(ctx, next) {
	ctx.body = await selfService.addBlog(ctx.request.body); //若有前台传来参数写在这里
});

router.get('/query', async function(ctx, next) {
	ctx.body = await selfService.query(ctx.request.query); //若有前台传来参数写在这里
});
router.post('/blogQuery', async function(ctx, next) {
	ctx.body = await selfService.blogQuery(ctx.request.body); //若有前台传来参数写在这里
	console.log(ctx.body,ctx.request.body)
});

// router.post('/removeMovie', async function(ctx, next) {
// 	console.log(ctx.request.body)
// 	ctx.body = await movieService.removeMovie(ctx.request.body); //若有前台传来参数写在这里
// 	ctx.body = await imgService.removeMovieImg(ctx.request.body); //若有前台传来参数写在这里

// });
// router.get('/queryUpdateMovie', async function(ctx, next) {
// 	ctx.body = await movieService.queryUpdateMovie(ctx.request.query); //若有前台传来参数写在这里
// 	// console.log(ctx.request.query)

// });
// router.post('/updateMovie', async function(ctx, next) {
// 	ctx.body = await movieService.updateMovie(ctx.request.body); //若有前台传来参数写在这里
// });



module.exports = router;