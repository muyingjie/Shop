$(function(){
    //获取窗口可视范围的高度
    function getClientHeight(){
        var clientHeight=0;
        if(document.body.clientHeight&&document.documentElement.clientHeight){
            var clientHeight=(document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
        }else{
            var clientHeight=(document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
        }
        return clientHeight;
    }
    //获取窗口滚动条高度
    function getScrollTop(){
        var scrollTop=0;
        if(document.documentElement&&document.documentElement.scrollTop){
            scrollTop=document.documentElement.scrollTop;
        }else if(document.body){
            scrollTop=document.body.scrollTop;
        }
        return scrollTop;
    }
    //文档内容实际高度
    function getScrollHeight(){
        return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
    }

    //设置iframe高度
    function setIfrHeight(ele){
        var scrollHeight = getScrollHeight();
        var topIfrHeight = $(".head").height();
        var ifrHeight = scrollHeight - topIfrHeight;
        $(ele).height(ifrHeight);
    }
    setIfrHeight("#navTree");
    setIfrHeight("#content");

});