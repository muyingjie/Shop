/**
 * Created by lenovo on 2016/5/12.
 */
define(function(require, exports, module) {
    //var $=require('jquery');
    require('../widgets/select');
    var box = require('../widgets/dialogs');

    $(".mainCont").height($(window).height()-53).css("overflow","auto");
    $(".select").select({onlyShow:false});//调用下拉选择

    $(".Tab-li").click(function () {//tab切换
        var _this = $(this);
        var atr = _this.attr("data-tab");
        if(!_this.hasClass("Tab-li-select")){
            $(".Tab-li").removeClass("Tab-li-select");
            _this.addClass("Tab-li-select");
        }
        $(".tabs-infor1").css("display","none").each(function(){
            if($(this).attr("data-tab") == atr) $(this).css("display","block");
        })
    })

    $(".add-standard").click(function () {//添加拓展属性
        $(this).parents(".mainCtrl").siblings(".tableList").append($(".hiddenBox tr").clone());
        $(".select").select({onlyShow:false});//调用下拉选择
        $(".select").on("sltChange",function (event,val){//选择输入时，对可帅选项的复选框进行屏蔽
            if(val.text == "输入") {
                    $(this).parents("tr").children("td").eq(5).children("i").css("display","none").removeClass("checked").siblings("input").val("0");
            }else{
                    $(this).parents("tr").children("td").eq(5).children("i").css("display","block");
            }
        });
    });

    $(".tableList").on("click",".edit",function(){//编辑文字弹出框
        var _this = $(this);
        var content = _this.next().val();
        box.showIframe({
            title:"编辑",
            width:500,
            url:"/index.php/goods/GoodsType/goodsTypePropsVal?content="+content,
            data:{id:1},
            callback:function(msg){
                if(msg.status == '3'){

                }else if(msg.status == '2'){
                    _this.html("点击编辑");
                    _this.next().val('');
                }else  if(msg.status == '1'){
                    _this.html(msg.str);
                    _this.next().val(msg.str);
                }
                console.log(msg)
            }
        });

    }).on("click",".editImg", function () {//编辑图片弹出框
        var _this = $(this);
        var content = _this.next().val();
        var content_img = $("#format_img").val();
        var is_open = $("#is_open").val();
        box.showIframe({
            title:"编辑",
            width:500,
            url:"/index.php/goods/GoodsType/goodsTypePropsValImg?content="+content+'&content_img='+content_img+'&is_open='+is_open,
            data:{id:1},
            callback:function(msg){
                if(msg.status == '3'){

                }else  if(msg.status == '1'){
                    if( msg.str == '' ){
                        _this.html("点击编辑");
                        _this.next().val('');
                    }else{
                        _this.html(msg.str);
                        _this.next().val(msg.str);
                    }
                    if( msg.str_img == ''){
                        $("#format_img").val("");
                        $("#is_open").val("0");
                    }else{
                        $("#format_img").val(msg.str_img);
                        $("#is_open").val(msg.is_open);
                    }
                }
                console.log(msg)
            }
        });
    });

    $(".tableList").on("click",".goods-standard-del", function () {//删除行
        var _this = $(this)
        _this.parents("tr").remove();
        //@lizhen 2016 05 19
        //box.showConfirm({title:"新窗口", content:"是否删除",width:300,subTxt:"确认",cancelTxt:"取消",callback: function () {
        //    _this.parents("tr").remove();;//在ajax上传成功后调用此方法
        //}})
    });

    $(".tableList").on("click","i.checkbox",function(){//复选框
        var that = $(this).siblings("input");
        $(this).toggleClass("checked");
        if($(this).hasClass("checked")){
            that.val("1")
        }else{
            that.val("2")
        }
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
});