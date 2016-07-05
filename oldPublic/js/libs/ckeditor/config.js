/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	//config.width='75%';
	//config.height='150px';
	config.image_previewText = ' ';
	config.removePlugins = 'save';//去掉保存按钮
	config.startupFocus = true;
	config.toolbarGroups = [
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'tools' },
		{ name: 'others' },
		{ name: 'links' },
		'/',
		{ name: 'document',    groups: [ 'mode', 'document'] },
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'insert' }
		//{ name: 'forms' },
	];

	//config.filebrowserImageBrowseUrl = '../editor/ckfinder/ckfinder.html?Type=Images';
	//config.filebrowserFlashBrowseUrl = '../editor/ckfinder/ckfinder.html?Type=Flash';
	//config.filebrowserUploadUrl = '../editor/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Files';
	//config.filebrowserImageUploadUrl = '../editor/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Images';
	//config.filebrowserFlashUploadUrl = '../editor/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Flash';
	//config.filebrowserWindowWidth = '800';  //“浏览服务器”弹出框的size设置
	//config.filebrowserWindowHeight = '500';

	config.font_names='宋体/宋体;黑体/黑体;微软雅黑/微软雅黑;'+ config.font_names;
	config.fontSize_sizes='8/8px;9/9px;10/10px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;30/30px;32/32px;34/34px;36/36px;38/38px;40/40px;42/42px;44/44px;46/46px;48/48px;50/50px;52/52px;54/54px;56/56px;58/58px;60/60px;62/62px;64/64px;66/66px;68/68px;70/70px;72/72px';
	config.baseFloatZIndex=10010;
	config.extraPlugins = 'lineheight,letterspacing';
	config.line_height='0.5;0.6;0.7;0.8;0.9;1;1.1;1.2;1.3;1.4;1.5;1.6;1.7;1.8;1.9;2;2.1;2.2;2.3;2.4;2.5;2.6;2.7;2.8;2.9;3';
};