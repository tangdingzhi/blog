const database = require("./database.js")

module.exports.getEmpByPage = async({
	curPage,
	eachPage
}) => {
	return await database.query({
		modelName: "emp",
		curPage,
		eachPage
	})
}