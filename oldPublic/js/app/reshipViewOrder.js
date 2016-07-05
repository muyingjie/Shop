/**
 * Created by lenovo on 2016/5/16.
 */
define(function (require,exports,module) {
    //
    //改变订单状态值,并提交
    $.changeOrderStatusInput = function(doc){
        $('#order_status').val($(doc).attr('value'));
        $('form').submit();
    }
});