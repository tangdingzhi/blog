const database = require("./database")

const {
    ObjectId
} = require("mongoose").Types

module.exports.create = async(insertData) => {
    // insertData._id是当前创建的放映厅id
    insertData._id = new ObjectId()

    insertData.seats = []

    const seatArr = []
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            let seatId = new ObjectId(); //将每个座位的ID关联到放映厅
            seatArr.push({
                _id: seatId,
                rowNo: String(i),
                colNo: String(j),
                displayName: `${i}排${j}列`,
                theatersId: insertData._id
            })
            insertData.seats.push(seatId)
        }
    };



    const studioData = await database.update({
        modelName: "studios",
        queryTerms: {
            _id: insertData.studioId
        },
        updateData: {
            $push: {
                theaters: insertData._id
            }
        }
    });
    const seatData = await database.create({
        modelName: "seats",
        insertData: seatArr
    });
    const theaterData = await database.create({
        modelName: "theaters",
        insertData
    });
    return {
        status: true
    }
}

module.exports.query = async({
    page, //当前页
    rows, //每页显示条数
    studioId,
}) => {
    const {
        count,
        data
    } = await database.query({
        modelName: "theaters",
        curPage: page,
        eachPage: rows,
        queryTerms: { studioId },
        populate: [{
            path: "studioId",
            select: {
                name: 1
            }
        }, {
            path: "seatsId"
        }]
    })
    return {
        rows: data,
        total: count
    }
}

module.exports.removeTheatersry = async({
    _id
}) => {
    await database.remove({
        modelName: "theaters",
        queryTerms: {
            _id: _id
        }
    })
}

module.exports.removeSeats = async({
    _id
}) => {
    await database.remove({
        modelName: "seats",
        queryTerms: {
            theatersId: _id
        }
    })
}

module.exports.updateName = async({
    name,
    _id
}) => {
    await database.update({
        modelName: "theaters",
        queryTerms: {
            _id: _id
        },
        updateData: {
            name: name
        }
    })
}

module.exports.seatsQuery = async({
    page, //当前页
    rows, //每页显示条数
    theatersId,
}) => {
    const { data } = await database.query({
            modelName: "seats",
            curPage: page,
            eachPage: 100,
            queryTerms: { theatersId }
        })
        // console.log(data)
    return data
}