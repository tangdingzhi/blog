define((require, exports) => {
	const upDataMovie ={

	}
	const $ = require("jquery")
	function init(){
		$.ajax({
			url:"/movies/queryUpdateMovie",//修改电影。先查询出当前电影的信息
			type:"get",
			data:{
				movieId:upDataMovie.movieId
			},
			success({rows}){			
				const data = rows[0]
				$("#cName").val(data.cName)
				$("#eName").val(data.eName)
				$("#type").val(data.type)
				$("#country").val(data.country)
				$("#duration").val(data.duration)
				$("#director").val(data.director)
				$("#actors").val(data.actors)
				$("#release").val(data.release)
				$("#synopsis").html(data.synopsis)
				$("#saveBtn").on("click",function(){
					$.ajax({
						url:"/movies/updateMovie",
						type:"post",
						data:{
							movieId:upDataMovie.movieId,
							cName:$("#cName").val(),
							eName:$("#eName").val(),
							type:$("#type").val(),
							country:$("#country").val(),
							duration:$("#duration").val(),
							director:$("#director").val(),
							actors:$("#actors").val(),
							release:$("#release").val(),
							synopsis:$("#synopsis").html()
						},
						success(data){
							location.hash = "/info/movie/movieList"
						}
					})
				})
			}
		})
		$('#addImgBtn').on("click",function(e){
				e.preventDefault()
				location.hash = `/info/movie/addImg/${upDataMovie.movieId}`;
		})
	}

	exports.load = (movieId) => {
		$("#info-content").load("./info/movie/movieUpdate/movieUpdate.html",function(){
			upDataMovie.movieId = movieId
			init();			

		})
	}
})