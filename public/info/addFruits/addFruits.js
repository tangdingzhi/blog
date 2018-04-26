define((require, exports) => {
	const $=require("jquery")	
	function init(){
		$(".submit").on("click",function(){
			$.ajax({
				url:"/fruits/addMovies",
				type:"post",
				data:sendFruitsMassege(),
				success(data){
					if(data){
						$("#name").val("");
						$("#money").val("");
						$("#Rmoney").val("");
						$("#kg").val("");
						$("#synopsis").val("");
						$("#imgs").val("");
					}
				}
			})		
		})
		function sendFruitsMassege(){
			return {
				name:$("#name").val(),
				money:$("#money").val(),
				Rmoney:$("#Rmoney").val(),
				kg:$("#kg").val(),
				synopsis:$("#synopsis").val(),
				imgs:$("#imgs").val(),
				stata:"1"
			}			
		}
		$(".rest").on("click",function(){
			// $("#name").val("");
			// $("#money").val("");
			// $("#Rmoney").val("");
			// $("#kg").val("");
			// $("#synopsis").val("");
			// $("#imgs").val("");
			$.ajax({
				url:"https://api.weixin.qq.com/sns/jscode2session?appid=wxebbbb7047e569731&secret=a899b4ecb0162c7ec89bd810db07df65&js_code=${res.code}&grant_type=authorization_code",
				type:"post",
				success(data){
					console.log(data)
					// if(data){
					// 	$("#name").val("");
					// 	$("#money").val("");
					// 	$("#Rmoney").val("");
					// 	$("#kg").val("");
					// 	$("#synopsis").val("");
					// 	$("#imgs").val("");
					// }
				}
			})		


		})
	};



	exports.load = (url) => {
		$("#info-content").load("./info/addFruits/addFruits.html",function(){
			init();
		})
	}
})