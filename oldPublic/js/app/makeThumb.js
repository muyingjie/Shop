define(function (require) {
    //
    var pageParam = require("PageParam");
    var pageOptions = pageParam.getParam();
    var dlog = require("../widgets/dialogs");
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
    /*    console.log(imgSize);*/
        $("input").each(function () {
            if($(this).val()== "1"){
                imgSize.push($(this).attr("name"))
            }
        });

        if(imgSize.length==0){
                dlog.closeDialog();
        }   
       
        var checkRule=top.finder._checkedRule;
        var ids;
        if(checkRule=='checked'){
            ids=top.finder.getCheckedRowIds();
        }else{
            ids=top.finder.getUncheckedRowIds();
        }
   
        $.post(pageOptions.thumbUrl,{imgSize:imgSize,ids:ids,checkRule:checkRule},function(res){
                 if(res.status){
                    top.frameWarningHide("handleSuccess", "操作成功！", 2000);
                     top.finder.loadData();
                    dlog.closeDialog();
                }else{
                    top.frameWarningHide("handleDefault", "操作失败！", 2000);
                    dlog.closeDialog();
                }
        },"json")
        // console.log(imgSize);
    })

})