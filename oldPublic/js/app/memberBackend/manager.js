/***新增会员的表单验证***/
define(function(require) {
    var main = require("../../main"), area = require('../area');
    //var $=require("jquery");
    $(".addmember").on("blur", ".txt", function () {
        var $val = $(this).val(), parent = $(this).parent();
        $(this).css("color", "#666");
        if ($(this).hasClass("username") && $val!='') {
            $.post("/index.php/Member/Member/checkMember?label=account&id=" + mid + "&t=" + new Date().getTime(), {v: $val}, function (d) {
                if (d == 1) {
                    parent.addClass("err").find(".err-tip>span").text("用户名重复");
                } else {
                    parent.removeClass("err").addClass("succ")
                }
            })
        } else if ($(this).hasClass("mobile") && $val!='') {
            $.post("/index.php/Member/Member/checkMember?label=mobile&id=" + mid + "&t=" + new Date().getTime(), {v: $val}, function (d) {
                if (d == 1) {
                    parent.addClass("err").find(".err-tip>span").text("手机号码已经注册");
                } else {
                    parent.removeClass("err").addClass("succ")
                }
            })
        } else if ($(this).hasClass("mail") && $val!='') {
            $.post("/index.php/Member/Member/checkMember?label=email&id=" + mid + "&t=" + new Date().getTime(), {v: $val}, function (d) {
                if (d == 1) {
                    parent.addClass("err").find(".err-tip>span").text("邮箱已经注册");
                } else {
                    parent.removeClass("err").addClass("succ")
                }
            })
        } else {
            parent.removeClass("err").addClass("succ")
        }
    });
    $(".addmember").on("focus", ".txt", function () {
        var defaultTip = $(this).siblings(".default-tip");
        if (defaultTip.length > 0) {
            $(this).parent().removeClass("err succ")
        }
    });

    /***收货地址的默认文字样式***/
    //$(".addr-textarea").on("focus", function () {
    //    var $val = $(this).html();
    //    if ($val != "") {
    //        $(this).html("");
    //    }
    //})
    $(".addr-textarea").on("keyup", function () {
        var $val = $(this).html();
        $(this).css("color", "#666");
    });
    /***选项卡的页签的切换***/
    $(".Tab-li").on("click", function () {
        $(this).siblings().removeClass("Tab-li-select");
        $(this).addClass("Tab-li-select");
        var _index = $(this).index();
        $(".tabs-infor1").eq(_index).show().siblings(".tabs-infor1").hide();
        main.listInit();
    });

    //会员 省
    $('.code select').eq(0).on('change',function(){
        area.getCity(2,this.value,'city')
    })

    //会员 市
    $('.code select').eq(1).on('change',function(){
        area.getCity(3,this.value,'region')
    })

    //收货地址 省
    $('.address select').eq(0).on('change',function(){
        area.getCity(2,this.value,'address_city')
    })

    //收货地址 市
    $('.address select').eq(1).on('change',function(){
        area.getCity(3,this.value,'address_region')
    })

    //修改会员时省市区加载数据
    if(mid!=''){
        if(city!=''){
            area.getCity(2,province,'city',city);
        }
        if(region!=''){
            area.getCity(3,city,'region',region);
        }
        if(cityid!=''){
            area.getCity(2,pid,'address_city',cityid);
        }
        if(areaid!=''){
            area.getCity(3,cityid,'address_region',areaid);
        }
    }else{
        $(".Tab-li").eq(1).unbind( "click" );
        $(".Tab-li").eq(1).hide();
    }

    //修改会员地址时自动点击对应的tab
    if (aid != '') {
        //alert('d');
        $(".Tab-li").eq(1).click();
    }

})