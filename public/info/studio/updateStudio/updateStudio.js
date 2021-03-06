define((require, exports) => {
    const $ = require("jquery")
    const studio = {}

    function init() {
        $("#name").textbox({
            value: "CC影城莱蒙店",
            width: 500
        })
        $("#address").textbox({
            value: "武侯区二环路南四段51号莱蒙置地广场6层",
            width: 500
        })
        $('#saveBtn')
            .linkbutton()
            .on("click", (e) => {
                e.preventDefault();
                updateStudio()
            })
        $('#resetBtn')
            .linkbutton()
            .on("click", (e) => {
                e.preventDefault();
                $("#name").textbox('setValue', "")
                $("#address").textbox('setValue', "")
            })
    }

    function getStudioData() {
        studio.name = $("#name").val()
        studio.address = $("#address").val()
        return studio
    }
    async function updateStudio() {
        const data = await new Promise((resolve, reject) => {
                $.ajax({
                    url: "/studio/updateStudio",
                    type: "post",
                    data: getStudioData(),
                    success(data) {
                        resolve(data)
                    }
                })
            })
            // alert("影院信息更新成功！")
    }


    exports.load = (studioId) => {
        studio.studioId = studioId
        $("#info-content").load("./info/studio/updateStudio/updateStudio.html", () => {
            init()
        })
    }
})
