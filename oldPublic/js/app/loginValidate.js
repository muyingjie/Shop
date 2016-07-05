//清空默认提示
window.onload = setDefault;
function setDefault() {
    $(".default-tip").val("");
}
define(function (require) {
    //var $=require("jquery");
    $(function () {
        if (window.location.href != top.location.href) top.location.href = window.location.href;
        $(function () {
            $(".loginTxt").each(function () {
                if ($(this).val() !== "") {
                    $(".RememPwd").addClass("checked");
                    $(this).next(".default-tip").hide();
                }
            })
        });
        $(".default-tip").css("cursor", "pointer");
        $(".default-tip").on("click", function () {
            $(this).hide();
            $(this).prev(".loginTxt").focus();
        });
        //模拟复选框
        $(".checkbox").click(function () {
            var _this = $(this);
            if (_this.hasClass("checked")) {
                _this.removeClass("checked");
            } else {
                _this.addClass("checked");
            }
        });

        $("input.loginName")
            .focus(function () {
                $(this).next(".default-tip").hide();
                if ($(this).val() == this.defaultValue) {
                    $(this).val("");
                    $(this).removeClass("errorMes");
                    $(".errorTipUser").hide();
                }

            })
            .blur(function () {
                if ($(this).val() == "") {
                    $(this).next(".default-tip").show();
                    $(this).val(this.defaultValue).css("color", "#999").removeClass("errorMes");
                    $(".loginName").addClass("errorMes");
                    $(".errorTipUser").show();
                    $(".errorTipUser span").html("请输入用户名");
                } else if ($(this).val() != this.defaultValue && this.value.length < 6 || this.value.length > 20) {
                    $(".errorTipUser").show();
                    $(this).addClass("errorMes");
                    $(".errorTipUser span").html("用户名输入有误")
                } else {
                    $(this).removeClass("errorMes");
                    $(".errorTipUser").hide();
                }
            });

        $("input.loginPassword")
            .focus(function () {
                $(this).next(".default-tip").hide();
                if ($(this).val() == this.defaultValue) {
                    $(this).val("");
                    $(this).removeClass("errorMes");
                    $(".errorTipPassWord").hide();
                }
            })
            .blur(function () {
                if ($(this).val() == "") {
                    $(this).next(".default-tip").show();
                    $(this).val(this.defaultValue);
                    $(".loginPassword").addClass("errorMes");
                    $(".errorTipPassWord").show();
                    $(".errorTipPassWord span").html("请输入密码");
                } else if ($(this).val() != this.defaultValue && this.value.length < 6 || this.value.length > 20) {
                    $(".errorTipPassWord").show();
                    $(this).addClass("errorMes");
                    $(".errorTipPassWord span").html("密码不正确")
                } else {
                    $(this).removeClass("errorMes");
                    $(".errorTipPassWord").hide();
                }
            });

        //向cookie中存数据
        var userName = cookie.get("username");
        if (userName) {
            $("#username").val(userName);//向cookie中存储用户名
        }
        var rememberUser = function (name) {
            cookie.set("username", name);
        };
        var delUser = function (name) {
            cookie.set("username", "");
        };

        //提交，最终验证。
        $('.loginSubmit').click(function () {
            $("form :input.loginTxt").each(function () {
                $(this).trigger('focus').trigger("blur");
            });
            var numError = $('form .errorTip:visible').length;
            if (numError) {
                return false;
            }
            var $username = $("#username").val();
            var $password = $("#password").val();


            $.ajax({
                type: "post",
                url: "/index.php/Desktop/Login/add",
                data: {username: $("#username").val(), password: $("#password").val()},
                dataType: "json",
                success: function (data) {
                    if (data.status == 1) {
                        if ($(".RememPwd").hasClass("checked")) {
                            rememberUser($username);
                        } else {
                            delUser($username);
                        }
                        window.location.href = data.msg;
                    } else {
                        alert(data.msg);
                    }
                }
            })
        });


    });
});
//定义cookie
var cookie = {
    set: function (name, value, expires, path, domain) {
        if (typeof expires == "undefined") {
            expires = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 30));//30天
        }
        document.cookie = name + "=" + escape(value) + ((expires) ? ";expires=" + expires.toGMTString() : "") + ((path) ? ";path=" + path : ";path=/") + ((domain) ? ";domain=" + domain : "");
    },
    get: function (name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2]);
        }
        return null;
    },
    clear: function (name, path, domain) {
        if (this.get(name)) {
            document.cookie = name + "=" + ((path) ? "; path=" + path : "; path=/") + ((domain) ? "; domain=" + domain : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
        }
    }
};