define((require,exports)=>{
	const $=require("jquery")
        function changeColor(){
        	setInterval(function(){
	        	var a=Math.round(Math.random()*255);
	            var b=Math.round(Math.random()*255);
	            var c=Math.round(Math.random()*255);
	            var bgcBox="rgb("+a+","+b+","+c+")"
	            $("#backBox").fadeOut(2000,function(){
                	$(this).css("backgroundColor",bgcBox)
           		});
           		$("#backBox").fadeIn(2000);
        	},2000)
        }

	exports.load=(username)=>{
		username =username || "";   //1.判断username的值为空或者不空
		$("#app").load("./login/login.html",()=>{
			$("#username").val(username)	//2.给登陆的username设从reg.html传过来的值
			//3.背景色一直变换
			changeColor()
			//4.登陆验证
			$("#loginBtn").click(()=>{
				new Promise((resolve,reject)=>{
					$.ajax({
						type:'get',
						url:'/users/login',
						data:{
							username:$("#username").val(),
							password:$("#password").val()
						},
						success(data){
							resolve(data)
						}
					})
				})
				.then((data)=>{
					if(data.data.length>0){
						location.hash="/info"
					}
				})
			})

			//5.注册按钮跳转注册页面
			$("#regBtn").click(()=>{
				location.hash="/reg"
			})
		})
	}
})