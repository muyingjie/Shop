/***选项卡的页签的切换***/
$(function () {
    $(".Tab-li").on("click", function () {
        var _this = $(this).index();
        var _last = $(".Tab-li").length - 1;
        if (_this == 0 || _this == _last) {
            return;
        }
        $(this).siblings().removeClass("Tab-li-select");
        $(this).addClass("Tab-li-select");
    });
});