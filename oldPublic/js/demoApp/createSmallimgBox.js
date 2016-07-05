define(function (require) {
    
    $(".checkbox").click(function () {//复选框
        $(this).toggleClass("checked");
        if($(this).hasClass("checked")) {//选中后给input隐藏域赋值
            $(this).siblings("input").val("1");
        }else{//未选中后给input隐藏域赋值
            $(this).siblings("input").val("0");
        }
    })
    $(".gen-sureBtn").click(function () {//保存按钮
        var imgSize = [];
        $("input").each(function () {
            if($(this).val()){
                imgSize.push($(this).attr("name"))
            }
        });
        if(!imgSize){
            alert("请选择生成一种图片")
        }else{
            $.post("url",{imgSize:imgSize}, function (data) {
                if(data.state){
                    
                }
            })
        }
    })

})