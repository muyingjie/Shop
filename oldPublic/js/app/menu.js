/**
 * 后台导航菜单管理JS
 */
var result = false;
define(function (require, exports, module) {
   var dlog = require("../widgets/dialogs"),showMsg = require('../widgets/validate').showMsg,main=require("../main");
    //var $=require("jquery");
    //验证
    $('form').on('blur', 'input', showMsg);
    //检测导航菜单是否重复
    $('#title').on('blur', function () {
        var parent = $(this).parent();
        if($('#title').val()!=''){
            $.ajax({
                type: "POST",
                async:false,
                url: "/index.php/Menu/Index/checkMenu?id="+menuId,
                data: "v="+$('#title').val(),
                success: function(d){
                    if (d == 1) {
                        parent.addClass("err").find(".err-tip>span").text("菜单标题重复");
                    }
                }
            });
        }
    });

    $('form').html5Validate(function() {
        // this.submit();
    }, {validate: function() {
        //result = true;
        return result;
    }});

    //提交数据
    var tpl = true;//禁止重复提交
    $('.imp-sureBtn').click(function () {
        var result = $.html5Validate.isAllpass($('form'));
        if($('form').find('.error')[0]) {
            showMsg.call($('form').find('.error')[0]);
        }

        if(result){
            //获取数据
            var id = $("input[name='id']").val();
            var title = $.trim($('#title').val());
            var custom_url = $.trim($('#custom_url').val());
            var orders = $.trim($('#orders').val());
            var target_blank = $("input[name='target_blank']:checked").val();
            var is_display = $("input[name='is_display']:checked").val();
            if(tpl){
                $.post(url,{id:id,title:title,custom_url:custom_url,orders:orders,target_blank:target_blank,is_display:is_display},function (data) {
                    if(data){
                        window.opener.waring.warningHide("handleSuccess", "操作成功！", 2000);
                        self.close();
                        window.opener.top.finder.loadData();
                    }else{
                        tpl = true;
                        return false;
                    }
                },'json');
            }
            tpl = false;
        }
    });

    //匹配url
/*    $("input[name='custom_url']").blur(function(){
        if(/^http:/.test($(this).val()) || /^https:/.test($(this).val())){
                
        } else if(/\w/g.test($(this).val())){
            $(this).val("http://"+$(this).val());
        }
    });*/




});