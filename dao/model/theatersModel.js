var mongoose = require("mongoose")

var { Schema } = mongoose;

var theatersSchema = new Schema({
    name: "string", //放映厅名称
    studioId: {
        type: Schema.Types.ObjectId,
        ref: "studios"
    }, //影院id
    seats: [{
            type: Schema.Types.ObjectId,
            ref: "seats"
        }] //座位集合
})
mongoose.model("theaters", theatersSchema, "theaters")