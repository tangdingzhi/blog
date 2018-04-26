define((require, exports) => {

    const $ = require("jquery")

    const theaters = {}

    function init() {
        $('#addStudioList').datagrid({
            url: "/studio/query",
            method: "get",
            pagination: true,
            singleSelect: true,
            fitColumns: true,
            columns: [
                [{
                    field: 'name',
                    title: '影院名称',
                    width: 200,
                }, {
                    field: 'address',
                    title: '地址',
                    width: 360,
                }, {
                    field: '_id',
                    title: '操作',
                    width: 280,
                    formatter: function(value, row, index) {
                        return `
    						<a _id="${value}" class="addTheater" href="#">新增放映厅</a>
    					`
                    }
                }]
            ],
            onLoadSuccess(data) {
                $(".addTheater").on("click", function(e) {
                    e.preventDefault()
                    location.hash = "/info/theater/showtheaters/" + $(this).attr("_id")
                })
            }
        });
    }

    exports.load = () => {
        $("#info-content").load("./info/theater/addtheaters.html", () => {
            init()
        })
    }
})