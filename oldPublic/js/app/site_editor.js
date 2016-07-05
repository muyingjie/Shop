define(function(require, exports, module) {
    //var $=require('jquery');
    var frame={
        frameHeight:function(obj){
            // 获取右侧滚动区域高度
            obj.load(function(){
                $(this).height(function(){
                    try{
                        var fwin=$(this)[0].contentWindow,fdoc=fwin.document;
                        return Math.max($(fdoc).height());
                    }catch(e){
                        console.warn(e);
                    }
                });
            })
        }
    };
    var pageParam = require("PageParam");
    
    var dialog = require('../libs/plugs/dialog/dialog-plus');

    // 获取页面传递过来的参数
    var pageOptions = pageParam.getParam();


    $.ajaxSetup ({
        cache: false //关闭AJAX缓存
    });


// 全局变量管理
window._globeManage = {};

// 页面数据
var _pageData = null;

// 挂件数据（扁平格式）
var _widgetsData = null;

// widget标识属性名
var _widget_identify = "widgets_id";

// container标识属性名
var _container_identify = "container_id";

// 操作盒子和组件id关联的标识属性
var _operatebox_widget_relation_identify = "data-relation-widget-id";

// 编辑页面window对象
var _editingWindow = null;

// 编辑挂件数据dialog对象
var _editWidgetDataDialog = null;

// 添加挂件数据dialog对象
var _addWidgetDialog = null;



// 获取挂件数据
function _getWidgetData(widgetId){
    return _widgetsData[widgetId + ""];
}

// ajax页面数据和组件数据
function _ajaxPageData(){
    $.when($.getJSON(pageOptions.basePath + "site/fabricate/pconf", {url: pageOptions.url}), 
           $.getJSON(pageOptions.basePath + "site/fabricate/wconf", {url: pageOptions.url}))
     .then(function(pageData, widgetData){
        // 页面数据
        if(pageData[0].code){
            // 页面数据
            _pageData = pageData[0].data;
        }else{
            console.error(pageData[0].msg);
        }

        // 扁平挂件数据
        if(widgetData[0].code){
            // 组件数据（键值对）
            _widgetsData = widgetData[0].data;
        }else{
            console.error(widgetData[0].msg);
        }
    }).fail(function(e1, e2, e3){
        console.error(e1, e2, e3, "获取数据接口失败！！！！");
    });
}

// 获取组件树结构数据
function _getWidgetsTreeData(){
    // 复制一份pageData
    var pageData = $.extend(true, {}, _pageData);

    pageData.widget = {};

    // 遍历获取所有容器
    _editingWindow.$2("[" + _container_identify + "]").each(function(i, container){
        var $container = $(container);

        // 初始化容器id属性
        var widgets = pageData.widget[$container.attr(_container_identify)] = [];

        // 遍历容器内的挂件
        $container.find("[" + _widget_identify + "]").each(function(j, widget){
            // 获取挂件id，在扁平数据中获得挂件数据并记录
            widgets.push(_getWidgetData($(widget).attr(_widget_identify)));
        });

        // 如果容器内没有挂件，设置挂件容器属性为false
        if(widgets.length == 0){
            pageData.widget[$container.attr(_container_identify)] = false;
        }
    });

    return pageData;
}

// 修改被设计页面
function _changeDesignPage(pageAddr){
    $("#frameEditor").attr("src", pageOptions.basePath + pageAddr + "?_rn=" + _generateRandomNumber()+"&is_edit=1");
}

// 初始化相关事件
function _initEventHandle(){
    // iframe加载事件处理
    $("#frameEditor").on("load", function(e){
        var frameWin = _editingWindow = this.contentWindow;

        // 注入操作盒子dom结构
        $("#drag_operate_box").clone().appendTo(frameWin.document.body);

        // 注入jquery
        _embedScript(frameWin, pageOptions.assetPath + "Public/js/libs/jquery/jquery-insert.js", function(){

            // 注入js
            _embedScript(frameWin, pageOptions.assetPath + "Public/js/app/site_editor_inject.js", function(){
                // ajax页面数据和组件数据
                _ajaxPageData();

                // 判断设计页面所有容器是否为空，如果为空，填充添加新挂件按钮
                _getFrameDomByProperty(_container_identify).each(function(i, container){
                    _validateEmptyContainer($(container));
                });
            });
        });

        // 注入样式文件
        var oLink = frameWin.document.createElement('link'); 
        oLink.type = "text/css";
        oLink.rel = "stylesheet";
        oLink.href = pageOptions.assetPath + "Public/css/site_editor_inject.css";
        frameWin.document.body.appendChild(oLink);
    });

    // 预览页面按钮
    $(".preview").on("click", function(e){
        var pageData = _getWidgetsTreeData();

        var oWin = window.open();
        $.ajax({
            type: 'POST',
            url: pageOptions.basePath + "site/fabricate/prehandle",
            data: {config: encodeURI(JSON.stringify(pageData)), _rn: _generateRandomNumber()},
            success: function() {
                // 打开预览窗口
                //window.open(pageOptions.basePath + "site/fabricate/preview");
                oWin.location.href = pageOptions.basePath + "site/fabricate/preview";
            }
        });

        console.log("预览页面的数据：", pageData);
    });

    // 保存页面按钮
    $(".save").on("click", function(e){
        var pageData = _getWidgetsTreeData();

        // 将新组织数据结构替换到全局数据中
        _pageData.widget = pageData.widget;

        // ajax保存页面数据
        $.ajax({
            url: pageOptions.basePath + "site/fabricate/fab",
            type: "post",
            dataType: "json",
            data: _pageData,
            success: function(data){
                if(data.code == true){
                    alert("保存成功！");
                }else{
                    alert("页面保存失败！");
                    console.error("页面保存失败！", data.msg);
                }
            },
            error: function(error){
                alert("页面保存失败！");
                console.error("页面保存失败！", error);
            }
        });

        console.log("保存页面的数据：", _pageData);
    });
}

// 嵌入脚本
function _embedScript(win, url, callback){
    // 动态插入script标签 
    var oScript = win.document.createElement('script'); 
    oScript.type = "text/javascript"; 
    oScript.async = false; 
    oScript.src = url; 
    /* 
    ** script标签的onload和onreadystatechange事件 
    ** IE6/7/8支持onreadystatechange事件 
    ** IE9/10支持onreadystatechange和onload事件 
    ** Firefox/Chrome/Opera支持onload事件 
    */ 

    // 判断IE8及以下浏览器 
    var isIE = !-[1,]; 
    if(isIE){
        // alert('IE') 
        oScript.onreadystatechange = function(){ 
            if(this.readyState == 'loaded' || this.readyState == 'complete'){ 
                callback(); 
            } 
        } 
    }else{
        // IE9及以上浏览器，Firefox，Chrome，Opera 
        oScript.onload = function(){
            callback();
        }
    }
    
    win.document.body.appendChild(oScript); 
}

// 通过属性获取编辑页面dom对象
function _getFrameDomByProperty(prop, val){
    if(val === null || val === undefined || val === ""){
        return _editingWindow.$2("[" + prop + "]");
    }else{
        return _editingWindow.$2("[" + prop + "=" + val + "]");
    }
};

// 生成新挂件id
function _generateNewWidgetId(){
    // 设置新挂件id是已存在挂件id最大值+1
    var newId = -1;

    for(var id in _widgetsData){
        if(newId < id-0){
            newId = id-0;
        }
    }

    newId++;

    return newId+"";
}

// 生成随机数
function _generateRandomNumber(){
    return "_" + (new Date().getTime() + Math.floor(Math.random() * 10000));
}

// 校验容器是否为空容器
function _validateEmptyContainer($container){
    if(!$container.find("[" + _widget_identify + "]")[0]){
        $container.html('<div class="empty_drop_box"><input type="button" class="" value="添加新挂件" /></div>');
    }else{
        $container.find("div.empty_drop_box").remove();
    }
}


$(function(){
    // 初始化相关事件
    _initEventHandle();

    // 修改被设计页面
    _changeDesignPage(pageOptions.url);

    /***控制导航的三角方向***/
    $(".visual-edit").hover(function(){
        $(this).find("i").removeClass("visual-right-arrow").addClass("visual-down-arrow");
        $(".drop-down1").show();
    },function(){
        $(this).find("i").removeClass("visual-down-arrow").addClass("visual-right-arrow");
        $(".drop-down1").hide();
    });
    $(".drop-down1").hover(function(){
        $(".visual-edit").find("i").removeClass("visual-right-arrow").addClass("visual-down-arrow");
        $(".drop-down1").show();
    },function(){
        $(".visual-edit").find("i").removeClass("visual-down-arrow").addClass("visual-right-arrow");
        $(".drop-down1").hide();
    });

    frame.frameHeight($('#frameEditor'));
});

$.extend(_globeManage, {
    /** 删除挂件提醒窗口
        @widgetId: 要删除的挂件id（用于删除挂件数据）
        @callback: 删除成功后的回调函数[如果需要的话]
    */
    deleteWidgetConfirm: function(widgetId, callback){
        // 弹出删除提醒窗口
        dialog({
            title: "删除提醒",
            content: "确定要删除吗？",
            width: 400,
            button: [{
                value: "确定",
                id:"ok",
                autofocus: true,
                callback:function(){
                    // 删除过后，将参数从_widgetsData中删除
                    delete _getWidgetData(widgetId);

                    // 渐隐挂件后删除
                    var $targetWidget = _getFrameDomByProperty(_widget_identify, widgetId);
                    var $targetContainer = $targetWidget.closest("[" + _container_identify + "]");

                    $targetWidget.fadeOut(500, function(){
                        // 删除组件
                        $targetWidget.remove();

                        // 校验容器是否为空
                        _validateEmptyContainer($targetContainer);

                        // 删除成功后，执行回调
                        callback && callback();
                    });
                }
            },{
                value: "取消"
            }]
        }).showModal();
    },
    /** 打开编辑挂件面板
        @widgetId: 要编辑的挂件id（如果传入的是widgetData对象，）
    */
    openEditWidgetPanel: function(widgetId){
        var widgetData = null;

        // 如果传入的参数widgetId是string类型，在数据缓存中查找，否则widgetId就是widgetData数据对象
        if(typeof(widgetId) == "string"){
            widgetData = _getWidgetData(widgetId) || widgetId;
        }else{
            widgetData = widgetId;
        }
        
        // 弹出编辑挂件dialog
        _editWidgetDataDialog = dialog({
            title: (typeof(widgetId) == "string" ? "编辑挂件" : "增加挂件"),
            url: pageOptions.basePath + "site/widget/widgetc?config=" + encodeURI(JSON.stringify(widgetData)) + "&_rn=" + _generateRandomNumber(),
            width: 600,
            onclose: function(){
                // alert("关闭");
            },
            onremove: function(){
                // alert("销毁");

                // 清除操作盒子的属性标识
                _editingWindow.$2("#drag_operate_box").removeAttr("data-add-relation-widget-id")
                                                      .removeAttr("data-add-direction");
            }
        }).showModal();
    },
    // 打开追加组件面板
    openAppendWidgetPanel: function($targetWidget, direction, callback){
        // alert(direction == "before" ? "在前面添加" : "在后面添加");

        // 弹出添加挂件dialog
        _addWidgetDialog = dialog({
            title: "添加挂件",
            url: pageOptions.basePath + "site/fabricate/wgets" + "?_rn=" + _generateRandomNumber(),
            width: 785,
            onclose: function(){
                // alert("关闭");
            },
            onremove: function(){
                // alert("销毁");

                // 清除操作盒子的属性标识
                _editingWindow.$2("#drag_operate_box").removeAttr("data-add-relation-widget-id")
                                                      .removeAttr("data-add-direction");
            }
        }).showModal();

        // $targetWidget[direction]('<div widgets_id="6">新增加的内容</div>');

        // 添加过后，将新参数添加到_widgetsData中

    },


    // 更新挂件数据
    updateWidgetData: function(widgetData){
        _widgetsData[widgetData.widgetId+""] = widgetData;

        // ajax获取挂件视图结构，并填充到对应位置上
        $.ajax({
            url: pageOptions.basePath + "site/widget/widget",
            type: "get",
            data: {
                config: encodeURI(JSON.stringify(_getWidgetData(widgetData.widgetId)))
            },
            dataType: "json",
            success: function(widgetHtml){
                // 挂件数据
                if(widgetHtml.code){
                    var $widget = null;

                    // 如果添加挂件dialog未销毁
                    if(_addWidgetDialog && !_addWidgetDialog.destroyed){
                        // 获取操作盒子上的属性
                        var targetWidgetId = _editingWindow.$2("#drag_operate_box").attr("data-add-relation-widget-id");
                        var direction = _editingWindow.$2("#drag_operate_box").attr("data-add-direction");

                        // 填充新挂件到页面
                        $widgetBlock = _editingWindow.$2("<div>").attr(_widget_identify, widgetData.widgetId);

                        // 如果是容器，添加新挂件
                        if(direction == "container"){
                            _getFrameDomByProperty(_container_identify, targetWidgetId).html($widgetBlock);
                        }else{
                            // 将新挂件占位添加到对应的位置
                            _getFrameDomByProperty(_widget_identify, targetWidgetId)[direction]($widgetBlock);
                        }
                        // 销毁添加挂件dialog
                        _addWidgetDialog.remove();
                        _addWidgetDialog = null;

                        // 校验容器是否为空
                        _validateEmptyContainer($widgetBlock.closest("[" + _container_identify + "]"));
                    }else{
                        // 刷新挂件视图
                        // _getFrameDomByProperty(_widget_identify, widgetData.widgetId).html(widgetHtml.data);

                        // 获取挂件对象
                        $widgetBlock = _getFrameDomByProperty(_widget_identify, widgetData.widgetId);
                    }

                    // 填充挂件内容
                    $widgetBlock.html(widgetHtml.data);

                    // 销毁编辑挂件dialog
                    _editWidgetDataDialog.remove();
                    _editWidgetDataDialog = null;
                }else{
                    console.error(widgetHtml.msg);
                }
            },
            error: function(error){
                console.error("挂件数据获取失败！", error);
            }
        });
    },
    // 更新挂件数据
    addWidget: function(widgetData){
        // _widgetsData[widgetData.widgetId+""] = widgetData;

        // 销毁dialog
        _addWidgetDialog.close();
        // _addWidgetDialog = null;

        // 调用打开编辑挂件dialog（生成widgetId）
        _globeManage.openEditWidgetPanel($.extend(widgetData, {widgetId: _generateNewWidgetId()}));

        // ajax获取挂件视图结构，并填充到对应位置上

    }
});
});