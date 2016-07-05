/***新增会员的表单验证***/
define(function(require) {
    var main = require("../../main"), area = require('../area');
    //var $=require("jquery");

    /***收货地址的默认文字样式***/
    $(".addr-textarea").on("focus", function () {
        var $val = $(this).html();
        if ($val != "") {
            $(this).html("");
        }
    })
    $(".addr-textarea").on("keyup", function () {
        var $val = $(this).html();
        $(this).css("color", "#666");
    });
    //main.listInit();
    /***选项卡的页签的切换***/
    $(".Tab-li").on("click", function () {
        $(this).siblings().removeClass("Tab-li-select");
        $(this).addClass("Tab-li-select");
        var _index = $(this).index();
        $(".tabs-infor1").eq(_index).show().siblings(".tabs-infor1").hide();
        var $obj1=$(".tabs-infor1").eq(_index).find("table").eq(0);
        var $obj2=$(".tabs-infor1").eq(_index).find("table").eq(1);
        main.listInit1($obj1,$obj2);
    });

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
        if(cityid!=''){
            area.getCity(2,pid,'address_city',cityid);
        }
        if(areaid!=''){
            area.getCity(3,cityid,'address_region',areaid);
        }
    }

    $('.ft-col-666').click(function(){
        window.close();
    })

})