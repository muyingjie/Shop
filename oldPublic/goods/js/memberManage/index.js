//iframe在ie中完全显示
$(function(){
    function iframeResize(iframe) {
        try {
            //var iframe = document.getElementById("navTree"); //("contentFrame");
            var idocumentElement = iframe.contentWindow.document.documentElement;
            if (idocumentElement.scrollHeight > 560) {
                iframe.height -= 5;
                iframe.height = idocumentElement.scrollHeight;
            }
            else {
                iframe.height = 560;
            }
        }
        catch (e) {
            window.status = 'Error: ' + e.number + '; ' + e.description;
        }
    }
});
/*iframe中右侧内容区的宽度*/
$(function () {
    var _width = $(window).width();
    var _contentW = _width - 180;
    $(".content").css("width", _contentW);
});



