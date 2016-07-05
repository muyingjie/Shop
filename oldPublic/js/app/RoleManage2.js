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
    box = require('../widgets/dialogs');
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
//$(".gen-sureBtn").click(function () {
//    box.closeDialog();
//})

    //
    //$(".ui-dialog-close").onclick(function(){
    //    dlog.closeDialog();
    //})

   $('.gen-sureBtn').click(function() {
        var password = $("#password").val();
        if(password){
            $.post("/index.php/DeskAuth/Users/codeadds",{password: password},function(d){//ajax提交
                if(d == 1){
                    top.finder.waring.warningHide("handleSuccess", "操作成功！", 2000);
                    parent.frames[0].location.reload();
                    box.closeDialog();
                  //  parent.window.location.reload();
                }else{
                   alert("失败！");
                }
            });
        }
    });

});
