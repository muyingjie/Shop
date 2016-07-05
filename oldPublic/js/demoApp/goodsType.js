/**
 * Created by lenovo on 2016/5/20.
 */
define(function (require,exports,module) {
    
    var box = require('../widgets/dialogs');
    $(".mainCont").on("click","i.checkbox",function(){//复选框
        var that = $(this).siblings("input");
        if($(this).hasClass("checkAll")){
            /*全选*/
            if(!$(this).hasClass("checked")){
                $(".mainCont i.checkbox").addClass("checked");
            }else{
                $(".mainCont i.checkbox").removeClass("checked");
            }
        }else{
            /*单选*/
            $(this).toggleClass("checked");
        }

        if($(this).hasClass("checked")){//复选框给input隐藏域赋值
            that.val("1")
        }else{
            that.val("0")
        }
    });
    $(".mainCtrl").on("click",".del", function () {//删除选中多个的按钮
        box.showConfirm({title:"新窗口", content:"是否删除",width:300,subTxt:"确认",cancelTxt:"取消",callback: function () {
            $(".tableList i").each(function (i) {
                if($(this).hasClass("checked")){
                    $(this).parents("tr").remove();
                }
            })
        }})
    })

    $(".tableList").on("click",".del-link", function () {//行内单个删除按钮
        var _this = $(this);
        box.showConfirm({title:"新窗口", content:"是否删除",width:300,subTxt:"确认",cancelTxt:"取消",callback: function () {
            _this.parents("tr").remove();//在ajax上传成功后调用此方法
        }})
    })
})