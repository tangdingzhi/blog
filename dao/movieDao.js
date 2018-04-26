const {
    create,
    update,
    query,
    remove
} = require("./database.js")

module.exports.addMovies = async(insertData) => {
    const data = await create({
        modelName: "movies",
        insertData
    })
    return data
}
module.exports.removeMovie = async({
    movieId
}) => {
    // console.log(movieId)
    return await remove({
        modelName: "movies",
        queryTerms: {
            _id: movieId
        }
    })

}


module.exports.update = async({
    movieId,
    _id
}) => {
    console.log(movieId, _id)
    const data = await update({
        modelName: "movies",
        queryTerms: {
            _id: movieId
        },
        updateData: {
            $push: {
                imgs: _id
            }
        }
    })

}

module.exports.movieQuery = async({
    _id
}) => {
    const {
        count,
        data
    } = await query({
        modelName: "movies",
        queryTerms: {
            _id: _id
        },
        populate: [{
            path: "imgs"
        }]
    })
    return {
        total: count,
        rows: data
    }
}

module.exports.query = async() => {
    const {
        count,
        data
    } = await query({
        modelName: "movies",
        populate: [{
            path: "imgs"
        }]
    })
    return {
        total: count,
        rows: data
    }
}

module.exports.queryUpdateMovie = async({
    movieId
}) => {
    const {
        count,
        data
    } = await query({
            modelName: "movies",
            queryTerms: {
                _id: movieId
            }
        })
        // console.log(data)
    return {
        total: count,
        rows: data
    }
}
module.exports.updateMovie = async({
    movieId,
    cName,
    eName,
    type,
    country,
    duration,
    director,
    actors,
    release,
    synopsis
}) => {
    const {
        count,
        data
    } = await update({
        modelName: "movies",
        queryTerms: {
            _id: movieId
        },
        updateData: {
            cName,
            eName,
            type,
            country,
            duration,
            // director,
            $push: {
                director,
                actors
            },
            release,
            synopsis
        }
    })
    return "success"
}