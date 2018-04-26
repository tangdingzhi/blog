const movieDao = require("../dao/movieDao.js")
module.exports.addMovies = async(message) => {
    return await movieDao.addMovies(message)

}
module.exports.update = async(message) => {
    return await movieDao.update(message)

}
module.exports.query = async() => {
    return await movieDao.query()
}
module.exports.movieQuery = async(moiveId) => {
    return await movieDao.movieQuery(moiveId)
}

module.exports.removeMovie = async(message) => {
    return await movieDao.removeMovie(message)
}
module.exports.queryUpdateMovie = async(message) => {
    return await movieDao.queryUpdateMovie(message)

}
module.exports.updateMovie = async(message) => {
    return await movieDao.updateMovie(message)

}