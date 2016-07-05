/**
 * Created by lenovo on 2016/5/18.
 */
define(function (require,exports,module) {
    
    var swfUpload_w=require('../widgets/swfUpload_w');
    require('../widgets/tabs');
    var pageParam = require("PageParam");


    $("#tabs").tabs(null, null, 'Tab-li-select');//tab切换
    selectLocation(".photoSet td");
    selectLocation(".pictureSet td");
    function selectLocation(domElem){//水印位置选择函数
        $(domElem).click(function () {
            $(domElem).removeClass("bg-4587da");
            $(this).addClass("bg-4587da");
            $(this).parents("table").siblings("input").val($(this).attr("position"));//给隐藏域input赋值
        })
    }

    $("input.radio").each(function () { //水印形式初始化
        var _this = $(this)
        var that = $(this).parents("label").siblings("div");
        if($(this).is(":checked")&&$(this).attr("mark") != "noWatermark"){
            that.css("display","block").find(".setPhotoSelctUl li:eq(0)>div").css("display","none").each(function () {
                if($(this).hasClass(_this.attr("mark"))) $(this).css("display","block");
            });
        }
    })
    
    $(".radio").click(function () {//水印形式选择
        var _this =$(this).parents("label").children("input.radio:checked");
        var that = $(this).parents("label").siblings("div");
        if(_this.attr("mark") == "noWatermark"){
            that.css("display","none");
        }else{
            that.css("display","block").find(".setPhotoSelctUl li:eq(0)>div").css("display","none").each(function (i) {
                if($(this).hasClass(_this.attr("mark"))) $(this).css("display","block");
            });
        }
    });

    $(".file").click(function () {
        var _this = $(this);
        dlog.showIframe({
            title:"提示",
            width:500,
            url:"SelectImageBox.html",
            data:{key:1},
            callback:function(data){
                _this.siblings("span").children("input").val(data.url);
                _this.siblings("span").children("img").attr("src",data.image_id);
            }})
    })
    //保存按钮
    $(".gen-sureBtn ").click(function () {
        var item = $(".Tab-ul>li");
        if(item.eq(0).hasClass("Tab-li-select")){//商品缩略图设置

                //ajax部分

        }else if(item.eq(1).hasClass("Tab-li-select")){//商品相册图设置

                //ajax部分

        }else{//商品详情图设置

                //ajax部分
        }
    })

});
