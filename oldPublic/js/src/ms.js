define(function(require, exports, module){
	
	var d = require('gallery/js/src/dialog.js');

	var obj = {
			align: 'bottom left',
			content: ''
	};

	var show = function(content,time) {
		obj.content = content;

		var dd = d(obj);
		dd.show();

		setTimeout(function() {
			dd.close().remove();
		}, time);
	};

	exports.show = show;
});