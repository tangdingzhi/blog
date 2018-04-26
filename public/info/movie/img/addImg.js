define((require, exports) => {	
	const $ = require("jquery")
	const imgData = {
		type: "1"
	}
	function init(){
		$('#imgType').combobox({    
		    data: [{
				label: '主页图片',
				value: '1'
			}, {
				label: '剧情图片',
				value: '2'
			}],
			valueField: 'value',
			textField: 'label',
			value: imgData.type,//设置刷新时默认显示  
			onSelect: (record) => {//onSelect 是easy-ui的事件类型之一，
				//作用是当用户选择列表项时触发的事件 ，参数是record
				// console.log(record.value)
				imgData.type = record.value
				imgDataReload()//该方法让图片类型选择上传后刷新页面。
			} 
		}); 
		$('#upImg').fileupload({//选择上传图片的方法，结合后台的busboy使用
				url: "/imgs/upload",
				dataType: 'json',
				formData: {
					imgData: JSON.stringify({
						movieId: imgData.movieId,
						type: imgData.type
					})
				},
				// //上传之前的方法
				add: function(e, data) {
					data.submit()//提交上传的方法
				},
				//上传成功后的方法
				done: function(e, data) {
					imgDataReload()//上传成功后修改imgData中的值，不然下面列表拿不到movieId,
				},
		})//.bind才会把imgData.movieId 上传过去
		.bind('fileuploadsubmit', function(e, data) {
			data.formData = {
				imgData: JSON.stringify({
					movieId: imgData.movieId,
					type: imgData.type
				})
			};
		})
		$('#imgList').datagrid({ 
			url:'/imgs/query',
		    method:"get",
		    pagination:true, //自动分页功能。
		    singleSelect:true,//实现单选。
		    queryParams:imgData,
		    width:600,
		    // height:600,  
		    columns:[[   
		        {
		        	field:'movieId',//填入后台返回的movieId值
		        	title:'电影名称',
		        	width:200,
		        	formatter:function(value,row,inde){
		        		//formatter返回格式化后的分组标题文本，以显示分组项

		        		return `<span>${value.cName}</span>`
		        	}
		        },    
		        {
		        	field:'type',
		        	title:'图片类型',
		        	width:200,
		        	formatter:function(value,row,inde){
		        		if(value === "1"){
		        			return `<span>主页图片</span>`
		        		}
		        		return `<span>剧情图片</span>`
		        	}
		        },
		        {
		        	field:'url',
		        	title:'图片路径',
		        	width:200,
		        	formatter:function(value,row,inde){
		        		return `<img style = "width:100px" src = "${value}" alt="">`
		        	}
		        }
		    ]]   
   		});
   		function imgDataReload(){
		//该方法让图片类型选择上传后刷新页面 datagrid()是easy-ui的方法，
		//"reload" 参数是刷新用，刷新后重新加载参数imgData
		$("#imgList").datagrid("reload",imgData)
	}
	}
	exports.load = (movieId) => {
		$("#info-content").load("./info/movie/img/addImg.html",function(){
			imgData.movieId = movieId//保存传过来的movieId
			init();
			
			// console.log(movieId)
		})
	}
})