var mongoose = require("mongoose")

var { Schema } = mongoose;

var seatsSchema = new Schema({
    rowNo: String,
    colNo: String,
    displayName: String,
    theatersId: {
        type: Schema.Types.ObjectId,
        ref: "theaters"
    }
})
mongoose.model("seats", seatsSchema, "seats")