/**
 * Created by Administrator on 2016/5/18.
 */
//调用
define(function(require){

    var dlog=require("../widgets/dialogs");
    //var $=require("jquery");

    dlog.frameSize = {
        L: {
            width: 750,
        },
        M: {
            width: 600
        },
        S: {
            width: 500
        }
    }
    function closeDlog() {
        dlog.frameClose();
    }
    var callback = function(){
        closeDlog();
    }

    $(".alertBtn").click(function(){
        dlog.showAlert({title:"提示",width:500,content:"这是alert内容"})
    })

    $(".confirmBtn").click(function(){
        dlog.showConfirm({title:"提示",width:500,content:"这是confirm内容"})
    })

    $(".iframeBtn").click(function(){
        var url=$(this).attr("url")
        var size=$(this).attr("size")
        var title=$(this).attr("title")
        dlog.showIframe({title:title,width:dlog.frameSize[size].width,url:url})
    })

    $(".closeBtn").click(function(){

        //top.dialog.get(window).close(
        dlog.frameClose();
    })
    $(".saveBtn").click(function(){
        dlog.showConfirm({title:"问题关还是不关",width:500,content:"这是confirm内容",callback:callback});
    })

    $(".windowOpenBtn").click(function(){
        var url=$(this).attr("url");
        var width=$(this).attr("width");
        var height=$(this).attr("height");
        window.open(url, '', 'height='+height+', width='+width+', top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
    })

    //刷新列表方法

    //批量删除方法

})
