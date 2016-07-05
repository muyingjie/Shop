define(function(require, exports, module) {
    //var $=require('jquery');


    $('.select').select({onlyShow: false});

    var showMsg = require('../widgets/validate').showMsg;

    $(".select").on("click", function(e) {
        $.html5Validate.isAllpass($(this));
    });

    $('form').on('blur', 'input', showMsg);

    $('form').html5Validate(function() {
        //this.submit();
    }, {validate: function() {

    }});

    $('.newBrandBtn').click(function() {
        var result = $.html5Validate.isAllpass($('form'));
        if($('form').find('.error')[0]) {
            showMsg.call($('form').find('.error')[0]);
        }

        if(!result) {

        }
    });
    $(":input.webstation").blur(function(){
        if(/^www/g.test($(this).val())){
            $(this).val("http://"+$(this).val());
        }
    })
});
