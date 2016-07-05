$(function(){
    //��ȡ���ڿ��ӷ�Χ�ĸ߶�
    function getClientHeight(){
        var clientHeight=0;
        if(document.body.clientHeight&&document.documentElement.clientHeight){
            var clientHeight=(document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
        }else{
            var clientHeight=(document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
        }
        return clientHeight;
    }
    //��ȡ���ڹ������߶�
    function getScrollTop(){
        var scrollTop=0;
        if(document.documentElement&&document.documentElement.scrollTop){
            scrollTop=document.documentElement.scrollTop;
        }else if(document.body){
            scrollTop=document.body.scrollTop;
        }
        return scrollTop;
    }
    //�ĵ�����ʵ�ʸ߶�
    function getScrollHeight(){
        return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
    }

    //����iframe�߶�
    function setIfrHeight(ele){
        var scrollHeight = getScrollHeight();
        var topIfrHeight = $(".head").height();
        var ifrHeight = scrollHeight - topIfrHeight;
        $(ele).height(ifrHeight);
    }
    setIfrHeight("#navTree");
    setIfrHeight("#content");

});