/**
 * Created by lenovo on 2016/5/4.
 */
    define(function (require, exports, module) {
        
        var easyui = require("easyui");
        var dialog = require('../libs/plugs/dialog/dialog-plus');
		var Calendar=require('../widgets/calendar_w');
		require('../widgets/select');

		//判断如果是介于的情况下选择。
		$(".search-list").find("li").on("click",function(){
			if($(this).text() == "介于"){
				$(this).parents(".select").siblings(".search-between").show();
				$(this).parents(".select").siblings(".search-normal").hide();
				/*$(".search-between").show();
				 $(".search-normal").hide();*/
			}else{
				$(this).parent().parent("div").siblings(".search-between").hide();
				$(this).parent().parent("div").siblings(".search-normal").show();
				/*	$(".search-between").hide();
				 $(".search-normal").show();*/
			}
		});
		/*$(function(){
			var $searhCon2H = $(window).height()-48;
			$(".searchCon2").height($searhCon2H);
		})*/

		// 初始化高级筛选面板
        function _initAdvanceFilterPanel($panel, columns, options){

        	// 初始化column列表
        	_initColumnsList($panel, columns);

        	// 初始化面板相关事件
        	_initPanelEventHandle($panel, columns, options);

        	// 初始化面板中筛选项事件
        	_initFilterItemEventHandle($panel);

        	$.each(columns, function(i, column){

        		// 切换筛选项内容是否显示
	        	_toggleFilterGroup(column.field, !column.hidden, $panel);
        	});
        }

        // 初始化column列表
        function _initColumnsList($panel, columns){
        	var $ul = $panel.find(".filter-columns").empty();



        	$.each(columns, function(i, column){
        	/*	if(!column.advanceFilter){
        			return;
        		}*/
				//console.log(32,column)

	        	var li = '<li class="searchLI" data-field=' + column.field + '>' +
	        				'<span>' + column.title + '</span> ' +
	        				'<i class="' + (column.hidden ? "" : "trueSel") + '"></i>' +
	        			'</li>';

	        	$ul.append(li);
        	});
        }

        // 初始化面板相关事件
        function _initPanelEventHandle($panel, columns, options){
        	// 筛选设置项容器
        	var $filterGroups = $panel.find(".searchCon2>div");
        	// 隐藏的筛选设置项容器
        	var $hideFilterGroups = $panel.find(".hideFilterGroups");

        	// 切换column按钮
        	$panel.find(".filter-toggle").on("click", function(e){
        		$panel.find(".searchCon1").toggle();
        	});

        	// column列表添加click事件
        	$panel.find(".searchCon1 li.searchLI").on("click", function(e){
        		if($(this).hasClass("disableAll")){
        			$panel.find(".filter-columns li.searchLI").each(function(i, li){
        				// 字段名
		        		var field = $(li).attr("data-field");

		        		// 切换筛选项内容是否显示
		        		_toggleFilterGroup(field, false, $panel);

		        		// 切换列表项勾选图标状态
		        		$(li).children("i").toggleClass("trueSel", false);
        			});
        		}else if($(this).hasClass("enableAll")){
        			$panel.find(".filter-columns li.searchLI").each(function(i, li){
	    				// 字段名
		        		var field = $(li).attr("data-field");

		        		// 切换筛选项内容是否显示
		        		_toggleFilterGroup(field, true, $panel);

		        		// 切换列表项勾选图标状态
		        		$(li).children("i").toggleClass("trueSel", true);
        			});
        		}else{
	        		// 字段名
	        		var field = $(this).attr("data-field");

	        		// 获取选中状态
	        		var isChecked = $(this).children("i").hasClass("trueSel");

	        		// 切换筛选项内容是否显示
	        		_toggleFilterGroup(field, !isChecked, $panel);

	        		// 切换列表项勾选图标状态
	        		$(this).children("i").toggleClass("trueSel", !isChecked);
        		}
	        	
	        	$(this).closest(".searchCon1").hide();
        	});

        	// 重置筛选条件按钮
        	$panel.find(".filter-btn .gen-cancelBtn").on("click", function(e){
        		// 重置form表单
        		$panel.find("form").each(function(i, form){
        			form.reset();
        		});
        	});

        	// 面板关闭按钮，隐藏筛选面板
        	$panel.find(".searchHead .searchClose").on("click", function(e){
        		$panel.hide();
        	});


        	if(options && options.openTarget){
        		// 显示筛选面板
        		$("#" + options.openTarget).on("click", function(e){
        			$panel.show();
        		})
        	}
        }

        // 初始化面板筛选项相关事件
        function _initFilterItemEventHandle($panel){
        	// 初始化select
            // $panel.find(".search-list .select").click(function () {
				// alert("1")
            // })
        	$panel.find(".search-list .select").select({
        		onlyShow: false
        	});


        	$panel.find(".search-list .datebox").each(function(i, datebox){
        		Calendar.calendarInit({ 
					inputField : datebox,    //显示日期值的元素id
					trigger : datebox,    //触发日历控件的元素id
					showTime: true,
					dateFormat : "%Y-%m-%d %H:%M",
				});

        	});
        }

        // 切换筛选项内容是否显示
        function _toggleFilterGroup(field, isVisible, $panel){
        	// 筛选设置项容器
        	var $filterGroups = $panel.find(".searchCon2>div");
        	// 隐藏的筛选设置项容器
        	var $hideFilterGroups = $panel.find(".hideFilterGroups");

			if(!isVisible){
    			// 将设置项内容移动到隐藏区域内
    			var $group = $filterGroups.find(".search-list[data-field='" + field + "']");

    			var $div = $("<div>").attr("data-field", field).appendTo($hideFilterGroups);

    			$group.children().appendTo($div);
    		}else{
    			// 将隐藏区域内的设置项移动回来
    			var $div = $hideFilterGroups.children("div[data-field='" + field + "']");

    			var $group = $filterGroups.find(".search-list[data-field='" + field + "']");

    			$div.children().appendTo($group);
    			$div.remove();
    		}
        }

        /**
			提供给外部调用的初始化高级筛选面板接口
			$panel: 高级筛选面板jQuery DOM对象
			columns: datagrid列数据信息
			options: {	其他设置项
				openTarget: 打开高级筛选按钮的DOM ID
			}
        */
        exports.initAdvanceFilter = function($panel, columns, options){
            _initAdvanceFilterPanel($panel, columns, options);
        };

    });


















/*
define(function (require, exports, module) {
	
	var easyui = require("easyui");
	var dialog = require('../libs/plugs/dialog/dialog-plus');
	var Calendar=require('../widgets/calendar_w');

	//判断如果是介于的情况下选择。
	$(".search-list").find("li").on("click",function(){
		if($(this).text() == "介于"){
			$(this).parents(".select").siblings(".search-between").show();
			$(this).parents(".select").siblings(".search-normal").hide();
			/!*$(".search-between").show();
			 $(".search-normal").hide();*!/
		}else{
			$(this).parent().parent("div").siblings(".search-between").hide();
			$(this).parent().parent("div").siblings(".search-normal").show();
			/!*	$(".search-between").hide();
			 $(".search-normal").show();*!/
		}
	});
	/!*$(function(){
	 var $searhCon2H = $(window).height()-48;
	 $(".searchCon2").height($searhCon2H);
	 })*!/

	// 初始化高级筛选面板
	function _initAdvanceFilterPanel($panel, columns, options){

		// 初始化column列表
		_initColumnsList($panel, columns);

		// 初始化面板相关事件
		_initPanelEventHandle($panel, columns, options);

		// 初始化面板中筛选项事件
		_initFilterItemEventHandle($panel);

		$.each(columns, function(i, column){
			if(!column.advanceFilter){
				return;
			}

			// 切换筛选项内容是否显示
			_toggleFilterGroup(column.field, !column.advanceFilter.hidden, $panel);
		});
	}

	// 初始化column列表
	function _initColumnsList($panel, columns){
		var $ul = $panel.find(".filter-columns").empty();

		//console.log(columns)

		$.each(columns, function(i, column){
			if(!column.advanceFilter){
				return;
			}
			//console.log(32,column)

			var li = '<li class="searchLI" data-field=' + column.field + '>' +
				'<span>' + column.title + '</span> ' +
				'<i class="' + (column.advanceFilter.hidden ? "" : "trueSel") + '"></i>' +
				'</li>';

			$ul.append(li);
		});
	}

	// 初始化面板相关事件
	function _initPanelEventHandle($panel, columns, options){
		// 筛选设置项容器
		var $filterGroups = $panel.find(".searchCon2>div");
		// 隐藏的筛选设置项容器
		var $hideFilterGroups = $panel.find(".hideFilterGroups");

		// 切换column按钮
		$panel.find(".filter-toggle").on("click", function(e){
			$panel.find(".searchCon1").toggle();
		});

		// column列表添加click事件
		$panel.find(".searchCon1 li.searchLI").on("click", function(e){
			if($(this).hasClass("disableAll")){
				$panel.find(".filter-columns li.searchLI").each(function(i, li){
					// 字段名
					var field = $(li).attr("data-field");

					// 切换筛选项内容是否显示
					_toggleFilterGroup(field, false, $panel);

					// 切换列表项勾选图标状态
					$(li).children("i").toggleClass("trueSel", false);
				});
			}else if($(this).hasClass("enableAll")){
				$panel.find(".filter-columns li.searchLI").each(function(i, li){
					// 字段名
					var field = $(li).attr("data-field");

					// 切换筛选项内容是否显示
					_toggleFilterGroup(field, true, $panel);

					// 切换列表项勾选图标状态
					$(li).children("i").toggleClass("trueSel", true);
				});
			}else{
				// 字段名
				var field = $(this).attr("data-field");

				// 获取选中状态
				var isChecked = $(this).children("i").hasClass("trueSel");

				// 切换筛选项内容是否显示
				_toggleFilterGroup(field, !isChecked, $panel);

				// 切换列表项勾选图标状态
				$(this).children("i").toggleClass("trueSel", !isChecked);
			}

			$(this).closest(".searchCon1").hide();
		});

		// 重置筛选条件按钮
		$panel.find(".filter-btn .gen-cancelBtn").on("click", function(e){
			// 重置form表单
			$panel.find("form").each(function(i, form){
				form.reset();
			});
		});

		// 面板关闭按钮，隐藏筛选面板
		$panel.find(".searchHead .searchClose").on("click", function(e){
			$panel.hide();
		});


		if(options && options.openTarget){
			// 显示筛选面板
			$("#" + options.openTarget).on("click", function(e){
				$panel.show();
			})
		}
	}

	// 初始化面板筛选项相关事件
	function _initFilterItemEventHandle($panel){
		// 初始化select
		$panel.find(".search-list .select").select({
			onlyShow: false
		});

		$panel.find(".search-list .datebox").each(function(i, datebox){
			Calendar.calendarInit({
				inputField : datebox,    //显示日期值的元素id
				trigger : datebox,    //触发日历控件的元素id
				showTime: true,
				dateFormat : "%Y-%m-%d %H:%M",
			});

		});
	}

	// 切换筛选项内容是否显示
	function _toggleFilterGroup(field, isVisible, $panel){
		// 筛选设置项容器
		var $filterGroups = $panel.find(".searchCon2>div");
		// 隐藏的筛选设置项容器
		var $hideFilterGroups = $panel.find(".hideFilterGroups");

		if(!isVisible){
			// 将设置项内容移动到隐藏区域内
			var $group = $filterGroups.find(".search-list[data-field='" + field + "']");

			var $div = $("<div>").attr("data-field", field).appendTo($hideFilterGroups);

			$group.children().appendTo($div);
		}else{
			// 将隐藏区域内的设置项移动回来
			var $div = $hideFilterGroups.children("div[data-field='" + field + "']");

			var $group = $filterGroups.find(".search-list[data-field='" + field + "']");

			$div.children().appendTo($group);
			$div.remove();
		}
	}

	/!**
	 提供给外部调用的初始化高级筛选面板接口
	 $panel: 高级筛选面板jQuery DOM对象
	 columns: datagrid列数据信息
	 options: {	其他设置项
				openTarget: 打开高级筛选按钮的DOM ID
			}
	 *!/
	exports.initAdvanceFilter = function($panel, columns, options){
		_initAdvanceFilterPanel($panel, columns, options);
	};

});
*/
