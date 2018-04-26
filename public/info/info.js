define((require,exports)=>{
	const $=require("jquery")
	exports.load=(callback, data)=>{
		$("#app").load("./info/info.html",()=>{

			//二级模块加载需要callback进行渲染
     		callback = callback || function() {}
            callback(data)
           
		    $("#addFr").click(() => {
	        	location.hash = "/info/addFruits/addFruits"
	        })
	        $("#FrList").click(() => {
	        	location.hash = "/info/fruitsList/fruitsList"
	        })
		});

	}
})