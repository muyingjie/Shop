/**
 * Created by lenovo on 2016/5/25.
 */
/**
 * Created by lenovo on 2016/5/3.
 */
define(function (require,exports,module) {
    
    //引入dialog提示层
    var box = require('../widgets/dialogs');
    var showMsg = require('../widgets/validate').showMsg;
    var result = false;
    $(".select").on("click", function(e) {
        $.html5Validate.isAllpass($(this));
    });

    $('form').on('blur', 'input', showMsg);

    $('form').html5Validate(function() {//自己的验证方式接口，不需要时可删掉
        this.submit();
    }, {validate: function() {
        result = true;
        /**
         *此区域可以写自己的一些验证，比如用户名重复，省市区是否选择
         **/
        return result;
    }});

    $('.gen-sureBtn').click(function() {
        var $pwd1=$(".pwd").val();
        var $pwd2=$(".pwdCheck").val();
        if($pwd1 !="" && $pwd2 != "" && $pwd1 != $pwd2){
            $(".pwdCheck").parent("div").addClass("err");
            $(".pwdCheck").next(".err-tip").show().find("span").text("前后密码不一致")
        }
        var result = $.html5Validate.isAllpass($('form'));
        if($('form').find('.error')[0]) {
            showMsg.call($('form').find('.error')[0]);
        }
        if(result){
            //$('form').submit();//表单提交
            $.post("checkUserName.php?t=" + new Date().getTime(),{username: $(".username").val()},function(d){//ajax提交
                if(d == 1){
                    $(".username").parent("div").addClass("err");
                    $(".username").next(".err-tip").show().find("span").text("账号名称重复")
                }else{

                }
            });
        }
    });

});
