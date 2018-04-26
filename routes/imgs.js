const router = require('koa-router')();
const path = require('path')
const {
	addImg
} = require("../service/imgService.js")
const imgService = require("../service/imgService.js")
const movieService = require("../service/movieService.js")
const {
	uploadFile
} = require('../util/upload')

router.prefix('/imgs');

router.post('/upload', async function(ctx, next) {
	let result = {
			success: false
		}
		// 上传文件事件
	result = await uploadFile(ctx, {
		//目录
		fileType: 'movie',
		//路径
		path: "./public/images/",
	})
	result.data = await addImg(result.data)
	await movieService.update(result.data)
	ctx.body = result
	console.log(result)
});

router.post('/addImg', async(ctx, next) => {
	console.log("addImg")
	ctx.body = await imgService.addImg(ctx.request.body);
})

router.get('/update', async(ctx, next) => {
	console.log("in")
	ctx.body = await movieService.update(ctx.request.query);
})

router.get('/query', async(ctx, next) => {
	// console.log(ctx.request.query)
	ctx.body = await imgService.query(ctx.request.query);
	// ctx.body = "hahaha"
})

module.exports = router;