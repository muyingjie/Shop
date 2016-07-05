define(function(require, exports, module) {
	//var $=require('jquery');
	require('../widgets/select');
	var editor=CKEDITOR.replace($('#productDetilInfo')[0],{
		width:"500px",height:"120px",
	    toolbar:[
	        { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize','lineheight','letterspacing'] },
	        { name: 'basicstyles',items : [ 'Bold','Italic','Underline','Strike']},
	        { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
	        { name: 'paragraph1',items:  [ 'NumberedList', 'BulletedList']},
	        { name: 'paragraph2',items:  [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']},
	        { name: 'Link',items:  [ 'Link']},
	        { name: 'Smiley',items:  [ 'Smiley']}
	    ]
	});
	
	 $('#parent_class').select({onlyShow: false});
	 //$('#parent_class').select('setValue', '{{parent_id}}');
	 
	 $('#type_select').select({onlyShow: false});
	 //$('#type_select').select('setValue', '{{type_id}}');

	var showMsg = require('../widgets/validate').showMsg;

    $('form').on('blur', 'input', showMsg);

	$('form').html5Validate(function() {
		//this.submit();
	}, {validate: function() {

	}});

	$('.imp-sureBtn').click(function() {
		var result = $.html5Validate.isAllpass($('form'));
        if($('form').find('.error')[0]) {
           showMsg.call($('form').find('.error')[0]); 
        }
		
        //alert('okok');return false;
		if(result) {
			var linkurl 	= $('#postUrl').val();
	        var cat_name 	= $('#cat_name').val();
	        var parent_id 	= $('#parent_id').val();
	        var type_id 	= $('#type_id').val();
	        var kwords 		= $('#kwords').val();
	        var p_order 	= $('#p_order').val();
	        var explain 	= editor.getData();
	        var cat_id 		= $('#cat_id').val();
	        if(!parent_id){
	        	$("#parent_class").parent("div").addClass("err")
	        	$("#parent_class").siblings(".err-tip").css({display:"inline-block"}).find("span").text("请选择上级分类");
	        	return false;
	        }
	        $.ajax({   
	        	type: "POST", 
	        	url:linkurl,
	        	data:{cat_name:cat_name,parent_id:parent_id,type_id:type_id,cat_id:cat_id,kwords:kwords,p_order:p_order,explain:explain},
	        	dataType: "json",  
	        	success:function(data){
			            if(data.msg){
			            	alert(data.msg); return false;
			            	//window.opener.waring.warningHide("handleDefault", "操作失败！", 1000000);
			            	//window.opener.location.reload();
			            	//window.close();
			            }else{
			            	window.opener.waring.warningHide("handleSuccess", "操作成功！", 1000000);
			            	window.opener.location.reload();
			            	window.close();
			            	
			            	
			            }
	        		}
	        });
		}
	});
});
