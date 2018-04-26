define((require, exports) => {

	const $ = require("jquery")
	const movie ={
		movieId:"0"
	}
	function init(){
		$("#cName").textbox({
			value:"摔跤吧！爸爸"

		});
		$("#eName").textbox({
			value:"Dangal"
		});
		$("#type").textbox({
			value:"喜剧,动作,家庭"
		});
		$("#country").textbox({
			value:"印度"
		});
		$("#director").textbox({//导演
			value:"不知道"
		});
		$("#actors").textbox({
			value:"阿米尔汗"
		});
		$("#duration").textbox({//片长
			value:"140分钟"
		});
		$("#release").textbox({//上映时间
			value:"2017-05-05大陆上映"
		});
		$("#synopsis").textbox({//内容简介
			value:"这是一个温暖幽默的励志故事。马哈维亚 辛格·珀尕（阿米尔汗 饰）曾是印度国家摔跤冠军，因生活所迫放弃摔跤。他希望让儿子可以帮他完成梦想：赢得世界级金牌。结果生了四个女儿。本以为梦想就此破碎的辛格却意外发现女儿身上的惊人天赋，看到冠军希望的他决定不能让女儿的天赋浪费，像其他女孩一样只能洗衣做饭过一生，再三考虑之后，与妻子约定一年时间按照摔跤手的标准训练两个女儿：换掉裙子 、剪掉了长发，让她们练习摔跤，并赢得一个又一个冠军，最终赢来了成为榜样激励千千万万女性的机会……",
			width:400,
			height: 200,
			multiline: true//内容过多时出现滚动条
		});
		$('#addImgBtn')
			.linkbutton({
				disabled: true
			})		

		$('#saveBtn')
			.linkbutton()
			.on("click", function(e) {
				e.preventDefault();
				$.ajax({
					url:"/movies/addMovies",
					type:"post",
					data:sendMovieMassege(),
					success(data){
						movieId = data._id
						
						if(data){
							$('#addImgBtn')
								.linkbutton({
								disabled: false
								})
								.on("click",function(e){
									e.preventDefault()
									location.hash = `/info/movie/addImg/${movieId}`;
								})
						}
					}

				})				
			});
		$('#resetBtn')
			.linkbutton()
			.on("click", function(e) {
				e.preventDefault();
				console.log("重置")
				location.hash = "/info/movie/addMovie"
			});
		function sendMovieMassege(){
			return {
				cName:$("#cName").val(),
				eName:$("#eName").val(),
				type:$("#type").val(),
				country:$("#country").val(),
				director:$("#director").val(),
				actors:$("#actors").val(),
				duration:$("#duration").val(),
				release:$("#release").val(),
				synopsis:$("#synopsis").val(),
				stata:"1"
			}			
		}
	}
	
	exports.load = (url) => {
		$("#info-content").load("./info/movie/addMovie/addMovie.html",function(){
			init();
			// console.log($("#cName"))
		})
	}
})