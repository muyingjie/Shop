/**
 * Created on 2016/6/6
 */
//调用
define(function(require){
	
    //
    var waring= require("../main");
    $(".tclist").height($(window).height()-55).css("overflow","auto");
    //表单验证
    $('.gen-sureBtn').click(function () {
        var result = $("#codesetform").serialize();
        if(result){
            var code_type     = $("input[name='code_type']:checked").val();
            var show_code     = $("input[name='show_code']:checked").val(); 
            var verify_gap    = $('#verify_gap').val();  
            if(isNaN(verify_gap)){
                alert("间隔时间请填写一个数字!");
            	result = true;
                return false;
            }else{
            	if(verify_gap<0){
            		alert("请填写一个大于0的数字！");
                	result = true;
                    return false;
            	}
            }
            $.post(url,{code_type:code_type,show_code:show_code,verify_gap:verify_gap},function (data) {
                if(data){
                	waring.warningHide("handleSuccess", "操作成功！", 2000);
                }else {
                	alert('保存失败');
                	result = true;
                    return false;
                }
            },'json');  
        }
    });
    

})