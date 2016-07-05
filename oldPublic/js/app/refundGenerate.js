/**
 * Created by lenovo on 2016/5/3.
 */
define(function (require,exports,module) {
    //
    var box = require('../widgets/dialogs');
    var showMsg = require('../widgets/validate').showMsg;

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

    $('.gen-sureBtn').click(function(){
        $.post($('form').attr('action'),$('form').serialize(),function(info){
            var data = $.parseJSON(info);
            if(data.status){
                top.finder.waring.warningHide("handleSuccess", "操作成功！", 2000);
                box.closeDialog();
            }else{
                alert(data.info);
            }
        });
    });
});