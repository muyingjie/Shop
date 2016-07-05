/**
 * Created by lenovo on 2016/5/20.
 */
define(function (require) {
    

    $(".mainCtrl").on("click","i.checkbox",function(){//复选框
        var that = $(this).siblings("input");
        $(this).toggleClass("checked");
        if($(this).hasClass("checked")){
            that.val("1")
        }else{
            that.val("0")
        }
    });

    $(".delBtn").click(function () {//添加
        $(".tableList tbody").append($(".hiddenBox tr").clone());
    })

    $(".tableList").on("click",".goods-standard-del", function () {//删除行
        var _this = $(this)
        box.showConfirm({title:"新窗口", content:"是否删除",width:300,subTxt:"确认",cancelTxt:"取消",callback: function () {
            _this.parents("tr").remove();;//在ajax上传成功后调用此方法
        }})
    });

    function sort(sortUp,sortDown){//点击排序方法
        $(document).on("click",sortUp, function () {
            var _this = $(this).parents("tr");
            var index = _this.index();
            if (index > 1) _this.prev().before(_this);
        }).on("click",sortDown, function () {
            var _this = $(this).parents("tr");
            var index = _this.index();
            var indexs = _this.siblings().length;
            if (index < indexs) _this.next().after(_this);
        })
    }
    sort(".sortUp",".sortDown");//调用点击排序，调用时只需传递向上或向下的按钮类名或ID，即可调用排序方法
})