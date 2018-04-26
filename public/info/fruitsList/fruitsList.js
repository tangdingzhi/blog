define((require, exports) => {
	const $=require("jquery")

	function init() {
		$.ajax({
			url:"/fruits/query",
			type:"get",
			success(data){
				var frulist = ` <tr align="center">
							        <th>水果名</th>
								    <th>价格（元）</th>
								    <th>售价（元）</th>
								    <th>重量（斤）</th>
								    <th>简介</th>
								    <th>操作</th>
								</tr>`;
				for (var i = 0; i < data.rows.length; i++) {
					frulist += `<tr align="center">
						          	<td>${data.rows[i].name}</td>
						          	<td>${data.rows[i].money}</td>
						          	<td>${data.rows[i].Rmoney}</td>
						          	<td>${data.rows[i].kg}</td>
						          	<td>${data.rows[i].synopsis}</td>
						          	<td><button class="submit" id="${data.rows[i]._id}">删除</button></td>
						        </tr> `
				}
				$(".t1").html(frulist)

			}
		})	
        $(".t1 tr").mouseover(function () {
            //如果鼠标移到class为stripe的表格的tr上时，执行函数  
            $(this).addClass("over");
        }).mouseout(function () {
            //给这行添加class值为over，并且当鼠标一出该行时执行函数  
            $(this).removeClass("over");
        }) //移除该行的class  
        $(".t1 tr:even").addClass("alt");
        //给class为stripe的表格的偶数行添加class值为alt
	};

	exports.load = (url) => {
		$("#info-content").load("./info/fruitsList/fruitsList.html",function(){
			console.log("fruitsList")
			init();
			$(".t1").on("click","button",function(){
					$.ajax({
					url:"/fruits/removeMovie",
					type:"post",
					data:{movieId:$(this).attr("id")},
					success(data){
						if(data.ok==1){
							init()
						}
					}
				})	
			});
		})
	}
})