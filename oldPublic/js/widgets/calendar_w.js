define(function (require, exports, module) {
    
    var Calendar=require('jscal2');

    var defaults={
         onSelect   : function() { this.hide(); }
    };

    exports.calendarInit=function(arg){
        var options=$.extend(defaults,arg);
        Calendar.setup(options);
    };

});
