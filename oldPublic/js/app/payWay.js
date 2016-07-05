define(function(require,exports) {
    //
    $(".activeStatus").click(function () {
        var val = $(this).text() == "启用" ? "1" : "0";
        $.post($(this).attr("src"),{"status":val,"id":$(this).attr("val")}, function (info) {
            var data = $.parseJSON(info);
            if(data.status){
                warningHide("handleSuccess", data.info, 2000);
                window.location.reload();
            }else{
                warningHide("handleDefault", data.info, 2000);
                window.location.reload();
            }
        })
    })

    //AJAX提示
    function warningHide(classname, txt, delay) {
        $(".handleWarning").attr("class", "handleWarning " + classname).text(txt).show()
        if (classname != "handleLoad") {
            setTimeout(function () {
                $(".handleWarning").fadeOut()
            }, delay)
        }
    }
})