$(function () {
    $(".lookLi").on("click", function () {
        var _this = $(this).index();
        var _last=$(".lookLi").length-1;
        if (_this == 0 || _this == _last) {
            return;
        }
        $(this).siblings().removeClass("lookBorder");
        $(this).addClass("lookBorder");
    });
});
