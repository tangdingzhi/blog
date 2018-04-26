var mongoose = require("mongoose")

var { Schema } = mongoose;

var movieSchema = new Schema({
    // _id: Object.Id, //主键
    cName: "string", //中文名称
    eName: "string", //英文名称
    type: "string", //影片类型
    country: "string", //制片国家/地区
    duration: "string", //片长, 单位 分钟
    release: "string", //上映时间 格式: 2016-08-23
    synopsis: "string", //剧情简介
    director: [], //导演, 关联演员_id 
    actors: [], //演员, 关联演员_id 
    imgs: [{
        type: Schema.Types.ObjectId,
        ref: "imgs"
    }], //相关图片, 关联电影图片_id,
    stata: String //电影状态 0: 下映, 1: 上映, 2: 热映
})
mongoose.model("movies", movieSchema, "movies")