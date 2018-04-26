define((require,exports)=>{
	const $=require("jquery")
	function changeColor(){
    return	setInterval(function(){
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

	function checkTxt(){
		const regName=/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
		const regPwd=/^\w{5,17}$/;
		var  regBlur=true
		$("#username").on("input",()=>{
			if(regName.test($("#username").val())){
				$("#username")
				.next("span")
				.html("格式正确")
				.css("color","green")
				$("#regBtn").attr("disabled",false)
			}
			else{
				$("#username")
				.next("span")
				.html("格式错误")
				.css("color","red")
				$("#regBtn").attr("disabled","disabled")
			}
		})

		$("#password").on("input",()=>{
			console.log('in')
			if(regPwd.test($("#password").val())){
				$("#password")
				.next("span")
				.html("格式正确")
				.css("color","green")
				$("#regBtn").attr("disabled",false)			
			}
			else{
				$("#password")
				.next("span")
				.html("格式错误")
				.css("color","red")
				$("#regBtn").attr("disabled","disabled")	
			}
		})
	}

	exports.load=()=>{
		$("#app").load("./reg/reg.html",()=>{

			checkTxt()
			changeColor()
			//账号是否验证重名isUse
			$("#username").blur(()=>{
				new Promise((resolve,reject)=>{
					$.ajax({
						type:'get',
						url:"/users/isUse",
						data:{
							username:$("#username").val()
						},
						success(data){
							resolve(data)
						}
					})
				})
				.then((data)=>{
					if(data.data.length>0){
						$("#username")
							.next("span")
							.html("用户已存在")
							.css("color","red")
						$("#regBtn").attr("disabled","disabled")
					}else{
						$("#username")
							.next("span")
							.html("合法用户")
							.css("color","green")
						$("#regBtn").attr("disabled",false)	
					}
				})
			})

			//注册插入账号
			$("#regBtn").click(()=>{
				new Promise((resolve,reject)=>{
					$.ajax({
						type:'post',
						url:'/users/reg',
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
					// console.log(data)
					if($("#username").val() !==""){
						location.hash="/login/"+$("#username").val()
					}else {
						location.hash="/login"
					}
				})
			})
			$("#checkCav").blur(function(){
				console.log('in')
				console.log($(this))
				if($(this).val()!=draw()){
					$("#regBtn").attr("disabled","disabled")
					$(this).val("验证码错误").css("color","red")
				}
			})
			


			// $("#cavs").click(()=>{
			// 	draw()
			// })



		// var pen=cavs.getContext("2d");   //获取canvas的画笔
		// draw()
		// function getRandomNum(num){
		// 	return parseInt(Math.random()*num)
		// }

		// function draw(){
		// 	pen.clearRect(0,0,100,60)
		// 	for(let i=0;i<4;i++){
		// 		pen.beginPath()          //每次画笔画画和上次或则下次不冲突
		// 		pen.lineWidth="3";
		// 		pen.strokeStyle=`rgb(${getRandomNum(255)},${getRandomNum(255)},${getRandomNum(255)})`;//画笔的颜色
		// 		pen.moveTo(getRandomNum(40),getRandomNum(40));
		// 		pen.lineTo(getRandomNum(80),getRandomNum(40));
		// 		pen.stroke()     //画布着色
		// 	}
		// 	var str="1234567890qazwsxedcrfvtgbyhnujmikolpQAZWSXEDCRFVTGBYHNUJMIKOLP";		//自己定义的字符串
		// 	var codeStr="";																	//用来判断以后输入验证码是否正确
		// 	pen.font="30px Arial";
		// 	for(let i=0;i<4;i++){
		// 		let strEle=str.charAt(getRandomNum(str.length));							//从字符串取一个字符
		// 		codeStr+=strEle;														
		// 		pen.fillStyle=`rgb(${getRandomNum(255)},${getRandomNum(255)},${getRandomNum(255)})`;	//给字符颜色上色
		// 		pen.fillText(strEle,i*10+getRandomNum(30),30)									//把字符添加在画布上
		// 	}
		// 	return codeStr
		// }
		// console.log(draw())
		












		})
	}
})