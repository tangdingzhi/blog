define((require, exports) => {

    const $ = require("jquery")


    const theaters = {}

    function getTheaterData() {
        theaters.name = $("#theaterName").val()
        return theaters
    }


    function addTheaters() {
        $.ajax({
            url: "/theaters/addTheater",
            type: "post",
            data: getTheaterData(),
            success(data) {
                return data
            }
        })
    }
    exports.load = (studioId) => {
        $("#info-content").load("./info/theater/showtheaters.html", () => {
            theaters.studioId = studioId
            init()
            $('#saveBtn')
                .linkbutton()
                .on("click", function(e) {
                    e.preventDefault();
                    if ($("#theaterName").val() != "") {
                        addTheaters()
                        $('#theatersList').datagrid("reload")
                        $("#theaterName").val("")
                        init()
                    } else {
                        $("#theaterName").val("")
                        init()
                    }
                });

            function init() {
                $('#theatersList').datagrid({
                    url: "/theaters/query",
                    queryParams: {
                        studioId: theaters.studioId
                    },
                    method: "get",
                    pagination: true,
                    singleSelect: true,
                    fitColumns: true,
                    columns: [
                        [{
                            field: 'name',
                            title: '放映厅名称',
                            width: 200,
                        }, {
                            field: 'studioId',
                            title: '影院',
                            width: 200,
                            formatter: function(value, row, index) { //url请求后返回的东西：value是当前的field，row所有的field
                                return value.name
                            }
                        }, {
                            field: '_id',
                            title: '操作',
                            width: 280,
                            formatter: function(value, row, index) {
                                return `
                        	<a _id="${value}" class="removeTheater" href="#">删除</a>
                        	<a _id="${value}" class="deleteTheater" href="#">修改</a>
                        	<a _id="${value}" class="showSeats" href="#">显示座位</a>
                        `
                            }
                        }]
                    ],
                    onLoadSuccess(data) {
                        $(".removeTheater").on("click", function(e) {
                            const theatersId = $(this).attr("_id") //attr是获取属性：获取放映厅的id
                            e.preventDefault()
                            $.ajax({
                                url: "/theaters/remove",
                                type: "get",
                                data: {
                                    _id: theatersId
                                },
                                success(data) {
                                    $('#theatersList').datagrid("reload")
                                }
                            })
                        })
                        $(".deleteTheater").on("click", function(e) {
                            e.preventDefault()
                            theatersId = $(this).attr("_id")
                        })

                        $(".showSeats").on("click", function(e) {
                            $("#seatList").empty()
                            const theatersId = $(this).attr("_id")
                            e.preventDefault()
                            $.ajax({
                                url: "/theaters/seatsQuery",
                                type: "get",
                                data: {
                                    theatersId: theatersId
                                },
                                success(data) {
                                    data.map((item) => {
                                        if (item.rowNo == "1") {
                                            seatList.innerHTML += `<span style="padding-right:10px">${item.displayName}</span>`;
                                        }
                                        if (item.rowNo == "2") {
                                            seatList.innerHTML += `<span style="padding-right:10px">${item.displayName}</span>`;
                                        }
                                        if (item.rowNo == "3") {
                                            seatList.innerHTML += `<span style="padding-right:10px">${item.displayName}</span>`;
                                        }
                                        if (item.rowNo == "4") {
                                            seatList.innerHTML += `<span style="padding-right:10px">${item.displayName}</span>`;
                                        }
                                        if (item.rowNo == "5") {
                                            seatList.innerHTML += `<span style="padding-right:10px">${item.displayName}</span>`;
                                        }
                                        if (item.rowNo == "6") {
                                            seatList.innerHTML += `<span style="padding-right:10px">${item.displayName}</span>`;
                                        }
                                        if (item.rowNo == "7") {
                                            seatList.innerHTML += `<span style="padding-right:10px">${item.displayName}</span>`;
                                        }
                                        if (item.rowNo == "8") {
                                            seatList.innerHTML += `<span style="padding-right:10px">${item.displayName}</span>`;
                                        }
                                        if (item.rowNo == "9") {
                                            seatList.innerHTML += `<span style="padding-right:10px">${item.displayName}</span>`;
                                        }
                                    })
                                }
                            })



                        })
                    }
                });
            }


            $("#saveName")
                .linkbutton()
                .on("click", function(e) {
                    e.preventDefault()
                    const str = $("#changeName").val()
                    $.ajax({
                        url: "/theaters/update",
                        type: "get",
                        data: {
                            _id: theatersId,
                            name: str
                        },
                        success(data) {
                            $('#theatersList').datagrid("reload");
                            $("#changeName").val("")
                        }
                    })
                })
        })
    }
})