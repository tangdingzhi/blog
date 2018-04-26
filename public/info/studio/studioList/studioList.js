define((require, exports) => {
    const $ = require("jquery")
    const studio = {

    }

    function init() {
        $("#listStudio").datagrid({
            url: "/studio/query",
            method: "get",
            pagination: true,
            singleSelect: true,
            fitColumns: true,
            columns: [
                [{
                    field: 'name',
                    title: '影院名称'
                }, {
                    field: 'address',
                    title: '地址'
                }, {
                    field: '_id',
                    title: '操作',
                    formatter: function(value, row, index) {
                        return `
                            <a _id="${value}" class="updateBtn" href="#">修改</a>
                            <a _id="${value}" class="deleteBtn" href="#">删除</a>
                        `
                    }
                }]
            ],
            onLoadSuccess(data) {
                $(".updateBtn").on("click", function(e) {
                    e.preventDefault()
                    location.hash = `/info/studio/updateStudio/${$(this).attr("_id")}`
                })
                $(".deleteBtn").on("click", function(e) {
                    e.preventDefault()
                    studio._id = $(this).attr("_id")
                    deleteStudio()
                    studioListReload()
                })
            }
        })
    }

    async function deleteStudio() {
        const data = await new Promise((resolve, reject) => {
                $.ajax({
                    url: "/studio/deleteStudio",
                    type: "post",
                    data: studio,
                    success(data) {
                        resolve(data)
                    }
                })
            })
            // console.log(data);
    }

    function studioListReload() {
        $("#listStudio").datagrid('reload')
    }

    exports.load = () => {
        $("#info-content").load("./info/studio/studioList/studioList.html", () => {
            init()
        })
    }
})
