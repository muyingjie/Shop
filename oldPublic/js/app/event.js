/**
 * Created by qiguozheng on 2016/5/18.
 */

/*
    扫描页面指定范围内所有自定义事件，绑定处理事件和函数，将参数传给处理函数
 */


//调用
define(function(require, exports, module) {

    //引入依赖
    //
    var waring = window.waring = require("../main");


    //创建uid
    var createUID = function() {
        var n = ~~(Math.random() * 10000000);
        return function() {
            return 'L' + n++;
        }
    }();

    //解析参数
    function getParam(elem) {
        var sCustom = $(elem).attr("data-custom");
        var oCustom = null;
        if (sCustom) {
            try {
                oCustom = $.parseJSON(sCustom);
            } catch (e) {
                throw new Error('JSON解析异常');
            }
        }
        return oCustom;
    }

    //判断是否有选中
    function isChecked(arg) {
        var checkId = top.finder.getCheckedRowIds();
        if (arg && arg.required && checkId.length === 0) {
            waring.warningHide("handleDefault", "请选择数据！", 2000);
            return false;
        };
        return true;
    };


    //自定义模块存储
    var modules = {};

    //需要处理的指令范围
    var $scanScope = $('[scanScope]');


    //添加处理模块
    function addModule(name, callback, event) {
        event = event || 'click';
        if (!modules[event]) {
            modules[event] = {}
        };
        modules[event][name] = callback;
    };

    // 绑定事件
    function init() {
        $.each(modules, function(event) {
            $scanScope.on(event, '[data-' + event + ']', function(e) {
                var $this = $(this);
                var sMethod = $(this).attr('data-' + event);
                var sUID = createUID();
                //给元素添加UID
                if (!$this.attr('UID')) {
                    $this.attr('UID', sUID);
                }
                //如果找到处理函数就绑定处理函数
                if (Object.prototype.toString.call(modules[event][sMethod]) == '[object Function]') {
                    var oParam = getParam(this);
                    if (isChecked(oParam)) {
                        modules[event][sMethod].call(this, oParam, sUID, e);
                        //阻止冒泡
                        e.stopPropagation();
                    }
                } else {
                    throw new Error('未指定事件处理函数');
                }
            })
        });

    };

    exports.addModule = addModule;
    exports.init = init;


})