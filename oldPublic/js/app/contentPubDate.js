define(function(require, exports, module) {
	//var $=require('jquery');
	 var Calendar=require('jscal2');
	   Calendar.setup({
           //showTime:true,
           //dateFormat : "%Y-%m-%d %H:%M",
        inputField : "birthday",
        trigger    : "birthday",
        onSelect   : function() { this.hide() },
    });

    var editor = CKEDITOR.replace($('#ckEditor')[0]);
    seajs.use(['jquery','../widgets/select'], function($){
        $('#cate_class').select({onlyShow: false,});
    });

});