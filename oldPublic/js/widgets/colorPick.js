/**
 * Created by lenovo on 2016/5/3.
 */
    define(function (require, exports, module) {
        
        var colpick = require("colpick");
        var defaults ={
            layout:'hex',
            submit:0,
            colorScheme:'dark',
            onChange:function(hsb,hex,rgb,el,bySetColor){
                $(el).siblings(".labelColor2").css('background','#'+hex);
                // Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
                if(!bySetColor) $(el).val('#'+hex);
            }
        };

        exports.colorPickInit = function(jqDomIpt,opert){
            var operation = $.extend(defaults,opert);
            jqDomIpt.colpick(operation).keyup(function(){
                $(this).colpickSetColor(this.value);
            });
        }
    });
