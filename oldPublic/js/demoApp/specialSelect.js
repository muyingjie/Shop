define(function(require, exports, module) {
	var $=require('jquery');
	require('../widgets/specialSelect');

	$('ul li').specialSelect({
        mouseoverShow: false,
        footerHandler: function() {
            
        },
        vals: [{text: '一', value: 1}, {text: '二', value: 2}]
    });

    $('ul li').specialSelect('setValue', '2');
});