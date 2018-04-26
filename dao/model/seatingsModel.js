
//正在放映的影院下面的放映厅的座位
var mongoose=require("mongoose");
var {Schema}=mongoose;
var seatingSchema=new Schema({
	scheduleId: {
		type: Schema.Types.ObjectId,
		ref: 'schedules'
	},
	seatId:{
		type: Schema.Types.ObjectId,
		ref:"seats"
	},
	state:{
		type:String
	}
})
mongoose.model("seatings",seatingSchema,"seatings")