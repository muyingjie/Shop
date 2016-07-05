define(function(require) {
    var main = require("../../main"), dlog=require("../../widgets/dialogs");
    //var $=require("jquery");
    //添加广告弹窗
    $(".add").click(function () {
        dlog.showIframe({
            title:'新增广告',
            width: 900,
            url:Url,
            callback:function (data) {
                main.warningHide("handleSuccess", "操作成功！", 2000);
                setTimeout(function () {
                    parent.window.location.reload();
                },1000);

            }
        });
    });

    //订单备注
    var tpl = true;//防止重复提交
    $('#orderMemo').click(function(){
        var memo = $.trim($('#memo').val());
        if(memo==''){
            alert('请填写订单备注');
            return;
        }
        if(tpl){
            $.ajax({
                    type:'post',
                    url:'/index.php/Order/Order/addMemo',
                    data:{order_id:$('input[name=order_id]').val(),label_id:$('input[type=radio]:checked').val(),memo:memo},
                    success: function(data) {
                        if(data==1){
                            alert('备注成功!');
                            top.finder.loadData();
                            dlog.closeDialog();
                        }else{
                            alert('备注失败');
                        }
                    }
                }
            );
        }
        tpl = false;
    })

})