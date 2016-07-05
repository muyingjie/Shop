define(function(require, exports, module) {
	var $=require('jquery');
	var easyui = require("easyui");
	var pageParam = require("PageParam");
	
	require("../widgets/select");
	require("../libs/plugs/jquery-ui.js");
	var dialog = require('../libs/plugs/dialog/dialog-plus');

	var datagrid = require("../widgets/datagrid");
	var advanceFilter = require("../widgets/advancefilter");

	// 获取页面传递过来的参数
	var pageOptions = pageParam.getParam();

	var options = {
        url: "../data/data.json",
        method: "post",	// 数据请求类型
        queryParams: {
        	table: "memberInfo"
        },	// 请求附带参数列表
        idField: "id",
        singleSelect: false,
        columnManage: {
        	target: "openColumnManage",	// 打开列管理面板的触发按钮id
        	callback: function(columnOrder, columnData){	// 面板点击确定后的处理函数（columnOrder：列顺序信息，columnData：列数据信息）
                alert("操作后的columns数据：" + JSON.stringify(columnOrder));

                alert("ajax更新列头数据！然后调用renderDatagrid()函数重新生成datagrid");

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
        columns: [[
            {
                field: "_checkbox",	// 列与数据关联的字段（此字段是不存在的字段，用于显示复选框）
                title: "复选框",	// 列头名称
                width: 50,	// 列宽度
                checkbox: true,
                dataType: "id"	// 数据类型，id为标识字段
            },
            {
                field: "id",	// 列与数据关联的字段
                title: "查看",	// 列头名称
                width: 50,	// 列宽度
                dataType: "id",	// 数据类型，id为标识字段
                openDetail: false	// 点击此列数据是否弹出详细窗口
            },{
                field: "thumbnail",
                title: "缩略图",
                width: 100,
                resizable: false,
                dataType: "image",	// 图片类型列，显示缩略图
                editable: {
                	options: {
                		// required: true
                	}
                }
            },{
                field: "name",
                title: "商品名称",
                width: 150,
                sortable: true,	// 此列是否允许排序
                dataType: "text",	// 文本类型列
                editable: {	// 是否允许编辑
                	options: {
                		// required: true	// 是否为必填项
                	}
                },
                advanceFilter: {	// 是否允许高级筛选
                	hidden: false	// 默认是否隐藏
                }
            },{
                field: "typeId",
                title: "类型",
                width: 100,
                dataType: "select",	// 下拉列表选项列
                textField: "typeName",	// 显示的字段
                editable: {	// 是否允许编辑
                	dropDownUrl: "../data/type.json",	// 下拉列表数据源
                	method: "get",	// 数据请求类型
                	options: {
                		// required: true	// 是否为必填项
                	}
                },
                advanceFilter: {	// 是否允许高级筛选
                	hidden: false	// 默认是否隐藏
                }
            },{
                field: "tag",
                title: "标签",
                width: 100,
                hidden: true,
                dataType: "text",
                editable: {	// 是否允许编辑
                    options: {
                        // required: true	// 是否为必填项
                    }
                }
            },{
                field: "price",
                title: "市场价格",
                width: 100,
                dataType: "number",	// 数字类型列
                editable: {	// 是否允许编辑
                    options: {
                        // required: true	// 是否为必填项
                    }
                },
                advanceFilter: {	// 是否允许高级筛选
                	hidden: true	// 默认是否隐藏
                }
            },{
                field: "date",
                title: "更新日期",
                width: 150,
                dataType: "date",	// 日期类型列
                editable: {	// 是否允许编辑
                    options: {
                        // required: true	// 是否为必填项
                    }
                },
                advanceFilter: {	// 是否允许高级筛选
                	hidden: true	// 默认是否隐藏
                }
            },{
                field: "_operate",
                title: "操作",
                dataType: "operate",	// 操作类型列
                width: 280,
                // layoutType: "vertical",	// 布局类型，不设置此参数显示为水平布局，或者设置为vertical为垂直布局
                operateTitle: "处理订单",	// vertical布局，显示的名称


                operateOptions: [
                	{
                		type: "edit",
                		title: "订单编辑",
                		callback: function(index, rowData){
                            // 有id表明是修改，没有id，表明是新增
                            if(rowData["id"]){
                                // ajax更新数据
                                alert("ajax更新数据");
                                alert(JSON.stringify(rowData));
                            }else{
                                alert("ajax新增数据");
                                alert(JSON.stringify(rowData));
                            }

                            // 新增和修改后，都简易刷新datagrid
                            theDatagrid.refreshDatagrid();
                		}
                	}, {
                		type: "pay",
                		title: "支付"
                	}, {
                		type: "send",
                		title: "发货"
                	}, {
                		type: "completed",
                		title: "完成"
                	}, {
                		type: "delete",
                		title: "删除行",
                		//callback: function(index, rowData){
                         //   if(confirm("确定要删除此行记录吗？")){
                         //       alert("ajax删除索引为：" + index + "，id：" + rowData.id + "的行。");
                        //
                         //       // ajax删除行后，刷新数据
                         //       theDatagrid.refreshDatagrid();
                         //   }
                		//}
                	}, {
                		type: "remark",
                		title: "备注"
                	}
                ]
            }
        ]]
    };

    options = $.extend(true, options, pageOptions);


	// 初始化数据网格
	var theDatagrid = datagrid.datagrid($('#dg'), options);


	window.dg = theDatagrid;


	 window.datagrid = datagrid;

	// 初始化高级筛选
	advanceFilter.initAdvanceFilter($("#advanceFilterPanel"), theDatagrid.getColumnsConfig(), {
		openTarget: "openAdvanceFilterPanel"	// 调用打开高级筛选面板的元素id
	});


	// 进行筛选
	$("#advanceFilterPanel").find(".gen-sureBtn").on("click", function(e){
		var params = {};

		$.each($("#advanceFilterPanel form.filterForm").serializeArray(), function(i, param){
			params[param.name] = param.value;
		});

		$.extend(params, {table: "memberInfo"});

		// 重新加载数据，传递查询查询参数
		theDatagrid.loadData(params);
	});
	

});