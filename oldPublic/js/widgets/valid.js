/**
 * Created by lenovo on 2016/6/24.
 */
define(function (require, exports, module) {
    function valid(options) {
        var opt = {
            dom:$("input"),
            def: function () {
            },
            success: function () {
            }
        };
        var opt=$.extend({},options);
        var _this = opt.dom;
        var eq = true;
        var reg = new RegExp(_this.attr("pattern"));
        if(!reg.test(_this.val())){
            _this.val("");
            _this.focus()
            var eq = false;
            opt.def();
        }else{
            var eq = true;
            opt.success();
        }
        this.status = function () {
            return eq;
        }
    }
    module.exports={
        valid: function (opt) {
            return new valid(opt);
        }
    }
})
