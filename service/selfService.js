const selfDao = require("../dao/selfDao.js")
module.exports.addBlog = async(message) => {
    return await selfDao.addBlog(message)
}
module.exports.query = async() => {
    return await selfDao.query()
}
module.exports.blogQuery = async(blogId) => {
    return await selfDao.blogQuery(blogId)
}