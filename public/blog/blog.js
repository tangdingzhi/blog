define((require,exports)=>{
	const $=require("jquery")
	exports.load=(blogId)=>{
		$("#app").load("./blog/blog.html",()=>{
			$.ajax({
				url:"/selfBlog/query",
				type:"get",
				success(data){
				  	for (var i = 0;i < data.rows.length && i < 10 ; i++) {
				  		if (data.rows[i].title.length > 18) {
				  			data.rows[i].title = data.rows[i].title.substr(0,18)+'. . .';
				  			rightBox.innerHTML += `<li class="title"><a href="javascript:;" id="${data.rows[i]._id}">${data.rows[i].title}</a></li>`;
				  		}else {
                   			rightBox.innerHTML += `<li class="title"><a href="javascript:;" id="${data.rows[i]._id}">${data.rows[i].title}</a></li>`;
				  		}
				  	}
				  	if(blogId !== undefined){
						$.ajax({
							url:"/selfBlog/blogQuery",
							type:"post",
							data:{_id:blogId},
							success(data){
							  title.innerHTML = data.rows[0].title
							  date.innerHTML = `发表时间：${data.rows[0].date}`
							  content.innerHTML = data.rows[0].content
							}
						});
					}else {
						$.ajax({
							url:"/selfBlog/blogQuery",
							type:"post",
							data:{_id:data.rows[0]._id},
							success(data){
							  title.innerHTML = data.rows[0].title
							  date.innerHTML = `发表时间：${data.rows[0].date}`
							  content.innerHTML = data.rows[0].content
							}
						});
					}
				}
			});
			$("#rightBox").on("click","a",function(e){
				location.hash="/blog/"+$(e.target).attr("id")
			})
		});
	}
})