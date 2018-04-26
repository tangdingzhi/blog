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
} = require("../dao/scheduleDao.js")

module.exports.getMovie = async() => {
    return await getMovie()
}
module.exports.getMovieMsg = async(scheduleId) => {
    return await getMovieMsg(scheduleId)
}

module.exports.getStudio = async() => {
    return await getStudio()
}

module.exports.getTheater = async(theaterByStudioId) => {
    return await getTheater(theaterByStudioId)
}

module.exports.addSchedule = async(scheduleData) => {
    return await addSchedule(scheduleData)
}

module.exports.getStudiosByMovieId = async(scheduleData) => {
    return await getStudiosByMovieId(scheduleData)
}

module.exports.getTheaterByStudioId = async(scheduleData) => {
    return await getTheaterByStudioId(scheduleData)
}

module.exports.removeSingleSchedule = async(scheduleRmoveId) => {
    return await removeSingleSchedule(scheduleRmoveId)
}

module.exports.removeScheduleByStudioId = async(removeInfo) => {
    return await removeScheduleByStudioId(removeInfo)
}

module.exports.querySeating = async(querySeat) => {
    return await querySeating(querySeat)
}

module.exports.changeSeatingState = async(changeSeatId) => {
    return await changeSeatingState(changeSeatId)
}