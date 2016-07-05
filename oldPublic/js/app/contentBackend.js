var result = false;
define(function (require) {
    //
    require('../widgets/select');
    
    $(".select").select({onlyShow: false});//下拉
    //刷新
    $(".refreshBtn").click(function(){
        window.location.href=window.location.href;
    })
    //表单验证
    var showMsg = require('../widgets/validate').showMsg;

    //下拉选项
    $(".select").on("click", function(e) {
        $.html5Validate.isAllpass($(this));
    });

    $('form').on('blur', 'input', showMsg);
    
    //是否使用单独页
    if($("input[name='homepage']:checked").val()==0){
        $('#onlyPage').css('display','none');
    }
    $('#isOnlyPage :radio').change(function () {
        var val = $("input[name='homepage']:checked").val();
        if(val == 0){
            $('#onlyPage').css('display','none');
        }
        if(val == 1){
            $('#onlyPage').css('display','block');
        }
    });

    $('form').html5Validate(function () {
        // $('form').submit();
    },{validate:function () {
        // result = true;
        return result;
    }});

    //保存按钮
    var tpl = true;
    $(".imp-sureBtn").click(function () {
        var result = $.html5Validate.isAllpass($('form'));

        if($('form').find('.error')[0]) {
            showMsg.call($('form').find('.error')[0]);
        }
        if(result) {
            // $('form').submit();
            var parent_id = $('#parent_id').val();
            var category_name = $.trim($('#category_name').val());
            var ifpub = $("input[name='ifpub']:checked").val();
            var ordernum = $('#ordernum').val();
            var category_pagename = $.trim($('#category_pagename').val());
            var seo_title = $.trim($('#seo_title').val());
            var seo_keywords = $.trim($('#seo_keywords').val());
            var seo_description = $.trim($('#seo_description').val());
            var homepage = $("input[name='homepage']:checked").val();
            var content = editor.getData();
            if(tpl){
                $.post(url,{id:cateID,parent_id:parent_id,category_name:category_name,ifpub:ifpub,ordernum:ordernum,category_pagename:category_pagename,seo_title:seo_title,seo_keywords:seo_keywords,seo_description:seo_description,homepage:homepage,homepage:homepage,content:content},
                    function (data) {
                        if(data){
                            window.opener.document.location.reload();
                            window.close();
                        }else{
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

    //验证分类名称是否重复
    $('#category_name').on('blur', function () {
        var parent = $(this).parent();
        if($('#category_name').val()!=''){
            $.ajax({
                type: "POST",
                async:false,
                url: "/index.php/Content/Cate/checkCate?id="+cateID,
                data: "v="+$('#category_name').val(),
                success: function(d){
                    if (d == 1) {
                        parent.addClass("err").find(".err-tip>span").text("分类名称重复");
                    }
                }
            });
        }
    });
    
});