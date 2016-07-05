
;(function(jQuery2){

	// 编辑器全局管理对象（top）
	var _editorGlobeManage = top._globeManage;

	var $ = jQuery = jQuery2;

	// widget标识属性名
	var _widget_identify = "widgets_id";
	// container标识属性名
	var _container_identify = "container_id";

	// 操作盒子和组件id关联的标识属性
	var _operatebox_widget_relation_identify = "data-relation-widget-id";

	// 操作盒子相关元素
	var operateUtil = {
		$box: $("#drag_operate_box"),	// 操作盒子元素
		$rule: $("#drag_operate_box .line"),	// 宽度信息em元素
		$ruleText: $("#drag_operate_box .line .drag_annotation em"),	// 宽度信息em元素
		$upSort: $("#drag_operate_box .btn-operate.btn-up-slot"),	// “上移”按钮
		$downSort: $("#drag_operate_box .btn-operate.btn-down-slot"),	// “下移”按钮
		$edit: $("#drag_operate_box .btn-operate.btn-edit-widgets"),	// “编辑”按钮
		$del: $("#drag_operate_box .btn-operate.btn-del-widgets"),	// “删除”按钮
		$addBefore: $("#drag_operate_box .btn-operate[data-add=\"before\"]"),	// “添加到前面”按钮
		$addAfter: $("#drag_operate_box .btn-operate[data-add=\"after\"]")	// “添加到后面”按钮
	};

	// 操作盒子顶部工具条高度
	var _operatebox_toolbar_height = operateUtil.$box.find(".head").outerHeight();

	$(function(){

		// 监听所有组件的mouseenter
		$(".wrapper").on("mouseenter", "[" + _widget_identify + "]", function(e){
			// 显示操作盒子
			_showOperateBox(this);
		});

		// 初始化操作盒子相关事件
		_initOperateBoxEventHandle();
	});


	// 初始化操作盒子相关事件
	function _initOperateBoxEventHandle(){
		// 上移按钮click回调
		operateUtil.$upSort.on("click", sortButtonClickHandle);
		// 下移按钮click回调
		operateUtil.$downSort.on("click", sortButtonClickHandle);

		// 鼠标移入顶部菜单条时，显示rule条
		operateUtil.$box.find(".head").on("mouseenter", function(e){
			// 从顶部往下滑
			operateUtil.$rule.animate({
				top: _operatebox_toolbar_height
			}, 100);
		}).on("mouseleave", function(e){
			// 移动回顶部
			operateUtil.$rule.animate({
				top: ""
			}, 100);
		});

		// 鼠标移入显示添加组件按钮列表
		operateUtil.$box.find(".btn-add-widgets").on("mouseenter", function(e){
			$(this).addClass("add_gj_down");
		}).on("mouseleave", function(e){
			$(this).removeClass("add_gj_down");
		});

		// 删除按钮click回调
		operateUtil.$del.on("click", function(e){
			// 操作盒子关联的组件id
			var relationWidgetId = operateUtil.$box.attr(_operatebox_widget_relation_identify);

			// 当前正在操作的组件
			var $targetWidget = $("[" + _widget_identify + "='" + relationWidgetId + "']");

			// 弹出顶部删除提醒
			_editorGlobeManage.deleteWidgetConfirm(function(){
				// 隐藏操作盒子
				operateUtil.$box.hide();

				// 渐隐后删除组件
				$targetWidget.fadeOut(500, function(){
					// 删除组件
					$targetWidget.remove();
				});
			});
		});

		// 编辑按钮click回调
		operateUtil.$edit.on("click", function(e){
			// 操作盒子关联的组件id
			var relationWidgetId = operateUtil.$box.attr(_operatebox_widget_relation_identify);

			// 打开编辑组件面板
			_editorGlobeManage.openEditWidgetPanel(relationWidgetId);
		});

		// 添加到前面按钮
		operateUtil.$addBefore.on("click", function(e){
			// 操作盒子关联的组件id
			var relationWidgetId = operateUtil.$box.attr(_operatebox_widget_relation_identify);

			// 当前正在操作的组件
			var $targetWidget = $("[" + _widget_identify + "='" + relationWidgetId + "']");

			// 打开添加组件面板
			_editorGlobeManage.openAppendWidgetPanel($targetWidget, "before", function(){

			});
		});

		// 添加到后面按钮
		operateUtil.$addAfter.on("click", function(e){
			// 操作盒子关联的组件id
			var relationWidgetId = operateUtil.$box.attr(_operatebox_widget_relation_identify);

			// 当前正在操作的组件
			var $targetWidget = $("[" + _widget_identify + "='" + relationWidgetId + "']");

			// 打开添加组件面板
			_editorGlobeManage.openAppendWidgetPanel($targetWidget, "after", function(){
				
			});
		});

		// 排序按钮点击处理函数
		function sortButtonClickHandle(e){
			// 如果按钮为禁用状态，不执行后续操作
			if($(this).hasClass("disabled")){
				return false;
			}

			// 按钮类型
			var sort = $(this).attr("data-sort");

			// 操作盒子关联的组件id
			var relationWidgetId = operateUtil.$box.attr(_operatebox_widget_relation_identify);

			// 当前正在操作的组件
			var $targetWidget = $("[" + _widget_identify + "='" + relationWidgetId + "']");

			// 移动相关元素位置
			_movePosition($targetWidget, sort, function(){
				// 显示操作盒子
				_showOperateBox($targetWidget);
			});
		}
	}

	// 移动相关元素位置
	function _movePosition($targetWidget, direction, callback){
		// 目的地元素（要和此元素更换位置）
		var $destinationElem = null;

		if(direction == "up"){
			$destinationElem = $targetWidget.prev();
		}else{
			$destinationElem = $targetWidget.next();
		}

		// 获取位置信息
		var targetPos = $targetWidget.position();
		var destinationPos = $destinationElem.position();

		// 动画时长
		var delay = 250;

		// 固定动画元素位置信息
		$targetWidget.css({
			position: "relative",
			width: $targetWidget.width(),
			height: $targetWidget.height()
		}).animate({	// 动画
			top: destinationPos.top - targetPos.top,
			left: destinationPos.left - targetPos.left
		}, delay, function(){
			// 动画执行完成后，将元素移动到对应位置
			if(direction == "up"){
				$targetWidget.insertBefore($destinationElem);
			}else{
				$targetWidget.insertAfter($destinationElem);
			}

			// 清除动画元素位置信息
			$targetWidget.css({
				position: "",
				width: "",
				height: "",
				top: "",
				left: ""
			});

			// 调用回调函数
			callback && callback.call(this);
		});

		// 固定动画元素位置信息
		$destinationElem.css({
			position: "relative",
			width: $destinationElem.width(),
			height: $destinationElem.height()
		}).animate({	// 动画
			top: targetPos.top - destinationPos.top,
			left: targetPos.left - destinationPos.left
		}, delay, function(){
			// 清除元素位置信息
			$destinationElem.css({
				position: "",
				width: "",
				height: "",
				top: "",
				left: ""
			});
		});
	}

	// 显示操作项盒子
	function _showOperateBox(widget){
		var $widget = $(widget);
		var width = $widget.outerWidth();
		var height = $widget.outerHeight();
		var top = $widget.offset().top;
		var left = $widget.offset().left;

		// 如果动画正在执行，立即停止
		if(operateUtil.$box.is(":animated")){
			operateUtil.$box.stop();
		}

		// 显示操作盒子
		operateUtil.$box.show().animate({
			width: width,
			height: height + _operatebox_toolbar_height,
			top: top - _operatebox_toolbar_height,
			left: left
		}, 250).attr(_operatebox_widget_relation_identify, $widget.attr(_widget_identify));

		// 设置操作盒子标尺文字
		_setOperateBoxRuleText(width);

		// 设置操作盒子相关按钮状态
		_setOperateBoxButtonState($widget);
	}

	// 设置操作盒子标尺文字
	function _setOperateBoxRuleText(text){
		// 设置rule文字
		operateUtil.$ruleText.text(text + "px");
	}

	// 设置操作盒子相关按钮状态
	function _setOperateBoxButtonState($widget){
		// 获取组件前面的组件
		var $prevWidgets = $widget.prevAll("[" + _widget_identify + "]");
		// 获取组件后面的组件
		var $nextWidgets = $widget.nextAll("[" + _widget_identify + "]");

		// 设置“上移”按钮状态
		operateUtil.$upSort.toggleClass("disabled", !$prevWidgets[0]);
		// 设置“下移”按钮状态
		operateUtil.$downSort.toggleClass("disabled", !$nextWidgets[0]);
	}

	// 操作盒子显示操作项
	function _showOperateToolbarItems(){

	}
})($2);











	// 修改组件数据位置（disabled）
	function _moveWidgetsData($currWidget, sort){
		// 容器id
		var conId = $currWidget.closest("[" + _container_identify + "]").attr(_container_identify);
		// 组件id
		var widgetId = $currWidget.attr(_widget_identify);

		// 获取容器内的组件数据
		var widgetsData = _getContainerWidgetsData(conId);
		// 记录要插入的数组位置
		var insertIndex = 0;

		$.each(widgetsData, function(i, widget){
			// 找到组件id相同的组件数据
			if(widget["widgetId"] == widgetId){
				// 计算索引位置
				insertIndex = i;
				if(sort == "up"){
					insertIndex = i--;
				}else{
					insertIndex = i++;
				}

				// 移除数组内元素数据
				var currWidgetData = widgetsData.splice(i, 1);
				// 然后再插入到对应位置
				widgetsData.splice(insertIndex, 0, currWidgetData[0]);
				return false;
			}
		});
	}
