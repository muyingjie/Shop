define(function (require, exports, module) {
    
    require('validate');

    $('.select').filter(':not(.belong-address)').each(function(i, dom) {
        if(!$(this).next().is('.err-tip')) {
            $(this).after('<div class="err-tip" style="display: inline-block;"><i></i><span></span></div>');
        }
    });

    exports.showMsg = function() {
        var isPass = $.html5Validate.isAllpass($(this));
        
        if(!$(this).is(':submit')) {
            $(this).parent().addClass('err');
            $(this).parent().find('.default-tip').hide();
            $(this).parent().find('.err-tip span').text($('#validateRemind').text());
            $(this).parent().find('.err-tip').css('display', 'inline-block');
            //$(this).parent().addClass('err').end().next().hide().next().find('span').text($('#validateRemind').text()).end().css('display', 'inline-block');
            if(isPass) {
                $(this).parent().removeClass('err');
            }
        } else {
            $(this).closest('form').find('.error').eq(0).blur().focus();
            $(this).closest('form').on('mouseup', function() {
                $('#validateRemind').hide();
            });
        }
        $(this).closest('form').find('.error').eq(0).click();
        $('#validateRemind').hide();
        var timer = setInterval(function() {
            if($('#validateRemind').is(':visible')) {
               $('#validateRemind').hide(); 
            }
        }, 0);

        if($.html5Validate.isAllpass($(this).closest('form').find('.error').eq(0))) {
            clearInterval(timer);
            timer = null;
        }
    };
});
