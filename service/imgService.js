const imgDao = require("../dao/imgDao.js")

module.exports.addImg = async(img) => {
	return await imgDao.addImg(img)
}
module.exports.query = async(page) => {
	return await imgDao.query(page)
}
module.exports.removeMovieImg = async(page) => {
	return await imgDao.removeMovieImg(page)
	// console.log(page)
}