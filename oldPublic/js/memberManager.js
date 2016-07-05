/***新增会员的表单验证***/
$(function () {
    $(".addmember").on("blur", ".txt", function () {
        var $val = $(this).val(), parent = $(this).parent();
        $(this).css("color", "#666");
        if (userRegExp[$(this).attr("regName")].reg.test($val)) {
            if ($(this).hasClass("username")) {
                $.post("checkUserName.php?t=" + new Date().getTime(), {v: $val}, function (d) {
                    if (d == 1) {
                        parent.addClass("err").find(".err-tip>span").text("用户名重复");
                    } else {
                        parent.removeClass("err").addClass("succ")
                    }
                })
            } else if ($(this).hasClass("name")) {
                $.post("checkUserName.php?t=" + new Date().getTime(), {v: $val}, function (d) {
                    if (d == 1) {
                        parent.addClass("err").find(".err-tip>span").text("姓名重复");
                    } else {
                        parent.removeClass("err").addClass("succ")
                    }
                })
            } else if ($(this).hasClass("mobile")) {
                $.post("checkUserName.php?t=" + new Date().getTime(), {v: $val}, function (d) {
                    if (d == 1) {
                        parent.addClass("err").find(".err-tip>span").text("手机号码已经注册");
                    } else {
                        parent.removeClass("err").addClass("succ")
                    }
                })
            } else if ($(this).hasClass("mail")) {
                $.post("checkUserName.php?t=" + new Date().getTime(), {v: $val}, function (d) {
                    if (d == 1) {
                        parent.addClass("err").find(".err-tip>span").text("邮箱已经注册");
                    } else {
                        parent.removeClass("err").addClass("succ")
                    }
                })
            } else {
                parent.removeClass("err").addClass("succ")
            }
        } else {
            parent.addClass("err").find(".err-tip>span").text(userRegExp[$(this).attr("regName")].errInfor);
        }
    });
    $(".addmember").on("focus", ".txt", function () {
        var defaultTip = $(this).siblings(".default-tip");
        if (defaultTip.length > 0) {
            $(this).parent().removeClass("err succ")
        }
    });

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
    /***选项卡的页签的切换***/
    $(".Tab-li").on("click", function () {
        $(this).siblings().removeClass("Tab-li-select");
        $(this).addClass("Tab-li-select");
        var _index = $(this).index();
        $(".tabs-infor1").eq(_index).show().siblings(".tabs-infor1").hide();
        listInit();
    });
})