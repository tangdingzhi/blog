const {
    create,
    query,
} = require("./database.js")

module.exports.addBlog = async(insertData) => {
    const data = await create({
        modelName: "self",
        insertData
    })
    return data
}
module.exports.query = async() => {
    const {
        count,
        data
    } = await query({
        modelName: "self"
    })
    return {
        total: count,
        rows: data
    }
}

module.exports.blogQuery = async({
    _id
}) => {
    const {
        count,
        data
    } = await query({
        modelName: "self",
        queryTerms: {
            _id: _id
        },
    })
    return {
        total: count,
        rows: data
    }
}

