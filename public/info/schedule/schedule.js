efine((require, exports) => {
    const $ = require("jquery")
    var schedule = {
        movieId: "0",
        studioId: "0",
        theaterId: "0",
        price: "0"
            // showTime
    }

    function init() {
        $("#price").textbox();
        $('#showTime').datetimebox({
            value: getNow(),
            required: true,
            showSeconds: false
        });

        function getNow() {
            const now = new Date()
            return `
			${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`
        }





        function getScheduleData() {
            Object.assign(schedule, {
                showTime: $("#showTime").datetimebox("getValue"),
                price: $("#price").textbox('getValue')
            })
            return schedule
        }



        $("#movie").combobox({
            url: "/schedule/getMovie",
            method: "get",
            valueField: '_id',
            textField: 'cName',
            onLoadSuccess([option]) {
                $(this).combobox('setValue', option._id);
                schedule.movieId = option._id;
                scheduleStudioReload() //当movieId改变的时候要reload一次
                    //movies改变时，放映厅
                scheduleTheaterReload()
            },
            onSelect({ _id }) {
                schedule.movieId = _id;
                scheduleStudioReload()
                    //movies改变时，放映厅
                scheduleTheaterReload()
            }
        })



        $("#studio").combobox({
            url: "/schedule/getStudio",
            method: "get",
            valueField: '_id',
            textField: 'name',
            onLoadSuccess([option]) {
                $(this).combobox('setValue', option._id);
                schedule.studioId = option._id;
                theaterReload()
            },
            onSelect({ _id }) {
                schedule.studioId = _id;
                theaterReload()
            }
        })




        $("#theater").combobox({
            url: `/schedule/getTheater?studioId=${schedule.studioId}`,
            method: "get",
            valueField: '_id',
            textField: 'name',
            onLoadSuccess([option]) {
                if (option) {
                    $(this).combobox('setValue', option._id);
                    schedule.theaterId = option._id
                }
            },
            onSelect({ _id }) {
                schedule.theaterId = _id
            }
        })

        function theaterReload() {
            $("#theater").combobox("reload", `/schedule/getTheater?studioId=${schedule.studioId}`)
        }






        $("#saveSchedule")
            .linkbutton()
            .click((e) => {
                e.preventDefault()
                addSchedule()
                scheduleStudioReload()
                    //增加新放映厅的时候也改变下reload一下
                scheduleTheaterReload()
            })
        async function addSchedule() {
            const data = await new Promise((resolve, reject) => {
                $.ajax({
                    type: 'post',
                    url: '/schedule/addSchedule',
                    data: getScheduleData(),
                    success(data) {
                        resolve(data)
                    }
                })
            })
        }





        //已排片影院列表--他的初始值肯定为undefine，要在movieId生成的时候加载一次
        $('#scheduleStudio').datagrid({
            url: '/schedule/getStudiosByMovieId',
            fitColumns: true,
            pagination: true,
            method: 'get',
            singleSelect: true,
            width: 560,
            queryParams: schedule,
            columns: [
                [

                    {
                        field: 'name',
                        title: '影院名称',
                    },
                    {
                        field: 'address',
                        title: '影院地址',
                    },
                    {
                        field: '_id',
                        title: '操作',
                        width: 130,
                        formatter: function(value, row, index) {
                            return `
						<a _id="${value}" href="#" class="checkTheater">查看放映厅</a>
						<a _id="${value}" href="#" class="removeStudio">删除</a>
						`
                        }
                    }
                ]
            ],
            onLoadSuccess() {
                $(".checkTheater")
                    .linkbutton()
                    .click(function(e) {
                        e.preventDefault()
                        schedule.studioId = $(this).attr("_id");
                        $("#studio").combobox('setValue', $(this).attr("_id"));
                        theaterReload()
                        scheduleTheaterReload()
                    })


                $(".removeStudio")
                    .linkbutton()
                    .click(function(e) {
                        e.preventDefault()
                            // console.log(schedule.movieId)
                        new Promise((resolve, reject) => {
                                $.ajax({
                                    type: 'get',
                                    url: '/schedule/removeScheduleByStudioId',
                                    data: {
                                        studioId: $(this).attr("_id"),
                                        movieId: schedule.movieId
                                    },
                                    success(data) {
                                        resolve(data)
                                    }
                                })
                            })
                            .then((data) => {
                                scheduleStudioReload()
                                scheduleTheaterReload()
                            })
                    })


            }
        });

        function scheduleStudioReload() {
            $("#scheduleStudio").datagrid("reload", schedule)
        }


        //这里利用初次加载传参数据均为undefined,在查看场次按钮里面重新加载进行操作
        $("#scheduleTheater").datagrid({
            url: '/schedule/getTheaterByStudioId',
            fitColumns: false,
            pagination: true,
            method: 'get',
            singleSelect: true,
            width: 560,
            queryParams: {
                studioId: schedule.studioId,
                movieId: schedule.movieId
            },
            columns: [
                [{
                        field: 'movieId',
                        title: '电影名字',
                        formatter: function(value, row, index) {
                            return value.cName
                        }
                    },
                    {
                        field: 'studioId',
                        title: '影院名称',
                        formatter: function(value, row, index) {
                            return value.name
                        }
                    },
                    {
                        field: 'theaterId',
                        title: '放映厅名称',
                        formatter: function(value, row, index) {
                            return value.name
                        }
                    },
                    {
                        field: 'show_time',
                        title: '上映时间',
                    },
                    {
                        field: 'price',
                        title: '价格',
                    },
                    {
                        field: "_id",
                        title: "操作",
                        width: 160,
                        formatter: function(value, row, index) {
                            return `
		        		<a href="#" class="removeSingleSchedule" _id="${value}">删除放映厅</a>
		        		<a href="#" class="querySeating" _id="${value}">查看座位</a>
		        		`
                        }
                    }
                ]
            ],
            onLoadSuccess(data) {
                // console.log(data)
                $(".removeSingleSchedule")
                    .linkbutton()
                    .click(function(e) {
                        e.preventDefault()
                            // console.log($(this).attr("_id"))
                        new Promise((resolve, reject) => {
                                $.ajax({
                                    type: 'get',
                                    url: '/schedule/removeSingleSchedule',
                                    data: {
                                        _id: $(this).attr("_id")
                                    },
                                    success(data) {
                                        resolve(data)
                                    }
                                })
                            })
                            .then((data) => {
                                scheduleTheaterReload()
                            })
                    })


                $(".querySeating")
                    .linkbutton()
                    .click(function(e) {
                        e.preventDefault()
                            // console.log($(this).attr("_id"))
                        getData($(this).attr("_id")) //是scheduleId
                        scheduleQuerySeatingId.scheduleId = $(this).attr("_id")
                    })


            }
        })

        var scheduleQuerySeatingId = {}

        function getData(scheduleId) {
            new Promise((resolve, reject) => {
                    $.ajax({
                        type: 'get',
                        url: '/schedule/querySeating',
                        data: {
                            scheduleId: scheduleId
                        },
                        success(data) {
                            resolve(data)
                        }
                    })
                })
                .then((data) => {
                    chooseSeat(data)
                })
        }

        $("ul").on("click", "li", function(e) {
            console.log($(this).attr("_id")) //这个是每个seating的id
                // console.log("in")
            $.ajax({
                type: 'get',
                url: '/schedule/changeSeatingState',
                data: {
                    _id: $(this).attr("_id"),
                    state: $(this).attr("state") == "1" ? "0" : "1"
                },
                success(data) {
                    getData(scheduleQuerySeatingId.scheduleId)
                }
            })

        })


        function chooseSeat(dataInfo) {
            var str = dataInfo.map((item) => {
                return `<li _id="${item._id}" state="${item.state}"  class="${item.state == "1" ? "green" : "white"}"></li>`
            }).join("")
            $("#seatingUl").html(str)
        }




        function scheduleTheaterReload() {
            $("#scheduleTheater").datagrid("reload", {
                studioId: schedule.studioId,
                movieId: schedule.movieId
            })
        }


    }

    exports.load = () => {
        $("#info-content").load("./info/schedule/schedule.html", () => {
            // console.log('in-schedule.js')
            init()
        })
    }
})