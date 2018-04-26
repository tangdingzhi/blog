var mongoose = require("mongoose")

var { Schema } = mongoose;

var userSchema = new Schema({
    username: "string", //用户名
    password: "string", //密码
    status: {
    	type:Number,
    	default:1
    }, //用户状态, 0 为前端用户, 1 为后台用户
    flag: {
    	type:String,
    	default:"0"
    } //启用状态, 0 为激活用户, 1 为注销用户
})
mongoose.model("users", userSchema, "users")