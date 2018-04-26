define((require,exports)=>{
	const $=require("jquery")
	exports.load=(username)=>{
		$("#app").load("./homepage/homepage.html",()=>{
			init();
			$("#msgList").on("click","a",function(e){
				location.hash="/blog/"+$(e.target).attr("id")
			})
		});
		function init(){
			$.ajax({
				url:"/selfBlog/query",
				type:"get",
				success(data){
				  	for (var i = 0; i < 10 ; i++) {
                   		msgList.innerHTML += `<li class="title"><a href="javascript:;" id="${data.rows[i]._id}">${data.rows[i].title}</a><span>${data.rows[i].date}</span></li>`;
				  	}
				}
			})
		};
	}
})