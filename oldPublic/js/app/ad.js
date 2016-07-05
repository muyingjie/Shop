/*后台广告设置JS*/
define(function(require,exports, module) {

    var dlog = require("../widgets/dialogs"),
        //
        main =require("../main"),
        Calendar=require('jscal2'),
        showMsg = require('../widgets/validate').showMsg,
        domBegin = $(".birthday")[0],
        domEnd = $(".birthday")[1];
    
    //广告开始时间
    Calendar.setup({//日历控件
        inputField : domBegin,
        trigger    : domBegin,
        showTime: true,
        dateFormat:"%Y-%m-%d %H:%M",
        min:new Date(),
        onSelect   : function() { this.hide() },
    });
    //广告结束时间
    Calendar.setup({//日历控件
        inputField : domEnd,
        trigger    : domEnd,
        showTime: true,
        dateFormat:"%Y-%m-%d %H:%M",
        min:new Date(),
        onSelect   : function() { this.hide() },
    });

    //添加广告弹窗
    $(".add").click(function () {
        dlog.showIframe({
            title:'新增广告',
            width: 900,
            url:Url,
            callback:function (data) {
                main.warningHide("handleSuccess", "操作成功！", 2000);
                setTimeout(function () {
                    parent.window.location.reload();
                },1000);

            }
        });
    });
    
    //编辑广告弹窗
    $(".editAd").click(function () {
        dlog.showIframe({
            title:'编辑广告', 
            width: 900,
            url:$(this).attr('url'),
            callback:function (data) {
                main.warningHide("handleSuccess", "操作成功！", 2000);
                setTimeout(function () {
                    parent.window.location.reload();
                },1000);

            }
        });
    });

    //上传图片
    $('.file').click(function () {
        dlog.showIframe({
            title:'选择图片', width: 900,url:$(this).attr("url"), callback: function (ad) {
                // main.warningHide("handleDefault", "操作失败！", 2000)
                $("#image_url").val(ad.image_src);
                $("#upImg").attr('src',ad.image_src);
                $("#img_id").attr('value',ad.image_id);
                $('#image_url').siblings(".default-tip").text("");
                $(".file").css("display","inline-block").css("border","1px solid #ddd");
            }
        });
    });
    //关闭遮罩层
    $(".closeBtn").click(function () {
        dlog.closeDialog();
    });

    //验证
    $('form').on('blur', 'input', showMsg);
    //提交数据
    var tpl = true;//防止重复提交
    $('.gen-sureBtn').on('click',function () {
        // alert(1);
        var result = $.html5Validate.isAllpass($('form'));
        if($('form').find('.error')[0]) {
            showMsg.call($('form').find('.error')[0]);
        }
        
        if($('#image_url').val()==''){
            $('#image_url').siblings(".default-tip").text("图片不能为空").css("color","#f13848");
            $(".file").css("display","inline-block").css("border","1px solid #f13848");
            return false;
        }/*else {
            $('#image_url').siblings(".default-tip").text("");
            $(".file").css("display","inline-block").css("border","1px solid #ddd");
        }*/


        if(result){
            var position_id = $("input[name='pid']").val();
            var ad_id = $("input[name='id']").val();
            var ad_name = $.trim($('#ad_name').val());
            var start_time = $('#start_time').val();
            var end_time = $('#end_time').val();
            var is_display = $("input[name='is_display']:checked").val();
            var ad_code = $("*[name='ad_code']").val();
            var img_id = $("input[name='img_id']").val();
            var ad_link = $.trim($('#ad_link').val());
            var orders = $.trim($('#orders').val());

            //验证时间是否为空
            if($("input[name=start_time]").val() == ""){
                $("input[name=start_time]").siblings("div").css("display","inline-block").children("span").text("起始时间不能为空");
                $("input[name=start_time]").parent("div").addClass("err");
                return false;
            }else{
                $("input[name=start_time]").siblings("div").css("display","none");
            }

            if($("input[name=end_time]").val() == ""){
                $("input[name=end_time]").siblings("div").css("display","inline-block").children("span").text("结束时间不能为空");
                $("input[name=end_time]").parent("div").addClass("err");
                return false;
            }else{
                $("input[name=end_time]").siblings("div").css("display","none");
            }

            //验证结束时间是否大于起始时间
            if(new Date($("input[name=end_time]").val()) <= new Date($("input[name=start_time]").val())){
                $("input[name=end_time]").siblings("div").css("display","inline-block").children("span").text("结束时间不能小于起始时间");
                $("input[name=end_time]").parent("div").addClass("err");
                return false;
            }else{
                $("input[name=end_time]").siblings("div").css("display","none");
            }

            if(tpl){
                $.post(url,{ad_id:ad_id,position_id:position_id,ad_name:ad_name,start_time:start_time,end_time:end_time,is_display:is_display,ad_code:ad_code,img_id:img_id,ad_link:ad_link,orders:orders},
                    function (data) {
                        if(data == 1){
                            top.window.opener.top.finder.loadData()
                            dlog.closeDialog(1);
                        }else{
                            tpl = true;
                            main.warningHide("handleDefault", "操作失败！", 2000);
                            return false;
                        }

                },'json');
            }
            tpl = false;
        }
    });

    $(document).on("click","i.checkbox",function() {//复选框
        var that = $(this).siblings("input");
        if ($(this).hasClass("checkAll")) {
            /*全选*/
            if (!$(this).hasClass("checked")) {
                $("i.checkbox").addClass("checked");
                $("input").val("1");
            } else {
                $("i.checkbox").removeClass("checked");
                $("input").val("0");
            }
        } else {
            /*单选*/
            $(this).toggleClass("checked");
        }

        $(this).hasClass("checked") ? that.val("1") : that.val("0");//复选框给input隐藏域赋值

        /*单选与全选的联动*/
        var checkedLen = $(".tableCont").find("input[value=1]").length;
        var checkLen = $(".tableCont").find("input").length;
        checkLen == checkedLen ? $(".checkAll").addClass("checked") : $(".checkAll").removeClass("checked");
        var ids = [];
        $(".tableCont").find("input[value=1]").each(function () {
            ids.push($(this).attr("name"));
        })

    });

    //匹配url
/*    $("input[name='ad_link']").blur(function(){
        if(/^http:/.test($(this).val()) || /^https:/.test($(this).val())){

        } else if(/\w/g.test($(this).val())){
            $(this).val("http://"+$(this).val());
        }
    });*/

    //删除广告操作
    $('.delAd').on('click',function () {
        var url = $(this).attr("url");
        dlog.showConfirm({title:'提示',width:400,content:'确定要删除该广告位?',ok:function () {
            $.get(url,{},function (msg) {
                if(msg==-1){//广告未到期，无法删除
                    main.warningHide("handleDefault", "广告未到期，无法删除！", 2000);
                }else{
                    main.warningHide("handleSuccess", "操作成功！", 2000);
                    setTimeout(function () {
                        parent.location.reload();
                    },1000);
                }
            },'json');
        }});
    });

    //编辑排序
    $('.editSortCode').click(function () {
        var _this=$(this);
        if(_this.data("opra")!="save") {
            _this.data("opra", "save");
            _this.text("保存");
            $(".treetable tr").each(function () {
                $('.hidorder').remove();
                $('.p_order').show();
            })
        }else {
            _this.data("opra","edit");
            _this.text("编辑排序");
            $.ajax({
                cache: true,
                type: "POST",
                url:$('#pForm').attr('action'),
                data:$('#pForm').serialize(),// 你的formid
                //async: false,
                error: function(request) {
                    // waring.warningHide("handDefault", "操作失败", 3000);
                    main.warningHide("handleDefault", "操作失败！", 2000);
                    location.reload();
                },
                success: function(data) {
                    // waring.warningHide("handleSuccess", "操作成功", 3000);
                    main.warningHide("handleSuccess", "操作成功！", 2000);
                    location.reload();
                }
            });
        }
    });

    //刷新
    $('.refreshBtn').click(function () {
        location.reload();
    });

    //检查广告名称是否重复
    $('#ad_name').on('blur', function () {
        var parent = $(this).parent();
        if($('#ad_name').val()!=''){
            $.ajax({
                type: "POST",
                async:false,
                url: "/index.php/Ad/Ad/checkAdName?id="+AdId,
                data: "v="+$('#ad_name').val(),
                success: function(d){
                    if (d == 1) {
                        parent.addClass("err").find(".err-tip>span").text("广告名称重复");
                    }
                }
            });
        }
    });
    
    

    



});