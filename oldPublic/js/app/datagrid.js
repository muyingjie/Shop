define(function(require, exports, module) {
	//var $=require('jquery');
	var easyui = require("easyui");
	var pageParam = require("PageParam");
	var where=require('./desktop').where;


	require("../widgets/select");
	require("../libs/plugs/jquery-ui.js");
	var dialog = require('../libs/plugs/dialog/dialog-plus');

	var datagrid = require("../widgets/datagrid");
	var advanceFilter = require("../widgets/advancefilter");

	// 获取页面传递过来的参数
	var pageOptions = pageParam.getParam();
		pageOptions = pageParam.getParamByKey('/Public/js/app/datagrid');

	var filter=$('.Tab-li-select').attr('data-custom');


	if(filter){
		var fiJson=$.parseJSON(filter);
		if(typeof (fiJson.url)=="undefined"){
			where.tabFilter=$.parseJSON(filter).filter;
			pageOptions.queryParams={filter:where};
		}
	}

	var options = {
		allIdUrl: "../data/ids.json",
		method: "post",	// 数据请求类型
		singleSelect: false,
		columnManage: {
			target: "openColumnManage",	// 打开列管理面板的触发按钮id
			callback: function(columnOrder, columnData){	// 面板点击确定后的处理函数（columnOrder：列顺序信息，columnData：列数据信息）
				//alert("操作后的columns数据：" + JSON.stringify(columnOrder));

				//alert("ajax更新列头数据！然后调用renderDatagrid()函数重新生成datagrid");

				// 重新渲染datagrid
				theDatagrid.renderDatagrid();
			}
		},
		onSelect: function(index, row){	// 页面中有选中行时触发
			console.log("选中行索引：", index);
			console.log("选中行数据：", row);
			console.log("本页所有选中行数量：", theDatagrid.getSelectionsData().length);
			console.log("当前页所有行数量：", theDatagrid.getDataOfCurrentPage().length);
		},
		onUnselect: function(index, row){	// 页面中取消选中行时触发
			console.log("取消选中行索引：", index);
			console.log("取消选中行数据：", row);
			console.log("本页所有选中行数量：", theDatagrid.getSelectionsData().length);
			console.log("当前页所有行数量：", theDatagrid.getDataOfCurrentPage().length);
		},
		onResizeColumn: function(field, width){
			console.log("调整的列字段名：", field);
			console.log("调整后的列宽度：", width);
			console.log("所有列的数据信息：", theDatagrid.getColumnsConfig());
		},

	};

	options = $.extend(true, options, pageOptions);


        // datagrid所用的的callback，下边的函数都是datagrid内部调用的
   $.fn.datagrid.defaults.callbacks.openDetailDialog=function(id){

	   alert(id);

    };
     


	// 初始化数据网格
	var theDatagrid = datagrid.datagrid($('#dg'), options);
theDatagrid.waring = window.waring;
	//window.dg = theDatagrid;
	top.finder=theDatagrid;

	// window.datagrid = datagrid;

	// 初始化高级筛选
	// advanceFilter.initAdvanceFilter($("#advanceFilterPanel"), theDatagrid.getColumnsConfig(), {
	// 	openTarget: "openAdvanceFilterPanel"	// 调用打开高级筛选面板的元素id
	// });


	// 进行筛选
/*	$("#advanceFilterPanel").find(".gen-sureBtn").on("click", function(e){
		var params = {};

		$.each($("#advanceFilterPanel form.filterForm").serializeArray(), function(i, param){
			params[param.name] = param.value;
		});

		$.extend(params, {table: "memberInfo"});

		// 重新加载数据，传递查询查询参数
		theDatagrid.loadData(params);
	});*/


});