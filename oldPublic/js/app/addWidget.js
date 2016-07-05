define(function(require, exports, module) {
    //var $=require('jquery');
    /***选项卡的页签的切换***/
    $(".Tab-li").hover(function () {
        $(this).siblings().removeClass("w-li-select");
        $(this).addClass("w-li-select");
    });
    $(".Tab-li").on("click", function () {
        $(this).siblings().removeClass("w-li-select");
        $(this).addClass("w-li-select");
        var _index = $(this).index()-1;
        $(".w-tabs-infor1").eq(_index).show().siblings(".w-tabs-infor1").hide();
    });

    $(".ad-brand-btn").on("click", function(event) {

        var target = $(this);

        var widgetData = JSON.parse(target.attr("widget"));

        top._globeManage.addWidget(widgetData[0]);
    });

})
