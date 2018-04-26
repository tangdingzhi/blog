const {
    addstudio,
    query,
    updateStudio,
    deleteStudio
} = require("../dao/studioDao.js")

module.exports.addstudio = async(studio) => {
    return await addstudio(studio)
}
module.exports.query = async(page) => {
    return await query(page)
}
module.exports.updateStudio = async(studio) => {
    return await updateStudio(studio)
}
module.exports.deleteStudio = async(studio) => {
    return await deleteStudio(studio)
}