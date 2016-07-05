define(function(require, exports, module) {
	//

	var showMsg = require('../../widgets/validate').showMsg;

    $(".select").on("click", function(e) {
        $.html5Validate.isAllpass($(this));
    });

	$('#frm').on('blur', 'input', showMsg);

	$('#frm').html5Validate(function() {
		//this.submit();
	}, {validate: function() {
	}});

	//用户信息 保存按钮
	$('.add-member-save').click(function() {
		var result = $.html5Validate.isAllpass($('#frm'));

        if ($('#userName').val().length > 15) {
            $('#userName').parent().addClass("err").find(".err-tip>span").text("姓名长度过长");
            result = false;
        }
		//修改时，如果没填密码，则不修改密码
		var pwd = $.trim($('#password').val());
		if(pwd!=''){
			if(pwd.length>20 || pwd.length<6){
				$('#password').parent().addClass("err").find(".err-tip>span").text("密码6-20个字符");
				result = false;
			}
		}

		if($('#frm').find('.error')[0]) {
			showMsg.call($('#frm').find('.error')[0]);
		}
		if(result){
			var ok = 1;
			if($('#account').val()!=''){
				$.ajax({
					type: "POST",
					async:false,
					url: "/index.php/Member/Member/checkMember?label=account&id="+mid+"&t=" + new Date().getTime(),
					data: "v="+$('#account').val(),
					success: function(d){
						if (d == 1) {
							$('#account').parent().addClass("err").find(".err-tip>span").text("用户名重复");
							ok = -1;
						}
					}
				});
			}
			if($('#mobile').val()!=''){
				$.ajax({
					type: "POST",
					async:false,
					url: "/index.php/Member/Member/checkMember?label=mobile&id="+mid+"&t=" + new Date().getTime(),
					data: "v="+$('#mobile').val(),
					success: function(d){
						if (d == 1) {
							$('#mobile').parent().addClass("err").find(".err-tip>span").text("手机号码已经注册");
							ok = -1;
						}
					}
				});
			}

			if($('#email').val()!=''){
				$.ajax({
					type: "POST",
					async:false,
					url: "/index.php/Member/Member/checkMember?label=email&id="+mid+"&t=" + new Date().getTime(),
					data: "v="+$('#email').val(),
					success: function(d){
						if (d == 1) {
							$('#email').parent().addClass("err").find(".err-tip>span").text("邮箱已经注册");
							ok = -1;
						}
					}
				});
			}
			if(ok==1){
				$.ajax({
					type:'post',
					url:'/index.php/Member/Member/doAdd',
					data:$('#frm').serialize(),
					success: function(data) {
						if(data==1){
							$('.add-member-save').unbind( "click" );
							window.close();
							window.opener.top.finder.loadData()
							window.opener.waring.warningHide("handleSuccess", "操作成功！", 2000);
						}else{
							window.close();
							window.opener.top.finder.loadData()
							window.opener.waring.warningHide("handleDefault", "操作失败,请联系管理员！", 2000);
						}
					}
				});
			}
		}
	});

	//用户信息 取消操作
	$('.add-member-delect').click(function(){
		document.getElementById('frm').reset();
	});

	//收获地址保存
	$('#frmAddress').on('blur', 'input', showMsg);

	$('#frmAddress').html5Validate(function() {
		//this.submit();
	}, {validate: function() {

	}});
   //三级联动的验证
	$(".belog-add").on("change",function(){
		if(this.value.length){
			$(this).css("marginRight","5px");
		    $(this).next(".err-tip").css("display","none");
		}else{
			$(this).next(".err-tip").css("display","inline-block");
		}
	});

	//收货地址 保存
	$('.frmAddressSave').click(function() {
		var result = $.html5Validate.isAllpass($('#frmAddress'));
		if($('#frmAddress').find('.error')[0]) {
			showMsg.call($('#frmAddress').find('.error')[0]);
		};
		if(result){
			/*if($(".add-pid").get(0).value.length && $(".add-city").get(0).value.length && $(".add-areaid").get(0).value.length){
			}else{
				$("#select-add-info").show().css("display","inline-block").find("span").text("请选择完整的地址信息");
				return false;
			};*/
			$.ajax({
				type:'post',
				url:'/index.php/Member/Member/doAdd',
				data:$('#frmAddress').serialize(),
				success: function(data) {
					if(data==1){
						$('.frmAddressSave').unbind( "click" );
						window.close();
						window.opener.top.finder.loadData();
						window.opener.waring.warningHide("handleSuccess", "操作成功！", 2000);
					}else{
						window.close();
						window.opener.top.finder.loadData();
						window.opener.waring.warningHide("handleDefault", "操作失败,请联系管理员！", 2000);
					}
				}
			});
		}
	});

	//收货地址 重置
	$('.frmAddressReset').click(function(){
		document.getElementById('frmAddress').reset();
	});
	//地址的验证
	$(".addr-textarea").on("blur",function(){
		if($(this).val() != ""){
			$(this).removeClass("err");
			$(this).removeClass("error");
			$(this).siblings(".err-tip").css("display","none")
		}else{
			$(this).addClass("err");
			$(this).addClass("error");
			$(this).siblings(".err-tip").css("display","inline-block");
		}

	});
	
});