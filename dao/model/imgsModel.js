var mongoose = require("mongoose")

var { Schema } = mongoose;

var imgsSchema = new Schema({
    url: "string", //图片路径
    type: "string", //图片类型
    movieId: {
		type: Schema.Types.ObjectId,
		ref: 'movies'
	},  //图片所属
    status: "string" //图片状态 0, 停用, 1, 启用
})
mongoose.model("imgs", imgsSchema, "imgs")