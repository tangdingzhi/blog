const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const session = require('koa-session-minimal');



const cors = require('koa-cors');
// const jsonp = require('koa-jsonp');




require("./dao/database.js")
const index = require('./routes/index');
const users = require('./routes/users');

const theaters = require('./routes/theaters');
const studio = require('./routes/studio');
const movies = require('./routes/movies');
const imgs = require('./routes/imgs');
const schedule = require('./routes/schedule');
const selfBlog = require('./routes/selfBlog');


// error handler
onerror(app);


app.use(cors());
// app.use(jsonp);



// middlewares
app.use(bodyparser);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
    extension: 'jade'
}));

// logger
app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(session({
    key: "koa:sess",
    cookie: {
        maxAge: "50000"
    }
}))

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

app.use(schedule.routes(), schedule.allowedMethods());
app.use(theaters.routes(), theaters.allowedMethods());
app.use(studio.routes(), studio.allowedMethods());
app.use(movies.routes(), movies.allowedMethods());
app.use(imgs.routes(), imgs.allowedMethods());
app.use(selfBlog.routes(), selfBlog.allowedMethods());


var server = app.listen(80, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});