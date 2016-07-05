define(function(require,exports) {
    //var $=require('jquery');

    $('.gen-sureBtn').click(function(){
        var url = $('form').attr('action');
        $.post(url,$('form').serialize(),function(info){
            var data = $.parseJSON(info);
            if(data.status){
                //window.opener.location.reload();
                window.close();
                window.opener.top.finder.loadData();
                window.opener.waring.warningHide("handleSuccess", "更新成功！", 2000);
            }
        });
    });
})