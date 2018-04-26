var mongoose = require("mongoose")

var { Schema } = mongoose;

var studiosSchema = new Schema({
    name: "string", //影院名称
    address: "string", //影院地址
    theaters: [] //所属放映厅
})
mongoose.model("studios", studiosSchema, "studios")