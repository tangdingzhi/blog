var mongoose = require("mongoose")

var { Schema } = mongoose;

var selfSchema = new Schema({
    title: String,//标题
    content: String,//内容
    date: String,//时间
})
mongoose.model("self", selfSchema, "self")