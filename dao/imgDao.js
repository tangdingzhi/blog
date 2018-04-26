const database = require("./database.js")

module.exports.addImg = async(insertData) => {
	return await database.create({
		modelName: "imgs",
		insertData
	})
}
module.exports.removeMovieImg = async({
	movieId
}) => {
	// console.log(movieId)
	return await database.remove({
		modelName: "imgs",
		queryTerms:{
			movieId:movieId
		}
	})
}
module.exports.query = async({
	page:curPage,
	rows:eachPage,
	movieId,
	type
}) => {
	const {
		count,
		data
	} = await database.query({
		modelName: "imgs",
		curPage,
		eachPage,
		queryTerms:{
			movieId,
			type
		},
		populate:[{
			path:"movieId",
			select:{
				cName:1
			}
		}]
	})	
	return {
		total:count,
		rows:data
	}
}