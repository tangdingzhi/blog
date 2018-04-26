seajs.config({
    //模块基础路径
    base: './',
    //指定加载模块
    alias: {
        "router": "router/router",
        "jquery": "modules/bin/jquery",
        //"jquery": "modules/bin/jquery.easyui.min",
        "homepage":"homepage/homepage",
 	"blog":"blog/blog",
        "backstage": "backstage/backstage",
        // "login": "login/login",
        // "reg": "reg/reg",
        // "info": "info/info",
        // "empList": "info/emp/empList/empList",
        // "addEmp": "info/emp/addEmp/addEmp",
        // "addMovie": "info/movie/addMovie/addMovie",
        // "movieList": "info/movie/movieList/movieList",
        // "addImg": "info/movie/img/addImg",
        // "movieUpdate": "info/movie/movieUpdate/movieUpdate",
        // "addStudio": "info/studio/addStudio/addStudio",
        // "studioList": "info/studio/studioList/studioList",
        // "addtheaters": "info/theater/addtheaters",
        // "showtheaters": "info/theater/showtheaters",
        // "schedule": "info/schedule/schedule",
        // "addschedule": "info/addschedule/addschedule"

    }
});

seajs.use("router", function(router) {
    router.init(location.hash)
        //这里的init对应前端路由里的export.init
})