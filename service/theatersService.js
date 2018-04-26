const theatersDao = require("../dao/theatersDao.js")

module.exports.create = async(theater) => {
    return await theatersDao.create(theater)
}

module.exports.query = async(theater) => {
    return await theatersDao.query(theater)
}

module.exports.removeTheatersry = async(theater) => {
    return await theatersDao.removeTheatersry(theater)
}

module.exports.removeSeats = async(theater) => {
    return await theatersDao.removeSeats(theater)
}

module.exports.updateName = async(theater) => {
    return await theatersDao.updateName(theater)
}

module.exports.seatsQuery = async(theater) => {
    return await theatersDao.seatsQuery(theater)
}