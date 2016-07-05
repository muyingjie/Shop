/**
 * Created by Administrator on 2016/5/18.
 */
//调用
define(function(require){
    //var $=require("jquery");
    var waring = require("../../main");
    $(".tclist").height($(window).height()-55).css("overflow","auto");
    $('#save').click(function(){
        var url = $(this).attr('url');
        var data = $("#commentform").serialize();
        var d = $.post(url,data);
        if(d) {
            waring.warningHide("handleSuccess", "操作成功！", 2000);
        }
    });
})