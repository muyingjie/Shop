define(function (require, exports, module) {
    var dlog = require("../widgets/dialogs"),main =require("../main");
    //var $=require("jquery");
    require('../widgets/select');
    //下拉
    $(".select").select({onlyShow: false});
    //时间插件
    var Calendar=require('jscal2');
    var time = $(".birthday")[0];
    Calendar.setup({//日历控件
        inputField : time,
        trigger    : time,
        showTime: true,
        dateFormat:"%Y-%m-%d %H:%M",
        min:new Date(),
        onSelect   : function() { this.hide() },
     });
    //表单验证
    var showMsg = require('../widgets/validate').showMsg;
    $(".select").on("click", function(e) {
        $.html5Validate.isAllpass($(this));
    });
    $('form').on('blur', 'input', showMsg);

    var tpl = true;
    $('.imp-sureBtn').click(function () {
        var result = $.html5Validate.isAllpass($('form'));
        
        if($('form').find('.error')[0]) {
            showMsg.call($('form').find('.error')[0]);
        }
        if(editor.getData() == ''){

            $(".msgError").show().find("span").text("内容不能为空!");
            window.setTimeout(function () {
                $(".msgError").fadeOut(1000);
            },2000);
            result = false;
            /*main.warningHide("handleDefault", "内容不能为空！", 2000);*/
        }else {
            $(".msgError").hide();
        }
        
        if(result){
            var title = $('#title').val();
            var category_id = $('#category_id').val();
            var author = $('#author').val();
            var image_url = $('#image_url').val();
            var img_id = $("input[name='img_id']").val();
            var pubtime = $('#pubtime').val();
            var ifpub = $("input[name='ifpub']:checked").val();
            var seo_title = $('#seo_title').val();
            var seo_keywords = $('#seo_keywords').val();
            var seo_description = $('#seo_description').val();
            var content = editor.getData();
            if(tpl){
                $.post(url,{article_id:articleId,title:title,category_id:category_id,author:author,pubtime:pubtime,ifpub:ifpub,seo_title:seo_title,seo_keywords:seo_keywords,seo_description:seo_description,content:content,image_url:image_url,img_id:img_id},function (data) {
                    if(data){
                        window.opener.waring.warningHide("handleSuccess", "操作成功！", 2000);
                        self.close();
                        window.opener.top.finder.loadData();
                    }else {
                        tpl = true;
                        return false;
                    }
                },'json');  
            }
            tpl = false;
        }
    });
    
    //取消按钮
    $('.imp-cancelBtn').click(function () {
        window.close();
    });
    
    //上传图片
    $('.file').click(function () {
        dlog.showIframe({
            title:'选择图片', width: 600,url:$(this).attr("url"), callback: function (ad) {
                $("#image_url").val(ad.image_src);
                $("#upImg").attr('src',ad.image_src);
                $("#img_id").attr('value',ad.image_id);
                $('.uploaderImg').append('<i class="deleteIcon article-del-icon"></i>');
            }
        });
    });

    //删除图片
    $(".uploaderImg").on("click",".deleteIcon", function () {
        $('#upImg').attr('src','/Public/images/default_image.jpg');
        $('.deleteIcon').remove();
        $('#image_url').val('');
        $('#img_id').val('');
    });

    //验证title是否重复
    $('#title').on('blur', function () {
        var parent = $(this).parent();
        if($('#title').val()!=''){
            $.ajax({
                type: "POST",
                async:false,
                url: "/index.php/Content/Article/checkTitle?id="+articleId,
                data: "v="+$('#title').val(),
                success: function(d){
                    if (d == 1) {
                        parent.addClass("err").find(".err-tip>span").text("资讯标题重复");
                    }
                }
            });
        }
    });

});