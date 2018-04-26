const {
    login,
    isUse,
    reg,
    isLogin
} = require("../dao/usersDao.js")

module.exports.login = async(loginInfo) => {
    return await login(loginInfo)
}

module.exports.isLogin = async(loginInfo) => {
    return await isLogin(loginInfo)
}

module.exports.isUse = async(isUseData) => {
    return await isUse(isUseData)
}

module.exports.reg = async(regData) => {
    return await reg(regData)
}