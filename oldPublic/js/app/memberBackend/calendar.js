define(function(require, exports, module) {
	//var $=require('jquery');
	 var Calendar=require('jscal2');
	   Calendar.setup({
           //showTime:true,
           //dateFormat : "%Y-%m-%d %H:%M",
        inputField : "birthday",
        trigger    : "birthday",
        max: new Date(),
        onSelect   : function() { this.hide() },
    });

});