/**
 * Created by lenovo on 2016/5/25.
 */
/**
 * Created by lenovo on 2016/5/3.
 */
define(function (require,exports,module) {
    //
    //引入dialog提示层
    var box = require('../widgets/dialogs');
    var showMsg = require('../widgets/validate').showMsg;
    var result = false;
    $(".select").on("click", function(e) {
        $.html5Validate.isAllpass($(this));
    });

    $('form').on('blur', 'input', showMsg);

    /*    $('form').html5Validate(function() {//自己的验证方式接口，不需要时可删掉
     this.submit();
     }, {validate: function() {
     result = true;
     /!**
     *此区域可以写自己的一些验证，比如用户名重复，省市区是否选择
     **!/
     return result;
     }});*/

    function password(){
        var $pwd1=$(".pwd").val();
        var $pwd2=$(".pwdCheck").val();
        if($pwd1 !="" && $pwd2 != "" && $pwd1 != $pwd2){
            $(".pwdCheck").parent("div").addClass("err");
            $(".pwdCheck").next(".err-tip").show().find("span").text("前后密码不一致");
            result=false;
        }
    }
    var result=null;
    // 密码的验证
    $(".pwdCheck").on("blur",function(){
        password();
    });


    $('.gen-sureBtn').click(function() {
        result = $.html5Validate.isAllpass($('form'));
        password();
        if($('form').find('.error')[0]) {
            showMsg.call($('form').find('.error')[0]);
        }
        if(result){
            //$('form').submit();//表单提交
            $.post("/index.php/DeskAuth/Users/code", {
                name:$("#la1").val(),
                email:$("#la2").val(),
                phone:$("#la3").val(),
                person:$("#la4").val(),
                password:$("#la5").val(),
                role_name:$("#la7").val(),
                status:$("#la8").val(),
            },function(d){//ajax提交
                if(d.status == 1){
                    $("#la1").parent("div").addClass("err");
                    $("#la1").next(".err-tip").show().find("span").text("账号名称重复");
                }else{
                    window.location.href=d.msg;
                }

            }, 'json');
        }else{return false}
    });

});
