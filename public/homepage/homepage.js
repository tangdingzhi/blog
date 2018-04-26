define((require,exports)=>{
	const $=require("jquery")
	exports.load=(username)=>{
		$("#app").load("./homepage/homepage.html",()=>{
			init();
			$("#msgList").on("click","a",function(e){
				console.log(e.target)
				console.log(e.currentTarget.id)
				toBlog(e.target)
				location.hash="/blog/"+$(e.target).attr("id")
			})
			$("#boFour").on("click","a",function(e){
				console.log(e.target)
				location.hash="/blog/"+$(e.target).attr("id")
			})
		});
		function toBlog(id){
			location.hash="/blog/"+$(id).attr("id")
		};

		function RandomNum(Min, Max) {
		      var Range = Max - Min;
		      var Rand = Math.random();
		      var num = Min + Math.floor(Rand * Range); //舍去
		      return num;
		};

		function init(){
			$.ajax({
				url:"/selfBlog/query",
				type:"get",
				success(data){
				  	for (var i = 0; i < 3; i++) {
				  		var xmlString = data.rows[i].content;
	  					parser = new DOMParser()
	  					doc = parser.parseFromString(xmlString, "text/xml");
	  					jsonImg = doc.getElementsByTagName("img")[0].attributes.src.nodeValue;
                   		boFour.innerHTML += `<li><a href="javascript:;" id="${data.rows[i]._id}"><img src="${jsonImg}" alt=""></a><span>${data.rows[i].title}</span></li>`  
				  	}
				  	for (var i = 3; i < data.rows.length; i++) {
				  		var content = data.rows[i].content.replace(/<.*?>/ig,"")
				  		var xmlString = data.rows[i].content;
	  					parser = new DOMParser()
	  					doc = parser.parseFromString(xmlString, "text/xml");
	  					jsonImg = doc.getElementsByTagName("img")[0].attributes.src.nodeValue;
	  					var num = RandomNum(90,138);
                   		blog.innerHTML += `<li class="title">
               									<a href="javascript:;" id="${data.rows[i]._id}"></a>
               									<div class="imgBox"><img src="${jsonImg}" alt=""></div>
           										<div class="blog_msg">
													<p>${data.rows[i].title}</p>
           											<div>
														<span></span>
           												<span>${data.rows[i].date}</span>
           											</div>
               										<span>${content.substring(0,num)}...</span>
           										</div>
       										</li>`;
				  	}
				}
			})
		};
	}
})