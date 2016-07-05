/*define(function(require, exports, module) {
	

	jQuery.fn.tabs = function (control, listname, activename) {
		var listname = listname || 'li';
		var activename = activename || 'active';
		var element = $(this);
		control = control ? $(control) : $(this).next();

		element.on("click", listname, function () {
			var tabName = $(this).index();

			element.trigger("change.tabs", tabName);
		});
		element.bind("change.tabs", function (e, tabName) {
			element.find(listname).removeClass(activename);
			
			element.find(">" + listname).eq(tabName).addClass(activename);
		});
		element.bind("change.tabs", function (e, tabName) {
			control.children().removeClass("active");
			control.children().eq(tabName).addClass(activename);
		});
		element.trigger("change.tabs", 0);

		return this;
	};
});*/

;(function (factory) {
    if (typeof define === "function" && define.cmd) {
        define(function(require, exports, module) {
        	

        	factory($);
        });
    } else {
        factory(jQuery);
    }
}(function ($) {
    $.fn.tabs = function (control, listname, activename) {
		var listname = listname || 'li';
		var activename = activename || 'active';
		var element = $(this);
		control = control ? $(control) : $(this).next();

		element.on("click", listname, function () {
			var tabName = $(this).index();

			element.trigger("change.tabs", tabName);
		});
		element.bind("change.tabs", function (e, tabName) {
			element.find(listname).removeClass(activename);
			
			element.find(">" + listname).eq(tabName).addClass(activename);
		});
		element.bind("change.tabs", function (e, tabName) {
			control.children().removeClass("active").hide();
			//control.children().eq(tabName).addClass(activename).show();
			control.children().eq(tabName).show();
		});
		element.trigger("change.tabs", 0);

		return this;
	};
}));