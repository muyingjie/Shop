define(function(require, exports, module) {
	var $=require('jquery');
     var calendar_w=require('../widgets/calendar_w');
     
	   calendar_w.calendarInit({ 
		    inputField : "birthday",    //显示日期值的元素id,也可以是Dom元素
		    trigger : "birthday"    //触发日历控件的元素id,也可以是Dom元素
		});

});