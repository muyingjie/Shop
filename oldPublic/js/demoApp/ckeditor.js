define(function(require, exports, module) {
	var $=require('jquery'),btnGetValue=$('#getVal'),btnSetValue=$('#setVal');
	var editor=CKEDITOR.replace($('#productDetilInfo')[0]);
	btnGetValue.on('click',function(){
		alert(editor.getData());
		console.log(editor.getData());
	});
	btnSetValue.on('click',function(){
		editor.setData('测试修改文字');
	});
	$('.refreshBtn').on('click',function(){
		window.location.reload();
	});
});