
/**
 * Created by lenovo on 2016/5/3.
 */
define(function (require,exports,module) {
    //
    //引入dialog提示层
    var dlog = require('../widgets/dialogs');
    var showMsg = require('../widgets/validate').showMsg;
    var result = false;
    $(".select").on("click", function(e) {
        $.html5Validate.isAllpass($(this));
    });

    $('form').on('blur', 'input', showMsg);

    //$('form').html5Validate(function() {//自己的验证方式接口，不需要时可删掉
    //    this.submit();
    //}, {validate: function() {
    //    result = true;
    //    return result;
    //}});

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

   /* $('.gen-sureBtn').click(function() {
        result = $.html5Validate.isAllpass($('form'));//yes 1
        password();
        if($('form').find('.error')[0]) {
            showMsg.call($('form').find('.error')[0]);
        }
        if(result){

        }else{
            return false;
        }
    });
*/
    $('.gen-sureBtn').click(function() {
        result = $.html5Validate.isAllpass($('form'));//yes 1
        password();
        if($('form').find('.error')[0]) {
            showMsg.call($('form').find('.error')[0]);
        }
        if(result){
            $(".adduserSel").prop("disabled",false);
            var selVal = $('#adminForm').serialize();
            $(".adduserSel").prop("disabled",true);
            $.ajax({
                datatype:"json",
                type: "post",
                url:"/index.php/DeskAuth/Users/custom",
                data:selVal,// 你的formid
                async: false,
                //error: function(request) {
                //    alert("Connection error");
                //},
                success: function(data) {
                    if(data=="1"){
                        //window.top.finder.waring.warningHide("handleSuccess", "操作成功！", 2000);debugger;
                        parent.frames[0].location.reload();
                        dlog.closeDialog();
                    }else{
                        alert("失败");
                    }
                }
            });
        }else{
            return false;
        }



        });

});

