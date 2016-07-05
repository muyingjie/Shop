	var result = false;
	define(function(require, exports, module) {
	//var $=require('jquery');
	var dlog = require("../widgets/dialogs");
	var showMsg = require('../widgets/validate').showMsg;

    $(".select").on("click", function(e) {
        $.html5Validate.isAllpass($(this));
    });

    $('form').on('blur', 'input', showMsg);

	$('#link_name').on('blur', function () {
		var parent = $(this).parent();
		if($('#link_name').val()!=''){
			$.ajax({
				type: "POST",
				async:false,
				url: "/index.php/Link/Index/checkLink?id="+linkId,
				data: "v="+$('#link_name').val(),
				success: function(d){
					if (d == 1) {
						parent.addClass("err").find(".err-tip>span").text("链接名称重复");
					}
				}
			});
		}
	});


	$('form').html5Validate(function() {
		// this.submit();
	}, {validate: function() {
		//result = true;
		 return result;
	}});

	//上传图片
	$('.file').click(function () {
		dlog.showIframe({
			title:'选择图片', width: 600,url:$(this).attr("url"), callback: function (ad) {
				$("#image_url").val(ad.image_src);
               	$("#upImg").attr('src',ad.image_src);
				$("#img_id").attr('value',ad.image_id);
			}
		});
	});

	var tpl = true;
		
	$('.imp-sureBtn').click(function() {
		var result = $.html5Validate.isAllpass($('form'));
		if($('form').find('.error')[0]) {
			showMsg.call($('form').find('.error')[0]);
		}
		if(result){
			if($('#link_name').val()!=''){
				$.ajax({
					type: "POST",
					async:false,
					url: "/index.php/Link/Index/checkLink?id="+linkId,
					data: "v="+$('#link_name').val(),
					success: function(d){
						if (d == 1) {
							$('#link_name').parent().addClass("err").find(".err-tip>span").text("链接名称重复");
							return;
						}else{
							var link_name = $('#link_name').val();
							link_name = $.trim(link_name);
							var href = $('#href').val();
							href = $.trim(href);
							var image_url = $('#image_url').val();
							var img_id = $("input[name='img_id']").val();
							image_url = $.trim(image_url);
							var sort = $('#sort').val();
							sort = $.trim(sort);
							var is_display = $('input:radio:checked').val();
							var addLink = urlAdd;
							var rootUrl = url;
							var id = linkId;
							if(tpl){
								$.post(addLink,{id:id,link_name:link_name,href:href,image_url:image_url,img_id:img_id,sort:sort,is_display:is_display},function (data) {
									if(data){
										window.opener.waring.warningHide("handleSuccess", "操作成功！", 2000);
										self.close();
										window.opener.top.finder.loadData();
									}else{
										window.opener.waring.warningHide("handleDefault", "操作失败！", 2000);
										tpl = true;
										return false;
									}
								},'json');
							}
							tpl = false;
						}
					}
				});
			}
		}
	});

	//匹配URL
/*	$("input[name='href']").blur(function(){
		if(/^http:/.test($(this).val()) || /^https:/.test($(this).val())){

		} else if(/\w/g.test($(this).val())){
			$(this).val("http://"+$(this).val());
		}
	});*/
		
});