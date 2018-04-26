const empDao = require("../dao/empDao.js")

module.exports.getEmpByPage = async(params) => {
	return await empDao.getEmpByPage(params)
}