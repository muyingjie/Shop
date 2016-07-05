/**
 * 后台站内消息 发消息JS
 */
define(function (require, exports, module) {
    var dlog = require("../widgets/dialogs"),showMsg = require('../widgets/validate').showMsg,main=require("../main");
    //var $=require("jquery");
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

    //选择会员
    $('.gen-guiBtn').click(function () {
        window.open(opctions.selectMember);
    });

    //回调
    window.getSelectData = function(data){
        if(data){
            if(data.findername=='member') {
                $('#member_id').val(data['ids'].join(','));
                getMember(data['ids'].join(','));
            }
        }
    }

    function getMember(memberIds) {
        //ajx find user name
        $.post(opctions.getMemberInfo,{memberIds:memberIds},function (data) {
            $("input[name='to_user']").val(data);
        });
        
    }


    //提交数据
    var tpl = true;//禁止重复提交
    $('.imp-sureBtn').click(function () {
        var result = $.html5Validate.isAllpass($('form'));
        if($('form').find('.error')[0]) {
            showMsg.call($('form').find('.error')[0]);
        }

        if(result){
            //获取数据
            var to_id = $("#member_id").val();
            
            var title = $("input[name='title']").val();
            var content = $.trim($("#content").val());
            if(tpl){
                $.post(opctions.url,{to_id:to_id,title:title,type:opctions.type,content:content},function (data) {
                    if(data){
                        main.warningHide("handleSuccess", "操作成功！", 2000);
                        self.location.reload();
                    }else{
                        tpl = true;
                        return false;
                    }
                },'json');
            }
            tpl = false;
        }
    });

    //刷新页面
    $('.refreshBtn').click(function () {
        window.location.reload();
    });

});
