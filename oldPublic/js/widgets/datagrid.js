/**
 * Created by lenovo on 2016/5/4.
 */
    define(function (require, exports, module) {


        var easyui = require("easyui");
        var dialog = require('../libs/plugs/dialog/dialog-plus');
        var Calendar = require('jscal2');
        var datagridConfig = require('../widgets/datagrid-config');
        var colorPick = require("../widgets/colorPick");
        dlog=require("../widgets/dialogs");
        var waring = require("../main");

        // datagrid所用常量
        var DATAGRID_CONSTANT = {
            // datagrid正在编辑时的标识class名称
            DATAGRID_ROW_EDITING_CLASS_NAME: "datagrid-row-editing"
        };

        // datagrid默认配置项
        var _dataGridDefault = {
            url: "",   // 数据请求地址
            allIdUrl: "",   // 获取所有id的url
            method: "post", // 请求类型
            queryParams: {},    // 查询参数
            multiSort: true,    // 是否允许多列同时排序
            remoteSort: true,   // 远程排序（列排序功能由服务器端完成）
            singleSelect: true, // 是否只允许单选行（设置为true，就不能再多选数据行了）
            pagination: true,   // 是否显示分页条
            pageSize: 20,   // 每页显示数量
            pageList: [20,40,60], // 每页显示行数可选项列表值
            rownumbers: false,   // 是否显示行号
            scrollbarSize: 240,
            resizeHandle: "right",  // 调整列宽度的手柄位置
            sortName: "",
            striped: false, // 是否显示斑马线效果
            columns: [],    // 列属性设置
            onResizeColumn: null,   // 调整列宽度时触发
            onSelect: null, // 选中行触发
            onUnselect: null,   // 取消选中行触发
            onAfterEdit: null,  // 编辑行之前触发
            onEndEdit: null,    // 编辑行之后触发
            onLoadSuccess: null,    // 数据加载完成后触发
            checkOnSelect: false,
            selectOnCheck: false,

            /**
                columnManage: {
                    target: "openDialogId", // 打开列管理面板的元素id
                    callback: function(columnOrder, columnData) // 列管理面板点击确定后的回调函数
                }
            */
            columnManage: null  // 列管理相关
        };

        // 数据网格editor映射（编辑网格内容时的显示形式）
        var _datagridEditors = {
            /*
                column: // 列设置信息
            */

            // 列类型为select
            select: function(column){
                return {
                    type: 'combobox',
                    options: {
                        valueField: column.field,
                        textField: column.textField,
                        method: column.editable.method || 'get',
                        url: column.editable.dropDownUrl,
                        required: column.editable.options.required || false
                    }
                };
            },
            text: function(column){
                return {
                    type: 'validatebox',
                    options: {
                        required: column.editable.options.required || false
                    }
                };
            },
            date: function(column){
                return {
                    type: 'datebox',
                    options: {
                        required: column.editable.options.required || false
                    }
                };
            },
            image: function(column){
                return {
                    type: "image",
                    options: {
                        required: column.editable.options.required || false
                    }
                }
            },
            colorbox: function(column){
                return {
                    type: "colorbox",
                    options: {
                        required: column.editable.options.required || false
                    }
                }
            }
        };
        // 合并设置项
        _datagridEditors = $.extend(_datagridEditors, $.fn.datagrid.defaults.dataTypeEditorRelationMap);

        // 初始化绑定table上的相关事件
        function _initEventHandle(theDatagrid){
            var $tableDOM = theDatagrid._$tableDOM;
            var $dgPanelDOM = theDatagrid._$dgPanelDOM;

            // datagrid正在编辑的class标识
            var rowEditingClassName = "." + DATAGRID_CONSTANT.DATAGRID_ROW_EDITING_CLASS_NAME;

            // 编辑行按钮绑定事件
            $dgPanelDOM.on("mouseenter", ".previewThumbnailImage:not(." + DATAGRID_CONSTANT.DATAGRID_ROW_EDITING_CLASS_NAME + " .previewThumbnailImage)", function(e){
                // 非编辑状态下，鼠标移入图片类型列，进行预览
                var $td = $(e.target).closest("td");

                var offset = $td.offset();

                var imgUrl = $(e.target).attr("data-path");

                $("<img id='dgPreviewImage'>").attr("src", imgUrl).offset({
                    top: offset.top,
                    left: offset.left + $td.width()
                }).appendTo("body");
            }).on("mouseleave", ".previewThumbnailImage:not(." + DATAGRID_CONSTANT.DATAGRID_ROW_EDITING_CLASS_NAME + " .previewThumbnailImage)", function(e){
                $("#dgPreviewImage").remove();
            });

            // 点击非编辑状态下的id列图标
            $dgPanelDOM.on("click", ".openDetailDialog:not(." + DATAGRID_CONSTANT.DATAGRID_ROW_EDITING_CLASS_NAME + " .openDetailDialog)", function(e){
                // alert("打开详细数据窗口：" + $(e.target).attr("data-id"));
                $.fn.datagrid.defaults.callbacks.openDetailDialog.call(theDatagrid, $(e.target).attr("data-id"));
            });

            // 鼠标移入纵向操作项菜单相关
            $dgPanelDOM.on("mouseenter", ".operate_buttons_vertical .handle-list", function(e){
                // var $menus = $(this).find(".order-proce");

                // 给datagrid中的操作项菜单添加品是id标识
                $(this).attr("id", "__tempShowMenus");

                var $menus = $(this).find(".order-proce");
                // $menus = $($menus);
                var $absoluteMenus = $("<div id='operate_buttons_vertical' class='order-handle operate_buttons operate_buttons_vertical'></div>")
                $menus.clone().appendTo($absoluteMenus).css({
                    "display": "block",
                    "position": "static"
                }).attr({
                    "data-index": $menus.closest(".operate_buttons").attr("data-index"),
                    "data-id": $menus.closest(".operate_buttons").attr("data-id")
                });
                // 设置绝对定位坐标，并追加到body中
                $absoluteMenus.css({
                    display: "block",
                    position: "absolute",
                    top: $menus.parent().offset().top + $menus.parent().outerHeight(),
                    left: $menus.parent().offset().left,
                    zIndex: 999999999
                }).appendTo("body").hover(function(){
                    $(this).show();
                }, function(){
                    // 删除body下的绝对定位菜单
                    $("body>.operate_buttons_vertical").remove();

                    // 清除绑定在datagrid操作列上的临时id标识
                    $("#__tempShowMenus").removeAttr("id");
                }).find("li.operateButton").click(function(){
                    // 获取点击的菜单操作项
                    var operate = $(this).attr("data-operate");

                    // 触发datagrid操作项上的菜单click
                    $("#__tempShowMenus").find("[data-operate='" + operate + "']").trigger("click")

                    // 删除绝对定位临时菜单
                    $(this).closest(".operate_buttons").remove();
                });
            }).on("mouseleave", ".operate_buttons_vertical .handle-list", function(e){
                // 隐藏绝对定位临时菜单
                $("body>.operate_buttons_vertical").hide();
            });

            // 操作列按钮点击事件
            $dgPanelDOM.on("click", ".operateButton", function(e){
                var $btn = $(e.target);
                // 当前操作行的索引
                var currentRowIndex = $btn.closest(".operate_buttons").attr("data-index");

                var operate = $btn.attr("data-operate");

                // 如果是编辑按钮，进行编辑行数据操作，并且不执行后续操作
                if(operate == "edit"){

                    // 修改时要获取选择到的行
                    // var rows = $tableDOM.datagrid("getSelections");

                    //如果只选择了一行则可以进行修改，否则不操作
                    // if(rows[0]){
                        //获取到当前选择行的下标
                        // var index = $tableDOM.datagrid("getRowIndex", rows[0]);

                        //修改之前先关闭已经开启的编辑行，当调用endEdit该方法时会触发onAfterEdit事件
                        if(theDatagrid._editRowIndex != undefined){
                            return false;

                            // 校验通过后，关闭编辑
                            if($tableDOM.datagrid('validateRow', theDatagrid._editRowIndex)){
                                $tableDOM.datagrid("endEdit", theDatagrid._editRowIndex);
                            }
                        }

                        //当无编辑行时
                        if(theDatagrid._editRowIndex == undefined){
                            //开启编辑
                            $tableDOM.datagrid("beginEdit", currentRowIndex);
                            //把当前开启编辑的行赋值给全局变量_editRowIndex
                            theDatagrid._editRowIndex = currentRowIndex;
                            //当开启了当前选择行的编辑状态之后，
                            //应该取消当前列表的所有选择行，要不然双击之后无法再选择其他行进行编辑
                            // $tableDOM.datagrid("unselectAll");
                            // theDatagrid.unselectAll();
                        }
                    // }

                    // 隐藏按钮区，显示编辑完成取消按钮区域
                    $btn.closest(".operate_buttons").hide().siblings(".operate_editing_buttons").show();
                    return false;
                }

                // 编辑状态下的取消按钮
                if($btn.hasClass("editCancel")){
                    // 清除记录的正在编辑的行索引
                    theDatagrid._editRowIndex = undefined;
                    // 取消更改
                    $tableDOM.datagrid("rejectChanges");
                }else if($btn.hasClass("editCompleted")){
                    // 编辑状态下的确定按钮
                    // 如果datagrid的
                    if(theDatagrid._editRowIndex != null && currentRowIndex != theDatagrid._editRowIndex){
                        // if(theDatagrid._$tableDOM.datagrid('validateRow', theDatagrid._editRowIndex)){
                            // 执行更新数据行操作
                            theDatagrid._$tableDOM.datagrid('acceptChanges');
                        // }
                    }
                }

                // 执行此操作按钮的自定义项
                $.each(_getDatagridOptions(theDatagrid).columns[0], function(i, column){
                    if(column.dataType == "operate"){
                        // column.callback("aaa");
                        $.each(column.operateOptions, function(j, operOpt){
                            if(operOpt.type == operate){
                                // 获取点击数据行的数据
                                 var rows = $tableDOM.datagrid("getSelections");
                                // var rowIndex = $btn.closest(".operate_buttons").attr("data-index");
                                var rowData = _getRowDataByIndex(theDatagrid, currentRowIndex);
                                // if(!rows[0]){
                                //     return false;
                                // }
                                // var rowData = rows[0];

                                // 获取点击数据行的索引
                                // var index = $tableDOM.datagrid("getRowIndex", rowData);

                                // 如果是删除行按钮
/*                                if(operOpt.type == "delete"){
                                    var idFiled=_getDatagridOptions(theDatagrid).idField
                                    alert(idFiled);
                                    dlog.showConfirm({title:"提示",width:500,content:"是否确定删除",ok:function(){
                                       // waring.warningHide("handleLoad", "加载中，请稍后！")
                                        console.log(rowData);

                                        var checkId=rows[0].image_id

                                            $.post(operOpt.url,{checkId:checkId}, function (data) {
                                                if(data.status){
                                                    if(operOpt.refresh) {
                                                        top.finder.loadData()
                                                        waring.warningHide("handleSuccess", "操作成功！", 2000)
                                                    }else{
                                                        $tableDOM.datagrid("deleteRow", currentRowIndex);
                                                        waring.warningHide("handleSuccess", "操作成功！", 2000)
                                                    }
                                                }else{
                                                    waring.warningHide("handleDefault", "操作失败，请重试！", 2000)
                                                }
                                            },"json")
                                         }});



                                    //deleteRow(index)
                                    // 隐藏按钮区，显示编辑完成取消按钮区域
                                    // $btn.closest(".operate_buttons").hide().siblings(".operate_editing_buttons").show();
                                    // $tableDOM.datagrid("deleteRow", currentRowIndex);
                                    // 刷新数据
                                    // $tableDOM.datagrid("reload");
                                    // return;
                                }*/

                                if(operOpt.type == ""){
                                    alert()
                                }

                                // 执行回调
                                operOpt.callback && operOpt.callback(currentRowIndex, rowData);
                                return false;
                            }
                        });
                    }
                });
            });

            // 操作列按钮点击事件
            $dgPanelDOM.on("change", ".datagrid-header-check :checkbox", function(e){

                // if(this.checked){
                //     theDatagrid.
                // }
                // alert(this.checked);

                if(this.checked){

                    // 切换选中提示层显示隐藏
                    // _toggleCheckedTips(theDatagrid, this.checked);
                    _pushCheckedRowsOfCurrentPage(theDatagrid);
                }else{
                    // _removeCheckedRowsOfCurrentPage(theDatagrid);
                    // theDatagrid.unselectAll();

                    // 标识 _checkedRows 数据为未选中数据

                    //theDatagrid._checkedRule = "unchecked";

                    theDatagrid.uncheckAll();
                }
            });

            // 取消勾选
            $dgPanelDOM.on("click", ".checkTip .selectAll", function(e){
                var $that = $(this);

                if($that.hasClass("uncheckAll")){
                    // 清空所有选中记录
                    // theDatagrid._checkedRows.length = 0;
                    _removeAllCheckedRows(theDatagrid);

                    // 移除class标识
                    $that.removeClass("uncheckAll");

                    // 标识 _checkedRows 数据为选中数据
                    theDatagrid._checkedRule = "checked";
                    $that.parents(".checkTip").hide();
                    // 清空记录行id的
                    // theDatagrid._checkedRowIds.length = 0;
                    // 清空记录行id的
                    // theDatagrid._uncheckedRowIds.length = 0;
                }else{
                    // ajax获取所有记录的id
                    /*$.ajax({
                        url: $tableDOM.datagrid("options").allIdUrl,
                        type: "post",
                        dataType: "json",
                        success: function(data){
                            // 将所有id记录到数组中
                            $.each(data, function(i, id){
                                _pushCheckedRows(theDatagrid, id);
                            });

                            // 勾选当前页所有行
                            theDatagrid.selectAll();

                            // check 所有行
                            theDatagrid.checkAll();

                            // 移除class标识
                            $that.addClass("uncheckAll");
                        },
                        error: function(err){
                            console.error("获取所有id失败：", err);
                        }
                    });*/

                    // 标识 _checkedRows 数据为全部数据
                    theDatagrid._checkedRule = "all";
                    // check 所有行
                    theDatagrid.checkAll();
                    // 清空记录行id的
                    // theDatagrid._checkedRowIds.length = 0;
                    // 清空记录行id的
                    // theDatagrid._uncheckedRowIds.length = 0;
                }
            });
        }

        // 初始化datagrid附加相关事件
        function _initSubjoinEventHandle(theDatagrid){
            var $tableDOM = theDatagrid._$tableDOM;
            var $dgPanelDOM = theDatagrid._$dgPanelDOM;
            // datagrid设置项
            var options = $tableDOM.datagrid("options");

            // 如果设置了列管理属性，初始化列管理相关功能
            if(options.columnManage){
                // 给按钮绑定click事件，打开列管理面板
                $("#" + options.columnManage.target).on("click", function(e){
                    // 列管理面板内容区
                    var $colMgrPanel = $("#columnManagePanelContent").children().clone();

                    // 清空列表
                    var $ul = $colMgrPanel.find(".boxCont").empty();

                    // 遍历columns数据
                    $.each(_getDatagridOptions(theDatagrid).columns[0], function(i, column){
                        // 复选框不进行排序
                        if(column.checkbox){
                            return;
                        }

                        var $li = $('<li class="boxR">' +
                                        '<span class="boxList-move f-l"></span>' +
                                        '<input class="Checkbox box-check" type="checkbox" name="caozuo" value="' + column.field + '" />'+
                                        '<span>' + column.title + '</span>'+
                                    '</li>');
                        // 设置复选框checked状态
                        $li.children(":checkbox").attr("checked", !column.hidden);
                        $li.data("column-data", column);    // 将列信息记录到data属性中
                        $ul.append($li);
                    });

                    var d = dialog({
                        title: '配置列表项',
                        content: $colMgrPanel,
                        okValue: '确定',
                        ok: function(){
                            var $ul = $colMgrPanel.find(".boxCont");

                            var columns = [];
                            var columnOrderData = [];

                            // 获取columns中是checkbox的列
                            function _getCheckboxColumn(){
                                var result = null;

                                $.each(_getDatagridOptions(theDatagrid).columns[0], function(i, column){
                                    if(column.checkbox){
                                        result = {};
                                        result.orderData = {
                                            field: column.field,
                                            hidden: column.hidden
                                        };
                                        result.column = column;
                                        return false;
                                    }
                                });

                                return result;
                            }

                            // 获取columns中是checkbox的列
                            var checkboxColumn = _getCheckboxColumn();
                            // 如果存在，将此列信息放置到此columns列表第一项
                            if(checkboxColumn){
                                columns.push(checkboxColumn.column);
                                columnOrderData.push(checkboxColumn.orderData);
                            }

                            // 记录columns设置后的数据
                            $ul.find(":checkbox").each(function(i, checkbox){
                                var field = $(checkbox).val();
                                var visible = $(checkbox).prop("checked");

                                // 按顺序记录字段位置
                                columnOrderData.push({
                                    field: field,
                                    hidden: !visible
                                });

                                // 获取列数据信息
                                var columnData = $(checkbox).closest("li").data("column-data");
                                columnData.hidden = !visible;   // 修改hidden属性
                                columns.push(columnData);
                            });

                            // 将列信息重新写入datagrid的columns中
                            _getDatagridOptions(theDatagrid).columns = [columns];

                            // dialog执行完ok回调后会自动关闭窗口，调用列管理回调不影响dialog关闭
                            setTimeout(function(){
                                options.columnManage.callback && options.columnManage.callback.call(columns, columnOrderData, columns);
                            }, 0);
                        },
                    });
                    // 模式化打开dialog
                    d.showModal();

                    // 列表添加排序功能
                    $(d.node).find(".boxCont").sortable({
                        axis: "y",
                        handle: ".boxList-move"
                    });
                });
            }
        }

        // 合并datagrid设置项
        function _mergeDatagridSettings(theDatagrid, options){
            // 合并全部属性，（主要合并基础属性）
            var newOptions = $.extend(true, {}, _dataGridDefault, options);

            $.each(newOptions.columns[0], function(i, column){
                // 设置formatter（此列的显示形式，返回html片段）
                column.formatter = function(value, row, index){
                    // 如果存在formatter，就使用formmatter，不存在直接返回value
                    return $.fn.datagrid.defaults.formatters[column.dataType] ? $.fn.datagrid.defaults.formatters[column.dataType]({
                        value: value,   // 单元格数据
                        row: row,   // 行数据
                        index: index,   // 行索引
                        column: column, // 此列的设置信息
                        dgSettings: newOptions  // datagrid的设置信息
                    }) : value;
                };

                // 如果此列不允许编辑，不进行后续处理
                if(column.editable){
                    // 设置editor属性
                    column.editor = _datagridEditors[column.dataType] && _datagridEditors[column.dataType](column);
                }
            });

            // 编辑数据后
            newOptions.onAfterEdit = function(rowIndex, rowData, changes) {
                //endEdit该方法触发此事件
                console.info(rowData);

                theDatagrid._editRowIndex = undefined;

                // 遍历columns中操作项列种的编辑按钮回调
                $.each(_getDatagridOptions(theDatagrid).columns[0], function(i, column){
                    if(column.dataType == "operate"){
                        $.each(column.operateOptions, function(j, operOpt){
                            if(operOpt.type == "edit"){
                                operOpt.callback && operOpt.callback(rowIndex, rowData, changes);
                            }
                        });
                    }
                });
            };

            // 结束编辑时
            newOptions.onEndEdit = function(index, row){
                $.each(_getDatagridOptions(theDatagrid).columns[0], function(i, column){
                    // 修改所有列类型是select的列的textField，显示值
                    if(column.dataType == "select"){
                        // 将下拉列表中的键值对对应上
                        var ed = theDatagrid._$tableDOM.datagrid('getEditor', {
                            index: index,
                            field: column.field
                        });
                        // 修改显示值
                        row[column.textField] = $(ed.target).combobox('getText');
                    }
                });
            };

            // 数据加载完成后
            newOptions.onLoadSuccess = function(data){
                // 如果所有页数据全选状态为true，进行全选操作
                // if(theDatagrid.getAllPageSelected()){
                //     theDatagrid.selectAll();
                // }else{
                //     theDatagrid.unselectAll();
                // }

                // id字段名
                var idField = _getDatagridOptions(theDatagrid).idField;

                // check规则为所有，
                if(theDatagrid._checkedRule == "all"){
                    theDatagrid.checkAll();
                }else{
                    // 遍历本页数据，是否在选中记录中，如果是，勾选本行
                    // for(var id in theDatagrid._checkedRowIds){
                        if(theDatagrid._checkedRule == "checked"){
                            $.each(theDatagrid.getDataOfCurrentPage(), function(j, row){
                                if(theDatagrid._checkedRowIds[row[idField]+""]){
                                    var rowIndex = theDatagrid._$tableDOM.datagrid("getRowIndex", row);
                                    // 通过id勾选行
                                    theDatagrid._$tableDOM.datagrid("checkRow", rowIndex);
                                }
                            });
                        }else if(theDatagrid._checkedRule == "unchecked"){
                            $.each(theDatagrid.getDataOfCurrentPage(), function(j, row){
                                if(theDatagrid._checkedRowIds[row[idField]+""] !== false){
                                    var rowIndex = theDatagrid._$tableDOM.datagrid("getRowIndex", row);
                                    // 通过id勾选行
                                    theDatagrid._$tableDOM.datagrid("checkRow", rowIndex);
                                }
                            });
                        }
                    // }
                }

                // 清空当前编辑行索引变量（每次数据重新加载，都清空此值，避免正在编辑时刷新数据，之后无法再次编辑）
                theDatagrid._editRowIndex = null;

                var $uiPageNum = theDatagrid._$dgPanelDOM.find(".pagination-num").hide();
                var $pageNumSel = $("<div class='pagination-num-sel'>");
                $uiPageNum.siblings(".pagination-num-sel").remove().end().after($pageNumSel);

                // 每页显示数量
                var options = theDatagrid._$tableDOM.datagrid("options");
                var pageSize = options.pageSize;
                var pageList = options.pageList;

                // 总页数
                var pageTotal = Math.ceil(data.total / pageSize);

                var paginationPageTotalOptions = [];
                for(var i = 0; i < pageTotal; i++){
                    paginationPageTotalOptions.push({
                        text: "第" + (i + 1) + "页",
                        value: (i + 1)
                    });
                }

                // 创建select
                $pageNumSel.select({
                    onlyShow: false,    // 非只读
                    minWidth: 70,    // 最小宽度
                    autoWidth: true,    // 自适应宽度
                    topShow: true,  // 向上展开选项
                    vals: paginationPageTotalOptions
                }).select("setValue", options.pageNumber).on("sltChange", function(e, val){
                    theDatagrid._$tableDOM.datagrid("getPager").pagination("select", val.value)
                });


                // 使用自定义下拉列表替代ui自带select
                var $uiPageSizeList = theDatagrid._$dgPanelDOM.find(".pagination-page-list").hide();
                var $pageSizeListSel = $("<div class='pagination-page-list-sel'>");
                $uiPageSizeList.siblings(".pagination-page-list-sel").remove().end().after($pageSizeListSel);

                var paginationPageSizeListOptions = [];
                for(var i = 0; i < pageList.length; i++){
                    paginationPageSizeListOptions.push({
                        text: pageList[i],
                        value: pageList[i]
                    });
                }

                // 创建select
                $pageSizeListSel.select({
                    onlyShow: false,    // 非只读
                    minWidth: 70,    // 最小宽度
                    autoWidth: true,    // 自适应宽度
                    topShow: true,  // 向上展开选项
                    vals: paginationPageSizeListOptions
                }).select("setValue", pageSize).on("sltChange", function(e, val){
                    // 更改ui中的页面大小列表
                    $uiPageSizeList.val(val.value).trigger("change");
                });

                // 设置总条数
                theDatagrid._$dgPanelDOM.find(".pagination-page-total").text(data.total);

                // 设置选中提示层内容
                _setCheckedTips(theDatagrid);
            };

            newOptions.onBeforeLoad = function(param){
                var html = '<div class="checkTip" style="display: none; position: static;">已勾选' +
                                '<span class="checkedCount">' + 0 + '</span>条,' +
                                '<a class="selectAll">' +
                                    '<span class="toggleAll">勾选全部</span>' +
                                    '<span class="total">' + 0 + '</span>条' +
                                '</a>' +
                            '</div>';
                // 追加全选所有页数据提示条
                theDatagrid._$tableDOM.closest(".panel.datagrid").find(".datagrid-header:has(td[field])")
                                        .siblings(".checkTip").remove().end()
                                        .after(html);
            };

            // 封装onSelect
            newOptions.onSelect2 = newOptions.onSelect;
            newOptions.onSelect = function(index, row){
                newOptions.onSelect2 && newOptions.onSelect2(index, row);
            };
            // 封装onUnselect
            newOptions.onUnselect2 = newOptions.onUnselect;
            newOptions.onUnselect = function(index, row){
                newOptions.onUnselect2 && newOptions.onUnselect2(index, row);
            };


            // 封装 onCheck
            newOptions.onCheck2 = newOptions.onCheck;
            newOptions.onCheck = function(index, row){
                if(row){
                    var selectRowId = row[_getDatagridOptions(theDatagrid).idField];

                    // 记录选中id
                    _pushCheckedRows(theDatagrid, selectRowId);
                }

                newOptions.onCheck2 && newOptions.onCheck2(index, row);
            };
            // 封装 onUncheck
            newOptions.onUncheck2 = newOptions.onUncheck;
            newOptions.onUncheck = function(index, row){
                // 如果check状态为all，取消check的时候，更改check状态为unchecked
                if(theDatagrid._checkedRule == "all"){
                    // 标识 _checkedRows 数据为未选中数据
                    theDatagrid._checkedRule = "unchecked";
                }

                if(row){
                    var selectRowId = row[_getDatagridOptions(theDatagrid).idField];

                    // 取消所有也全选状态
                    // theDatagrid._allPageSelected = false;
                    theDatagrid.setAllPageSelected(false);

                    // 移除记录选中id
                    _removeCheckedRows(theDatagrid, selectRowId);
                }

                newOptions.onUncheck2 && newOptions.onUncheck2(index, row);
            };

            return newOptions;
        }

        // datagrid类
        function _datagrid($tableDOM, options){
            // tableDOM对象
            this._$tableDOM = $tableDOM;
            this._$dgPanelDOM = null;

            // 获取datagrid中所有数据
            this.getAllData = function(){
                return _getAllData(this);
            };
            // 获取当前页数据
            this.getDataOfCurrentPage = function(){
                return _getDataOfCurrentPage(this);
            };
            // 获取选中行数据
            this.getSelectionsData = function(){
                return _getSelectionsData(this);
            };
            // 获取未选中的数据
            this.getUnselectData = function(){
                return _getUnselectData(this);
            };
            // 反选数据行（选中的取消选中，未选中的选中）
            /*this.toggleSelections = function(){
                _toggleSelections(this);
            };*/
            // 选中所有行
            this.selectAll = function(){
                _selectAll(this);
            };
            // 取消选中行
            this.unselectAll = function(){
                _unselectAll(this);
            };
            // 选中所有行
            this.checkAll = function(){
                _checkAll(this);
            };
            // 取消选中行
            this.uncheckAll = function(){
                _uncheckAll(this);
            };
            // 刷新datagrid网格
            this.refreshDatagrid = function(){
                return _refreshDatagrid(this);
            };
            // 重新加载数据，传入queryParams，传递参数加载（保持在当页面，queryParams会替换掉options中的queryParams）
            this.loadData = function(queryParams){
                return _loadData(this, queryParams);
            };
            // 重新渲染datagrid
            this.renderDatagrid = function(){
                return _renderDatagrid(this);
            };
            // 跳转页面
            this.jumpTo = function(pageNum){
                return _jumpTo(this, pageNum);
            };
            // 获取columns列设置信息副本
            this.getColumnsConfig = function(){
                return $.extend(true, {}, _getDatagridOptions(this)["columns"][0]);
            };

            // 当前编辑的行
            this._editRowIndex = null;

            // 是否所有页数据都被选中
            var _allPageSelected = false;
            this.getAllPageSelected = function(){
                return _allPageSelected;
            };
            this.setAllPageSelected = function(allPageSelected){
                _allPageSelected = allPageSelected;
                if(_allPageSelected){
                    this.selectAll();
                }
            };

            // 删除行操作
            this.deleteRow = function(index){
                return _deleteRow(this, index);
            };

            // 添加行操作
            this.appendRow = function(rowData){
                return _appendRow(this, rowData || {});
            };


            // 记录选中项id
            // this._checkedRows = [];

            // 选中行数据规则，标识 _checkedRows 里的内容为选中数据还是未选中数据
            this._checkedRule = "checked";
            // check行记录
            this._checkedRowIds = {};
            // this._uncheckedRowIds = [];

            // 获取check的行id
            this.getCheckedRowIds = function(){
                var ids = [];

                for(var id in this._checkedRowIds){
                    if(this._checkedRowIds[id+""]){
                        ids.push(id+"");
                    }
                }

                return ids;
            };
            // 获取uncheck的行id
            this.getUncheckedRowIds = function(){
                var ids = [];

                for(var id in this._checkedRowIds){
                    if(!this._checkedRowIds[id+""]){
                        ids.push(id+"");
                    }
                }

                return ids;
            };

            // 合并单元格设置项
            var operation = _mergeDatagridSettings(this, options);

            // 创建datagrid
            $tableDOM.datagrid(operation);

            // 替换分页条相关内容
            _replacePaginationBar(this);

            // 生成datagrid后，显示在页面中的网格对象
            this._$dgPanelDOM = $tableDOM.datagrid("getPanel");

            // 初始化table中相关元素相关事件（在创建datagrid之后执行）
            _initEventHandle(this);

            // 初始化附件相关事件
            _initSubjoinEventHandle(this);
        };

        // 替换分页条相关内容
        function _replacePaginationBar(theDatagrid){
            var options = theDatagrid._$tableDOM.datagrid("options");

            // 如果datagrid中有分页条的话，设置分页条配置
            if(options.pagination){
                var _paginationDefault = {
                    buttons: [],
                    layout: [
                        "list",
                        "first",
                        "prev",
                        "manual",
                        "next",
                        "last"
                    ],
                    beforePageText: "",
                    afterPageText: "",
                    displayMsg: ""
                };

                var $pagination = theDatagrid._$tableDOM.datagrid("getPager").pagination(_paginationDefault);
                // 设置分页条布局
                $pagination.find("td>a:has(span.pagination-first)").addClass("pagination_first").linkbutton({
                    iconCls: "",
                    text: "首页"
                }).end().find("td>a:has(span.pagination-prev)").addClass("pagination_prev").linkbutton({
                    iconCls: "",
                    text: "上一页"
                }).end().find("td>a:has(span.pagination-next)").addClass("pagination_next").linkbutton({
                    iconCls: "",
                    text: "下一页"
                }).end().find("td>a:has(span.pagination-last)").addClass("pagination_last").linkbutton({
                    iconCls: "",
                    text: "尾页"
                }).end().find("select.pagination-page-list").before("<span class='pagination-page-list-preText'>每页</span>").after("<span>条</span>").after("<span class='pagination-page-total'>0</span>").after("<span>条，共</span>");
            }
        }

        // 获取可筛选的列信息
        function _getColumnsByFilterable(columns){
            var result = [];

            $.each(columns, function(i, column){
                if(column.advanceFilter){
                    result.push(column);
                }
            });

            return result;
        }

        // 获取所有数据
        function _getAllData(theDatagrid){
            return theDatagrid._$tableDOM.datagrid("getData");
        }

        // 获取本页所有行数据
        function _getDataOfCurrentPage(theDatagrid){
            return theDatagrid._$tableDOM.datagrid("getRows");
        }

        // 获取选中的数据
        function _getSelectionsData(theDatagrid){
            return theDatagrid._$tableDOM.datagrid("getSelections");
        }

        // 获取未选中的数据
        function _getUnselectData(theDatagrid){
            // 获取本页面所有行数据
            var pageRows = _getDataOfCurrentPage(theDatagrid);
            // 获取所有选中行数据
            var selectRows = _getSelectionsData(theDatagrid);
            // 记录未选中的行数据
            var unselectRows = [];

            // 获取id字段名，用于比较数据
            var idField = theDatagrid._$tableDOM.datagrid("options")["idField"];
            $.each(pageRows, function(i, pageRow){
                var isExist = false;

                // 如果页面选中行数据不存在当前页所有行中，记录下来
                $.each(selectRows, function(j, slectRow){
                    if(pageRow[idField] == slectRow[idField]){
                        isExist = true;
                        return false;
                    }
                });

                // 如果不存在，追加到未选中行集合中
                if(!isExist){
                    unselectRows.push(pageRow);
                }
            });

            return unselectRows;
        }

        // 反选数据行（选中的取消选中，未选中的选中）
        function _toggleSelections(theDatagrid){
            // 获取未选中行数据
            var unselectRows = _getUnselectData(theDatagrid);

            // 取消选中行
            // _unselectAll(theDatagrid);
            // _uncheckAll(theDatagrid);

            var $tableDOM = theDatagrid._$tableDOM;
            // id字段名
            var idField = $tableDOM.datagrid("options")["idField"];
            $.each(unselectRows, function(i, unselectRow){
                $tableDOM.datagrid("selectRecord", unselectRow[idField])
            });
        }

        // 选中所有行
        function _selectAll(theDatagrid){
            // 调用onSelect
            var onSelect = _getDatagridOptions(theDatagrid).onSelect2;
            onSelect && onSelect();

            // 将本页所有数据id记录下来
            // _pushCheckedRowsOfCurrentPage(theDatagrid);

            return theDatagrid._$tableDOM.datagrid("selectAll");
        }

        // 取消选中所有行
        function _unselectAll(theDatagrid){
            // 调用onSelect
            var onUnselect = _getDatagridOptions(theDatagrid).onUnselect2;
            onUnselect && onUnselect();

            // 移除本页所有数据id记录
            // _removeCheckedRowsOfCurrentPage(theDatagrid);

            return theDatagrid._$tableDOM.datagrid("unselectAll");
        }

        // 选中所有行
        function _checkAll(theDatagrid){
            // 将本页所有数据id记录下来
            _pushCheckedRowsOfCurrentPage(theDatagrid);

            return theDatagrid._$tableDOM.datagrid("checkAll");
        }

        // 取消选中所有行
        function _uncheckAll(theDatagrid){
            // 移除本页所有数据id记录
            _removeCheckedRowsOfCurrentPage(theDatagrid);

            return theDatagrid._$tableDOM.datagrid("uncheckAll");
        }

        // 刷新datagrid网格
        function _refreshDatagrid(theDatagrid){
            return theDatagrid._$tableDOM.datagrid("reload");
        }

        // 通过查询参数重新加载数据，传入queryParams，传递参数加载（保持在当页面，queryParams会替换掉options中的queryParams）
        function _loadData(theDatagrid, queryParams){
            _toggleCheckedTips(theDatagrid,false)
            return theDatagrid._$tableDOM.datagrid("reload", queryParams);

        }

        // 重新渲染datagrid
        function _renderDatagrid(theDatagrid){
            // 获取datagrid的options属性
            var options = theDatagrid._$tableDOM.datagrid("options");

            // 重新生成datagrid网格
            theDatagrid._$tableDOM.datagrid(options);

            // 替换分页条相关内容
            _replacePaginationBar(theDatagrid);
        }

        // 跳转页面
        function _jumpTo(theDatagrid, pageNum){
            // 获取datagrid上的分页条对象
            var pager = theDatagrid._$tableDOM.datagrid("getPager");

            if(pageNum == "first"){
                // 跳转到第一页：<=1都可以
                pager.pagination("select", 1);
            }else if(pageNum == "last"){
                // 跳转到最后一页：>=最后一页页码就行
                pager.pagination("select", pager.pagination("options").total);
            }else{
                // 跳转到指定页码
                pager.pagination("select", pageNum);
            }
        }

        // 获取datagrid设置项信息
        function _getDatagridOptions(theDatagrid){
            // 获取datagrid上的列属性副本
            return theDatagrid._$tableDOM.datagrid("options");
        }

        // 删除行操作
        function _deleteRow(theDatagrid, ids){
            // 获取该索引对应的行数据
            // var rowData = _getRowDataByIndex(theDatagrid, ids);
            // 删除记录中的数据
            if(typeof(ids) == "array"){
                $.each(function(i, item){
                    delete theDatagrid._checkedRowIds[item];
                });
            }else{
                delete theDatagrid._checkedRowIds[ids];
            }

            theDatagrid.loadData();
            // delete theDatagrid._checkedRowIds[rowData[theDatagrid._$tableDOM.datagrid("options").idField]];

            // 删除行
            // theDatagrid._$tableDOM.datagrid("deleteRow", index);
        }

        // 通过索引获取行数据
        function _getRowDataByIndex(theDatagrid, index){
            return _getDataOfCurrentPage(theDatagrid)[index];
        }

        // 追加行，并进行编辑
        function _appendRow(theDatagrid, rowData){
            // 添加新行
            theDatagrid._$tableDOM.datagrid("appendRow", rowData);

            // 编辑新行
            // theDatagrid._$tableDOM.datagrid("beginEdit");
            theDatagrid._$dgPanelDOM.find(".datagrid-btable tr.datagrid-row:last [data-operate=\"edit\"]").trigger("click");
        }

        function _pushCheckedRows(theDatagrid, id){
            // 如果为单选模式，不进行后续操作
            if(_getDatagridOptions(theDatagrid).singleSelect){
                console.log(222,id)
                theDatagrid._checkedRowIds={};
                theDatagrid._checkedRowIds[id+""] = true;

                return;
            }

            var selectRowId = id;

            // 如果id没有值，不记录
            if(selectRowId === null || selectRowId === undefined || selectRowId === ""){
                return;
            }

            // 此记录id的check状态为记录选中
            theDatagrid._checkedRowIds[id+""] = true;

            /*var isExist = false;
            $.each(theDatagrid._checkedRows, function(i, id){
                if(id == selectRowId){
                    isExist = true;
                    return false;
                }
            });
            if(!isExist){
                theDatagrid._checkedRows.push(selectRowId);
            }*/

            // 设置选中提示层内容
            _setCheckedTips(theDatagrid);
        }
        function _removeCheckedRows(theDatagrid, id){
            var selectRowId = id;

            /*if(theDatagrid._checkedRule == "uncheckAll"){
                theDatagrid._uncheckedRowIds.push(id);
            }*/

            theDatagrid._checkedRowIds[id+""] = false;

            /*$.each(theDatagrid._checkedRows, function(i, id){
                if(id == selectRowId){
                    theDatagrid._checkedRows.splice(i, 1);
                    return false;
                }
            });*/

            // 设置选中提示层内容
            _setCheckedTips(theDatagrid);
        }
        function _pushCheckedRowsOfCurrentPage(theDatagrid){
            var idField = _getDatagridOptions(theDatagrid).idField;

            $.each(_getDataOfCurrentPage(theDatagrid), function(i, row){
                _pushCheckedRows(theDatagrid, row[idField]);
            });
        }
        function _removeCheckedRowsOfCurrentPage(theDatagrid){
            var idField = _getDatagridOptions(theDatagrid).idField;

            $.each(_getDataOfCurrentPage(theDatagrid), function(i, row){
                _removeCheckedRows(theDatagrid, row[idField]);
            });

            // 取消选中行
            // theDatagrid.unselectAll();
        }
        function _removeAllCheckedRows(theDatagrid){
            // theDatagrid._checkedRows.length = 0;

            // 设置选中提示层内容
            // _setCheckedTips(theDatagrid);

            // 取消选中行
            // theDatagrid.unselectAll();

            // 取消check所有行
            theDatagrid.uncheckAll();
        }

        // 切换选中提示层显示隐藏
        function _toggleCheckedTips(theDatagrid, visible){
            theDatagrid._$dgPanelDOM.find(".datagrid-view .checkTip").toggle(visible);
        }

        // 设置选中提示层内容
        function _setCheckedTips(theDatagrid){
            // 如果为单选模式，不进行后续操作
            if(_getDatagridOptions(theDatagrid).singleSelect){
                return;
            }

            // 获取所有check选中的行id
            var checkedRowIds = theDatagrid.getCheckedRowIds();
            // 获取所有uncheck未选中的行id
            var uncheckedRowIds = theDatagrid.getUncheckedRowIds();
            var $tips = theDatagrid._$dgPanelDOM.find(".datagrid-view .checkTip");
            // 总行数
            var rowTotal = theDatagrid._$tableDOM.datagrid("getPager").pagination("options").total;

            var checkRule = theDatagrid._checkedRule;
            // 全选状态
            if(checkRule == "all"){
                // 选中条数
                $tips.find(".checkedCount").text(rowTotal);
                $tips.toggle(true);
            }else if(checkRule == "unchecked"){ // 未选中状态
                // 选中条数
                $tips.find(".checkedCount").text(rowTotal - uncheckedRowIds.length);
                $tips.toggle(rowTotal - uncheckedRowIds.length > 0);
            }else{  // 选中状态
                // 选中条数
                $tips.find(".checkedCount").text(checkedRowIds.length);
                $tips.toggle(checkedRowIds.length > 0);
            }

            // 总条数
            $tips.find(".total").text(rowTotal);

            if(checkRule == "all"){
                // theDatagrid._checkedRule = "all";

                // 设置勾选反选文字
                $tips.find(".toggleAll").text("取消勾选");

                // 切换勾选反选按钮class
                $tips.find(".selectAll").addClass("uncheckAll");
            }else{
                // 设置勾选反选文字
                $tips.find(".toggleAll").text("勾选全部");
                // 切换勾选反选按钮class
                $tips.find(".selectAll").removeClass("uncheckAll");
            }

            // 如果选中行数提醒层可见

            if($("ul.Tab-ul").hasClass("Tab-ul")){
                $tips.closest(".datagrid-view").height($(window).height()-185).css("overflow-y","auto");
                $(".datagrid-body").height($(window).height()-210).css({
                    "maxHeight":$(window).height()-210,
                    "minHeight":$(window).height()-210
                });
            }else{
                $tips.closest(".datagrid-view").height($(window).height()-136).css("overflow-y","auto");
                $(".datagrid-body").height($(window).height()-161);
            }
            //if($tips.is(":visible")){

            //}else{
            //    $tips.closest(".datagrid-view").height($(window).height()-136);
            //}

        }


        exports.datagrid = function($tableDOM, options){
            return new _datagrid($tableDOM, options);
        };


    });
