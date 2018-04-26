const router = require('koa-router')()
const {
    getMovieMsg,
    getMovie,
    getStudio,
    getTheater,
    addSchedule,
    getStudiosByMovieId,
    getTheaterByStudioId,
    removeSingleSchedule,
    removeScheduleByStudioId,
    querySeating,
    changeSeatingState
} = require("../service/scheduleService.js")
router.prefix('/schedule')


router.get("/getMovie", async(ctx, next) => {
    ctx.body = await getMovie()
})
router.get("/getMovieMsg", async(ctx, next) => {
    ctx.body = await getMovieMsg(ctx.query)
})


router.get("/getStudio", async(ctx, next) => {
    ctx.body = await getStudio()
})


//因为是同时加载的问题，所以会存在undefine情况
router.get("/getTheater", async(ctx, next) => {
    if (ctx.request.query.studioId == "0") {
        ctx.body = []
    } else {
        ctx.body = await getTheater(ctx.request.query)
    }
})


//创建排片信息
router.post("/addSchedule", async(ctx, next) => {
    ctx.body = await addSchedule(ctx.request.body)
})


//把某部已排片的电影下面的影院找出来
router.get("/getStudiosByMovieId", async(ctx, next) => {
    if (ctx.request.query.movieId == "0") {
        ctx.body = {
            total: 0,
            rows: []
        }
    } else {
        ctx.body = await getStudiosByMovieId(ctx.request.query)
    }
})



router.get("/getTheaterByStudioId", async(ctx, next) => {
    if (ctx.request.query.movieId == "0" || ctx.request.query.studioId == "0") {
        ctx.body = {
            total: 0,
            rows: []
        }
    } else {
        ctx.body = await getTheaterByStudioId(ctx.request.query)
    }
})

router.get("/removeSingleSchedule", async(ctx, next) => {
    ctx.body = await removeSingleSchedule(ctx.request.query)
})

router.get("/removeScheduleByStudioId", async(ctx, next) => {
    ctx.body = await removeScheduleByStudioId(ctx.request.query)
})

router.get("/querySeating", async(ctx, next) => {
    ctx.body = await querySeating(ctx.request.query)
})

router.get("/changeSeatingState", async(ctx, next) => {
    ctx.body = await changeSeatingState(ctx.request.query)
})

module.exports = router