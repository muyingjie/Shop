/**
 * Created by lenovo on 2016/5/3.
 */
define(function (require,exports,module) {
    //
    //监听保存按钮点击事件
    $('.gen-sureBtn').click(function(){
        //获取Input值
        var dom = $(this).parent().parent().parent();
        var id = dom.find('input').val();
        var app_id = dom.find('ul>li:first-child>div>input').val();
        var app_key = dom.find('ul>li:last-child>div>input').val();
        //获取Input值并提交
        $.post('/index.php/Auth/Index/change',{id:id,key:app_id,secret:app_key},function(info){
            var data = $.parseJSON(info);
            if(data.status){
                warningHide("handleSuccess", data.info, 2000);
            }else{
                warningHide("handleDefault", data.info, 2000);
            }
        });
    });
    //AJAX提示
    function warningHide(classname, txt, delay) {
        $(".handleWarning").attr("class", "handleWarning " + classname).text(txt).show()
        if (classname != "handleLoad") {
            setTimeout(function () {
                $(".handleWarning").fadeOut()
            }, delay)
        }
    }
});
