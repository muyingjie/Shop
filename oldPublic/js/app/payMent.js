/**
 * Created by lenovo on 2016/5/12.
 */
define(function(require, exports, module) {
    //var $=require('jquery');
    require('../widgets/select');
    var main = require("../main");
    var dlog = require('../widgets/dialogs');

    $(".select").select({onlyShow:false});//调用下拉选择

    $("#type_sub").click(function(){

        var order_no = $("#order_no").val();
        var order_time = $("#order_time").val();
        var order_sum = $("#order_sum").val();
        var charged_count = $("#charged_count").val();

        var charged_user = $("#charged_user").val();
        var is_invoice = $("#is_invoice").val();
        var invoice_type = $("#invoice_type").val();
        var invoice_title = $("#invoice_title").val();
        var remark = $("#remark").val();
        var payment_type = $('input[name="payment_type"]:checked').val();

        var charged_bank = $("#charged_bank").val();
        var charged_account = $("#charged_account").val();
        var charged_sum = $("#charged_sum").val();
        var payment_account = $("#payment_account").val();
        var payment_way = $("#payment_way").val();
        if(charged_bank == ''){
            alert("请填写收款方式");
            return false;
        }
        if(charged_account == ''){
            alert("请填写收款账号");
            return false;
        }
        if(charged_sum == ''){
            alert("请填写收款金额");
            return false;
        }
        if(payment_way == ''){
            alert("请填写付款方式");
            return false;
        }
        if(payment_account == ''){
            alert("请填写付款账号");
            return false;
        }
        $.ajax({
            type: "get",
            url: "/index.php/Payment/index/addPayment",
            //data:$('#frm').serialize(),
            data: 'charged_bank='+charged_bank+'&charged_account='+charged_account+'&charged_sum='+charged_sum
            +'&payment_way='+payment_way+'&payment_type='+payment_type+'&remark='+remark
            +'&invoice_title='+invoice_title+'&invoice_type='+invoice_type+'&is_invoice='+is_invoice
            +'&charged_user='+charged_user+'&charged_count='+charged_count+'&order_sum='+order_sum
            +'&order_time='+order_time+'&order_no='+order_no,
            success: function(msg) {
                alert(msg);
                top.finder.loadData();
                dlog.closeDialog();
            }
        });
//                $("#Form_sub").submit();
//                alert('操作成功!'); top.finder.loadData(); dlog.closeDialog();
    });
});