const {
    create,
    query,
    update,
    remove
} = require("./database.js")


module.exports.addstudio = async(insertData) => {
    const data = await create({
        modelName: "studios",
        insertData
    })
}

module.exports.query = async({
    page: curPage,
    rows: eachPage
}) => {
    const {
        count,
        data
    } = await query({
        modelName: "studios",
        curPage,
        eachPage
    })

    return {
        total: count,
        rows: data
    }
}


module.exports.updateStudio = async({
    name,
    address,
    studioId
}) => {
    const data = await update({
        modelName: "studios",
        queryTerms: {
            _id: studioId
        },
        updateData: {
            name,
            address
        }
    })
}


module.exports.deleteStudio = async({
    _id
}) => {
    const {
        data
    } = await query({
        modelName: "theaters",
        queryTerms: {
            studioId: _id
        }
    })

    // 遍历放映厅
    for (let i = 0; i < data.length; i++) {
        // 删除座位
        await remove({
                modelName: "seats",
                queryTerms: {
                    theatersId: data[i]._id
                }
            })
            // 删除放映厅
        await remove({
            modelName: "theaters",
            queryTerms: {
                _id: data[i]._id
            }
        })
    }
    // 删除影院
    await remove({
        modelName: "studios",
        queryTerms: {
            _id
        }
    })

}