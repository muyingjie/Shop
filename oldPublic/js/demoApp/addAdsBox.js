define(function (require) {
    
    require('../widgets/select');
    var Calendar=require('jscal2');
    var showMsg = require('../widgets/validate').showMsg;
    var domBegin = $(".birthday")[0];
    var domEnd = $(".birthday")[1];
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
    $(".select").select({onlyShow: false});//下拉
    $(".select").on('sltChange', function(event, val) {//媒介类型的切换对应
        $(this).find("input").val(val.value);
        if($(this).attr("mediumSelect")){
            if(val.text != "图片") {
                $(".switchover").css("display","none");
            }else{
                $(".switchover").css("display","block");
            }
        }
    });
    var result = false;
    $(".select").on("click", function(e) {
        $.html5Validate.isAllpass($(this));
    });

    $('form').on('blur', 'input', showMsg);

    $('form').html5Validate(function() {
        this.submit();
    }, {validate: function() {
        result = true;
        $.ajax({
            type: "POST",
            async:false,
            url: sh,
            data: "v="+$('#guanggao').val(),
            success: function(d){
                if (d == 1) {
                    $('#mobile').parent().addClass("err").find(".err-tip>span").text("广告名重复");
                    result = false;
                }
            }
        });
        return result;
    }});
    $(".boxSave").click(function () {
        var result = $.html5Validate.isAllpass($('form'));

        if($('form').find('.error')[0]) {
            showMsg.call($('form').find('.error')[0]);
        }
        if(result) {
            $('form').submit();
        }
    })
});