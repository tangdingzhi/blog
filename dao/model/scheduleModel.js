var mongoose=require("mongoose");
var moment = require('moment');
var {Schema}=mongoose;
var scheduleSchema=new Schema({
	movieId: {
		type: Schema.Types.ObjectId,
		ref: 'movies'
	},
	showTime:{
		type: Date
	},
	studioId:{
		type: Schema.Types.ObjectId,
		ref: "studios"
	},
	theaterId: {
		type: Schema.Types.ObjectId,
		ref: "theaters"
	},
	price:{
		type:String
	}
})
//配置时间戳
scheduleSchema.virtual('show_time').get(function() {
	return moment(this.showTime).format('YYYY-MM-DD HH:mm');
});

scheduleSchema.set('toJSON', {
	getters: true,
	virtual: true
});
mongoose.model("schedules",scheduleSchema,"schedules")