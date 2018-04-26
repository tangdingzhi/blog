define((require, exports) => {
    exports.init = (url) => {
        const routes = {
            "/homepage": () => {
                require("homepage").load()
            },
            "/blog": () => {
                require("blog").load()
            },
            "/blog/:blogId": (blogId) => {
                require("blog").load(blogId)
            },
            // "/info": () => {
            //     require("info").load()
            // },
            // "/info/addFruits/addFruits": () => {
            //     require("info").load(require("addFruits").load)
            // },
            // "/info/fruitsList/fruitsList": () => {
            //     require("info").load(require("fruitsList").load)
            // },
            //  "/login": () => {
            //     require("login").load()
            // },
            // "/login/:username": (username) => {
            //     require("login").load(username)
            // },
            // "/reg": () => {
            //     require("reg").load()
            // },
            // "/info": () => {
            //     require("info").load()
            // },
            // "/info/theater/addtheaters": () => {
            //     require("info").load(require("addtheaters").load)
            // },
            // "/info/studio/addStudio": () => {
            //     require("info").load(require("addStudio").load)
            // },
            // "/info/studio/updateStudio/:studioId": (studioId) => {
            //     require("info").load(require("addStudio").load, studioId)
            // },
            // "/info/studio/studioList": () => {
            //     require("info").load(require("studioList").load)
            // },
            // "/info/theater/showtheaters/:studioId": (studioId) => {
            //     require("info").load(require("showtheaters").load, studioId)
            // },
            // "/info/movie/addMovie": () => {
            //     require("info").load(require("addMovie").load)
            // },
            // "/info/movie/addImg/:movieId": (movieId) => {
            //     require("info").load(require("addImg").load, movieId)
            // },
            // "/info/movie/update/:movieId": (movieId) => {
            //     require("info").load(require("movieUpdate").load, movieId)
            // },
            // "/info/movie/movieList": () => {
            //     require("info").load(require("movieList").load)
            // },
            // "/info/schedule/addSchedule": () => {
            //     require("info").load(require("schedule").load)
            // }
        }

        const router = Router(routes)
        router.init()
        location.hash = url || "/homepage"
    }
})