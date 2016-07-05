define(function(require, exports, module) {
    var main=require("../main");
    //var $=require("jquery");
    var editor = CKEDITOR.replace($('#ckEditor')[0]);
    var pageParam = require("PageParam");
    var opctions = pageParam.getParam();
    $(".tclist").height($(window).height()-55).css("overflow-y","auto")
    $('.gen-sureBtn').click(function () {
//        $('form').submit();
        $.post(url,{id:$('#id').val(),license:editor.getData()},function (data) {
            if(data){
                main.warningHide("handleSuccess", "操作成功！", 2000);
            }else{
                main.warningHide("handleDefault", "操作失败！", 2000)
            }
        },'json');
        
/*        $.ajax({
            type:'post',
            url:url,
            data:$('#form').serialize(),
            success: function(msg) {
                if (msg == '1') {
                    //main.warningHide("handleSuccess", "操作成功！", 2000);
                } else {
                    main.warningHide("handleSuccess", "操作失败！", 2000)
                }
            }
        });*/
        
    });

    //注册项设置跳转URL
    $(".regSet").click(function () {
        location.href = opctions.regSet;
    });
   
    $(".mainCont").height($(window).height()-99);
});
