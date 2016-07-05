/**
 * Created by Administrator on 2016/6/2.
 */
//调用
define(function(require){
	//
	var main= require("../main");
	$(".tclist").height($(window).height()-55).css("overflow","auto");
    $('.gen-sureBtn').click(function () {
        var result = $("#storeRulesform").serialize();
        
    	var money_format      = $('#money_format').val();  
        if(money_format.indexOf('%s')>='0'){
        	$('#money_format').parent().removeClass("err").find(".err-tip>span").text("");
        	result = true;
        }else{
        	$('#money_format').parent().addClass("err").find(".err-tip>span").text("内容请包含%s");
        	result = false;
        	 return false;
        }        
        if(result){             
            var time_format       = $('#time_format option:selected').val();           
            var money_format      = $('#money_format').val();   
            var invoice_on        = $("input[name='invoice_on']:checked").val();
            var iscancel         = $("input[name='iscancel']:checked").val(); 
            var iscancel_time     = $('#iscancel_time').val();
            var cut_stock         = $('input:radio[name="cut_stock"]:checked').val();
            var autoComplete      = $('input:radio[name="autoComplete"]:checked').val();
            var autoComplete_time = $('#autoComplete_time').val(); 
            var decimals          = $('input:radio[name="decimals"]:checked').val();
            var carry_type        = $('input:radio[name="carry_type"]:checked').val();
            var operator          = $('#operator option:selected').val();  
            var operator_value    = $('#operator_value').val(); 
            var direct_buy        = $('input:radio[name="direct_buy"]:checked').val();

            $.post(url,{time_format:time_format,money_format:money_format,invoice_on:invoice_on,iscancel:iscancel,
            	       iscancel_time:iscancel_time,cut_stock:cut_stock,autoComplete:autoComplete,autoComplete_time:autoComplete_time,
            	       decimals:decimals,carry_type:carry_type,operator:operator,operator_value:operator_value,direct_buy:direct_buy},function (data) {
                if(data){
                    main.warningHide("handleSuccess", "操作成功！", 2000);	
                }else {
                	alert('保存失败');
                    tpl = true;
                    return false;
                }
            },'json');  

        }
    });
    
})