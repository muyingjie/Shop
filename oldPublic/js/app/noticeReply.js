/*后台站内消息JS*/
define(function (require, exports, module) {
    var dlog = require("../widgets/dialogs"),showMsg = require('../widgets/validate').showMsg,main=require("../main");
    var $=require("jquery");
    var pageParam = require("PageParam");
    var opctions = pageParam.getParam();

    //验证
    $('form').on('blur', 'input', showMsg);

    //发件箱
    $('.outbox').click(function () {
        location.href = opctions.urlOutbox;
    });
    //收件箱
    $('.inbox').click(function () {
        location.href = opctions.urlInbox;
    });
    
    //提交数据
    var tpl = true;//禁止重复提交
    $('.boxSave').click(function () {
        var result = $.html5Validate.isAllpass($('form'));
        if($('form').find('.error')[0]) {
            showMsg.call($('form').find('.error')[0]);
        }

        if(result){
            //获取数据
            var to_user = $("input[name='to_user']").val();
            var to_id = $("input[name='to_id']").val();
            var title = $("input[name='title']").val();
            var msg_id = $("input[name='msg_id']").val();
            var content = $.trim($("#content").val());

            if(tpl){
                $.post(opctions.url,{msg_id:msg_id,to_user:to_user,to_id:to_id,title:title,type:opctions.type,content:content},function (data) {
                    if(data){
                        dlog.closeDialog();
                        main.warningHide("handleSuccess", "操作成功！", 2000);
                    }else{
                        tpl = true;
                        main.warningHide("handleSuccess", "操作成功！", 2000);
                        return false;
                    }
                },'json');
            }
            tpl = false;
        }
    });
    
});