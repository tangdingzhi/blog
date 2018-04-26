var router = require('koa-router')();

const theatersService = require("../service/theatersService.js")

router.prefix('/theaters');

router.post('/addTheater', async function(ctx, next) {
    ctx.body = await theatersService.create(ctx.request.body);
    // console.log(ctx.request.body)
});


router.get('/query', async(ctx, next) => {
    ctx.body = await theatersService.query(ctx.request.query)
});


router.get('/remove', async(ctx, next) => {
    ctx.body = await theatersService.removeTheatersry(ctx.request.query)
    ctx.body = await theatersService.removeSeats(ctx.request.query)
        // console.log(ctx.request.query)
});

router.get('/update', async(ctx, next) => {
    ctx.body = await theatersService.updateName(ctx.request.query)
        // console.log(ctx.request.query)
});

router.get('/seatsQuery', async(ctx, next) => {
    ctx.body = await theatersService.seatsQuery(ctx.request.query)
        // console.log(ctx.request.query)
});

module.exports = router;