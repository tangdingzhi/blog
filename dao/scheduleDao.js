const {
    query,
    create,
    remove,
    update,
    groupBy
} = require("./database.js")
const {
    ObjectId
} = require("mongoose").Types

module.exports.getMovie = async() => {
    const { data } = await query({
        modelName: "movies",
    })
    return data
}

module.exports.getMovieMsg = async({ scheduleId }) => {
    const { data } = await query({
        modelName: "schedules",
        queryTerms: {
            _id: scheduleId
        },
        populate: [{
            path: "movieId",
            populate: {
                path: "imgs"
            }
        }, {
            path: "studioId"
        }, {
            path: "theaterId"
        }]
    })
    return data
}

module.exports.getStudio = async() => {
    const { data } = await query({
        modelName: "studios",
    })
    return data
}

module.exports.getTheater = async(studioId) => {
    const { data } = await query({
        modelName: "theaters",
        queryTerms: studioId
    })
    return data
}



//添加排片程序
module.exports.addSchedule = async(addSchedule) => {
    console.log('进入addSchedule')
    console.log(addSchedule)
    const scheduleData = await create({
        modelName: "schedules",
        insertData: addSchedule
    })

    const oldSeats = await query({
        modelName: "seats",
        eachPage: 100,
        queryTerms: {
            theatersId: addSchedule.theaterId
        }
    })

    console.log(oldSeats)

    var seatingArr = [];
    for (let i = 0; i < oldSeats.data.length; i++) {
        seatingArr.push({
            scheduleId: scheduleData._id,
            seatId: oldSeats.data[i]._id,
            state: "0"
        })
    }
    console.log(seatingArr)
    const seatingData = await create({
        modelName: "seatings",
        insertData: seatingArr
    })

    console.log(seatingData)

    return {
        status: true
    }
}



//通过当前电影分组展示其查询影院
module.exports.getStudiosByMovieId = async({
    movieId,
    page: curPage,
    rows: eachPage
}) => {
    const data = await groupBy({
        modelName: 'schedules',
        match: {
            movieId: ObjectId(movieId) //转换成数据库里面的objectid
        },
        group: {
            _id: "$studioId" //查询外键
        }
    })
    const {
        count: total,
        data: rows
    } = await query({
        modelName: 'studios',
        queryTerms: {
            _id: {
                $in: data.map((item) => item._id)
            }
        },
        curPage,
        eachPage
    })
    return {
        total,
        rows
    }
}
module.exports.getTheaterByStudioId = async({
    page: curPage,
    rows: eachPage,
    movieId,
    studioId,
    day
}) => {
    var startTime, endTime;
    if (day == "今天") {
        startTime = new Date()
        endTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000)
        return getTheaterByTime(startTime, endTime)
    }
    if (day == "明天") {
        startTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000)
        endTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 2 * 60 * 60 * 1000)
        return getTheaterByTime(startTime, endTime)
    }
    if (day == "后天") {
        startTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 2 * 60 * 60 * 1000)
        endTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 3 * 60 * 60 * 1000)
        return getTheaterByTime(startTime, endTime)
    }


    async function getTheaterByTime(startTime, endTime) {
        const {
            count: total,
            data: rows
        } = await query({
            modelName: "schedules",
            queryTerms: {
                movieId,
                studioId,
                showTime: {
                    "$gt": startTime,
                    "$lt": endTime
                }
            },
            curPage,
            eachPage,
            populate: [{
                path: "movieId"
            }, {
                path: "studioId"
            }, {
                path: "theaterId"
            }]
        })
        return {
            total,
            rows
        }
    }

}

module.exports.removeSingleSchedule = async(scheduleRmoveId) => {
    await remove({
        modelName: "schedules",
        queryTerms: scheduleRmoveId
    })
    await remove({
        modelName: "seatings",
        queryTerms: {
            scheduleId: scheduleRmoveId._id
        }
    })
    return {
        status: true
    }
}


module.exports.removeScheduleByStudioId = async(removeInfo) => {
    const data = remove({
        modelName: "schedules",
        queryTerms: removeInfo
    })
    return data
}

module.exports.querySeating = async(querySeat) => {
    const {
        data
    } = await query({
        modelName: "seatings",
        queryTerms: querySeat,
        eachPage: 100,
        populate: [{
            path: "seatId"
        }, {
            path: "scheduleId"
        }]
    })
    return data
}

module.exports.changeSeatingState = async({
    _id,
    state
}) => {
    var _ids = _id.split(",")
    for (let i = 0; i < _ids.length; i++) {
        const data = await update({
            modelName: "seatings",
            queryTerms: {
                _id: _ids[i]
            },
            updateData: {
                $set: {
                    state
                }
            }
        })
        console.log(data)
    }

}