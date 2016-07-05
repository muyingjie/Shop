define(function(require, exports, module) {
	var $=require('jquery');
	require('../widgets/tabs');

	$(".tabs").tabs(null, null, 'Tab-li-select');
});