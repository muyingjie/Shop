/**
 * Created by lenovo on 2016/6/6.
 */
define(function (require) {
    
    var dlog = require("../widgets/dialogs");
    require('../widgets/select');

    $('.select').select({onlyShow: false});//下拉选择

    $(".checkbox").click(function () {//复选框
        $(this).toggleClass("checked");

        if($(this).hasClass("checked")){
            $(this).siblings("input").val("1");
            if($(this).attr("name") == "supportValue") $(".logistics").css("display","inline-block");//物流保价
            if($(this).hasClass("marginL20")) $(".disable").css("color","#999").find("input").attr("readonly","readonly").removeClass("txt");
        }else{
            if($(this).attr("name") == "supportValue") $(".logistics").css("display","none");//物流保价
            if($(this).hasClass("marginL20")) $(".disable").css("color","#999");
            if($(this).hasClass("marginL20")) $(".disable").css("color","#666").find("input").removeAttr("readonly","readonly").addClass("txt");
            $(this).siblings("input").val("0");
        }

    })

    if($(".marginL15").is(":checked")) $(".deliveryWay").css("display","block");//初始化默认配送费用适用地区

    $("input[name=deliverAdd1]").click(function () {//默认配送费用适用地区
        $(this).hasClass("marginL15") ? $(".deliveryWay").css("display","block"):$(".deliveryWay").css("display","none");
    })
    
    $(".setAddPrice").click(function () {//指定的地区设置运费按钮
        $(".payAdds-ul3").append($(".addHiddenBox").find("li").clone())
    })

    $(".payAdds").on("click",".select_area", function () {//地区选择
        dlog.showIframe({title:"提示",width:500,url:"ztree-content.html",data:{id:1},callback:function(data){

        }})
    })

    $(".payAdds").on("click",".useEquation", function () {//使用公式

    });

    $(".payAdds").on("click",".delete_btn", function () {//删除按钮
        var _this = $(this);
        dlog.showAlert({title:"提示",width:500,content:"确认删除？",ok:function(){
           _this.parent("span").parent("li").remove();//ajax请求成功后调用
        }})
    })
})
