var router = require('koa-router')();
const movieService = require("../service/movieService.js")
const imgService = require("../service/imgService.js")
router.prefix('/movies');

router.post('/addMovies', async function(ctx, next) {
	ctx.body = await movieService.addMovies(ctx.request.body); //若有前台传来参数写在这里

});
router.get('/query', async function(ctx, next) {
	ctx.body = await movieService.query(ctx.request.query); //若有前台传来参数写在这里
});

router.get('/movieQuery', async function(ctx, next) {
	ctx.body = await movieService.movieQuery(ctx.request.query); //若有前台传来参数写在这里
});

router.post('/removeMovie', async function(ctx, next) {
	console.log(ctx.request.body)
	ctx.body = await movieService.removeMovie(ctx.request.body); //若有前台传来参数写在这里
	ctx.body = await imgService.removeMovieImg(ctx.request.body); //若有前台传来参数写在这里

});
router.get('/queryUpdateMovie', async function(ctx, next) {
	ctx.body = await movieService.queryUpdateMovie(ctx.request.query); //若有前台传来参数写在这里
	// console.log(ctx.request.query)

});
router.post('/updateMovie', async function(ctx, next) {
	ctx.body = await movieService.updateMovie(ctx.request.body); //若有前台传来参数写在这里
	// console.log(ctx.request.body)

});



module.exports = router;