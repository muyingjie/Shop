/*后台广告位JS*/
var result = false;
define(function (require) {
    //
    require('../widgets/select');
    var Calendar=require('jscal2');
    var showMsg = require('../widgets/validate').showMsg;
    var domBegin = $(".birthday")[0];
    var domEnd = $(".birthday")[1];
    var main = require('../main');
    Calendar.setup({//日历控件
        inputField : domBegin,
        trigger    : domBegin,
        showTime: true,
        dateFormat:"%Y-%m-%d %H:%M",
        onSelect   : function() { this.hide() },
    });

    Calendar.setup({//日历控件
        inputField : domEnd,
        trigger    : domEnd,
        showTime: true,
        dateFormat:"%Y-%m-%d %H:%M",
        onSelect   : function() { this.hide() },
    });
    if($("#media_type").val() != 0) $(".switchover").css("display","none");

    $(".select:eq(0)").select({onlyShow: false});//下拉

    $(".select:eq(0)").on('sltChange', function(event, val) {//媒介类型的切换对应
        $(this).find("input").val(val.value);
        if($(this).attr("mediumSelect")){
            if(val.text != "图片") {
                $(".switchover").css("display","none");
            }else{
                $(".switchover").css("display","block");
            }
        }
    });
    $(".select:eq(1)").select({onlyShow: false});
    $(".select:eq(1)").on('sltChange', function(event, val) {//媒介类型的切换对应
        $(this).find("input").val(val.value);
    });
    

    // var result = false;
    $(".select").on("click", function(e) {
        $.html5Validate.isAllpass($(this));
    });

    $('form').on('blur', 'input', showMsg);

    //检测广告位名称是否重复
    $('#position_name').on('blur',function () {
        var parent = $(this).parent();
        if($('#position_name').val()!=''){
            $.ajax({
                type: "POST",
                async:false,
                url: "/index.php/Ad/Index/checkPositionName?id="+positionId,
                data: "v="+$('#position_name').val(),
                success: function(d){
                    if (d == 1) {
                        parent.addClass("err").find(".err-tip>span").text("广告位名称重复");
                    }
                }
            });
        }
    });

    $('form').html5Validate(function() {
        // this.submit();
    }, {validate: function() {
        return result;
    }});
    
    var tpl = true;
    $(".imp-sureBtn").click(function () {
        var result = $.html5Validate.isAllpass($('form'));
        if($('form').find('.error')[0]) {
            showMsg.call($('form').find('.error')[0]);
        }
        if(result) {
            var position_name = $.trim($('#position_name').val());
            var ad_width = $.trim($('#ad_width').val());
            var ad_height = $.trim($('#ad_height').val());
            var media_type = $("#media_type").val();
            var effect = $('#effect').val();
            var is_auto = $("input[name='is_auto']:checked").val();
            var is_display = $("input[name='is_display']:checked").val();
            var position_desc = $('#position_desc').val();
            if(tpl){
                $.post(url,{position_id:positionId,position_name:position_name,ad_width:ad_width,ad_height:ad_height,media_type:media_type,effect:effect,is_auto:is_auto,is_display:is_display,position_desc:position_desc},function (data) {
                    if(data==1){
                        window.opener.waring.warningHide("handleSuccess", "操作成功！", 2000);
                        self.close();
                        window.opener.top.finder.loadData()
                    }else {
                        main.warningHide("handleDefault", "操作失败！", 2000);
                        tpl = true;
                        return false;
                    }
                },'json');  
            }
            tpl = false;
        }
    });
});