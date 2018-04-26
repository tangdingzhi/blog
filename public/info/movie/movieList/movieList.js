define((require, exports) => {
	const $=require("jquery")	
	// function init(){
	// 	$("#movieList1").datagrid({
	// 		url:'/movies/query',
	// 	    method:"get",
	// 	    pagination:true, //自动分页功能。
	// 	    singleSelect:true,//实现单选。		    
	// 	    width:800,
	// 	    // height:600,  
	// 	    columns:[[   
	// 	        {
	// 	        	field:'cName',//填入后台返回的movieId值
	// 	        	title:'电影名称',
	// 	        	width:200,
	// 	        	formatter:function(value,row,inde){
	// 	        		//formatter返回格式化后的分组标题文本，以显示分组项
	// 	        		return `<span>${value}</span>`
	// 	        	}
	// 	        },    
	// 	        {
	// 	        	field:'type',
	// 	        	title:'电影类型',
	// 	        	width:200,
	// 	        	formatter:function(value,row,inde){		        	
	// 	        		return `<span>${value}</span>`
	// 	        	}
	// 	        },
	// 	        {
	// 	        	field:'release',
	// 	        	title:'上映时间',
	// 	        	width:200,
	// 	        	formatter:function(value,row,inde){
	// 	        		return `<span>${value}</span>`
	// 	        	}
	// 	        },
	// 	        {
	// 	        	field:'_id',
	// 	        	title:'操作',
	// 	        	width:200,
	// 	        	formatter:function(value,row,inde){		        		
	// 	        		return `<span _id="${value}" class="remove">删除</span>
	// 	        		 		<span _id="${value}" class="update">修改</span>									
	// 	        		`
	// 	        	}
	// 	        }
	// 	    ]],
	// 	    onLoadSuccess(data){
	// 	    	$(".remove").on("click",function(){
	// 	    		const movieId = $(this).attr("_id")		    		
	// 	    		console.log($(this).attr("_id"))
	// 	    		$.ajax({
	// 	    			url:"/movies/removeMovie",
	// 	    			type:"post",
	// 	    			data:{movieId:movieId},
	// 	    			success(data){
	// 	    				init()
	// 	    			}
	// 	    		})
	// 	    	})
	// 	    	$(".update").on("click",function(){
	// 	    		location.hash = `/info/movie/update/${$(this).attr("_id")}`
		    		
	// 	    	})
	// 	    }
	// 	})	
	// }		
	exports.load = (url) => {
		$("#info-content").load("./info/movie/movieList/movieList.html",function(){
			init();
			// console.log($("#cName"))
		})
	}
})