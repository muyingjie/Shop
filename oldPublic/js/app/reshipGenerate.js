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

    $('form').html5Validate(function() {//自己的验证方式接口，不需要时可删掉
        this.submit();
    }, {validate: function() {
        result = true;

        /**
         *此区域可以写自己的一些验证，比如用户名重复，省市区是否选择
         **/
        return result;
    }});

    //获取地址信息
    $.getAddress = function(doc, dom, type) {
        $.post('/index.php/Reship/Reship/getAddress', {type: type, id: doc.value}, function (info) {
            info = $.parseJSON(info);
            $('#' + dom).html('<option value="">请选择</option>');
            if (type == 2) {
                $('#county').html('<option value="">请选择</option>');
            }
            $.each(info, function (key, val) {
                $('#' + dom).append('<option value="' + val.id + '">' + val.name + '</option>');
            });
        });
    }
    //验证操作
    $('.gen-sureBtn').click(function(){
        var result = $.html5Validate.isAllpass($('form'));
        if($('form').find('.error')[0]) {
            showMsg.call($('form').find('.error')[0]);
        }
        if(result){
            //提交AJAX请求
            $.post('/index.php/Reship/Reship/generate',$('form').serialize(),function(info){
                var data = $.parseJSON(info);
                if(data.status == false){
                    alert(data.info);
                }else{
                    top.finder.waring.warningHide("handleSuccess", "操作成功！", 2000);
                    box.closeDialog();
                    //window.close();
                    //window.opener.top.finder.loadData();
                    //window.opener.waring.warningHide("handleSuccess", "操作成功！", 2000);
                }
            });
        }
    });
});
