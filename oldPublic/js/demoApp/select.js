define(function(require, exports, module) {
	var $=require('jquery');
	require('../widgets/select');

	$("#slt1").select();
	$('#slt2').select({onlyShow: false, mouseoverShow: true, vals: [
        {
            text: '一',
            value: '1'
        },
        {
            text: '二',
            value: '2'
        },
        {
            text: '三',
            value: '3'
        }
    ]});
});