const {
    query,
    create
} = require("./database.js")

module.exports.login = async(insertData) => {
    const data = await query({
        modelName: "users",
        queryTerms: insertData
    })
    return data
}

module.exports.isLogin = async(insertData) => {
    const data = await query({
        modelName: "users",
        queryTerms: insertData
    })
    return data
}


module.exports.isUse = async(isUseData) => {
    const data = await query({
        modelName: "users",
        queryTerms: isUseData
    })
    return data
}

module.exports.reg = async(insertData) => {
    const data = await create({
        modelName: "users",
        insertData
    })
    return data
}