define(function(require) {
    var main = require("../../main"), dlog=require("../../widgets/dialogs");
    //var $=require("jquery");
    $(".Tab-li").on("click", function () {
        $(this).siblings().removeClass("Tab-li-select");
        $(this).addClass("Tab-li-select");
        var _index = $(this).index();
        $(".tabs-infor1").eq(_index).show().siblings(".tabs-infor1").hide();
        main.listInit();
    });

    //订单备注
    $('#orderMemo').click(function(){
        var memo = $.trim($('#memo').val());
        if(memo==''){
            alert('请填写订单备注');
            return;
        }
        $.ajax({
                type:'post',
                url:'/index.php/Order/Order/addMemo',
                data:{order_id:$('input[name=order_id]').val(),label_id:$('input[type=radio]:checked').val(),memo:memo},
                success: function(data) {
                    if(data==1){
                        var url = location.href;
                        url = url + '&go=3';
                        location.href = url;
                        location.href = url;
                    }else{
                        alert('添加失败');
                    }
                }
            }
        );
    })

    //订单留言
    $('#messageToCustom').click(function(){
        dlog.showIframe({title:"给客户留言",width:450,url:url,data:{},callback:function(oldurl){location.href=oldurl;}});
    });

    //订单留言保存
    $('.boxSave').click(function(){
        $.ajax({
                type:'post',
                url:url,
                data:{'label':1,'id':$('#id').val(),title:$('#title').val(),msg:$('#msg').val()},
                success: function(data) {
                    if(data==1){
                        alert('添加成功');
                        var oldurl = parent.window.location.href;
                        oldurl = oldurl + '&go=4';
                        dlog.closeDialog(oldurl);
                    }else{
                        alert('添加失败');
                    }
                }
            }
        );
    })


    $(".closeBtn").click(function(){
        dlog.closeDialog();
    })

    $(function(){
        if(go !=''){
            $(".Tab-li").eq(go).click();
        }
    })

})