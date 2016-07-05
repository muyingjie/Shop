/**
 * Created by lenovo on 2016/5/4.
 */
    define(function (require, exports, module) {
        
        var easyui = require("easyui");
        var dialog = require('../libs/plugs/dialog/dialog-plus');
        var datagrid = require('../widgets/datagrid');
        var Calendar = require('../widgets/calendar_w');
        var colorPick = require("../widgets/colorPick");



        // 列数据类型（dataType）展示形式配置
        // 数据网格formatter映射（网格内容展示时列内容显示形式）
        $.fn.datagrid.defaults.formatters = $.extend($.fn.datagrid.defaults.formatters, {
            /*
                params: {
                    value: value,   // 单元格数据
                    row: row,   // 行数据
                    index: index,   // 行索引
                    column: column, // 此列的设置信息
                    dgSettings: newOptions  // datagrid的设置信息
                }
            */
            // id类型的列
            id: function(params){
                return '<img src="/Public/images/view.png" data-id="' + params.value + '" class="' + (params.column.openDetail ? "openDetailDialog" : '') + '" />';
            },
            // 图片类型的列
            image: function(params){
                return '<img src="images/thumbnail.png" data-path="' + params.value + '" class="previewThumbnailImage" alt2="' + params.value + '" />';
            },
            // 下拉列表类型的列
            select: function(params){
                // 返回key对应的value数据
                return params.row[params.column.textField];
            },
            // 操作项列
            operate: function(params){
                var operateHtml = "";

                if(params.column.layoutType == "vertical"){
                    // 将索引和id信息记录在div的data属性上
                    operateHtml = '<div class="order-handle operate_buttons operate_buttons_vertical" data-index="' + params.index + '" data-id="' + params.row[params.dgSettings.idField] + '">';
                    operateHtml += '<span class="handle-list">' + params.column.operateTitle + '<i id="2" class="arrow"></i>';
                    operateHtml += '<ul class="order-proce">';

                    $.each(params.column.operateOptions, function(i, option){
                        operateHtml += "<li class='operateButton operateButton_" + option.type + "' data-operate='" + option.type + "'>" + option.title + "</li> ";
                    });

                    operateHtml += "</ul></span></div>";

                    operateHtml += "<div class='operate_editing_buttons operateButton' style='display: none;'><a class='editCompleted operateButton' href='javascript:void(0);'>确定</a> <a class='editCancel' href='javascript:void(0);'>取消</a></div>";

                }else{
                    // 将索引和id信息记录在div的data属性上
                    operateHtml = "<div class='operate_buttons levelTopList1' data-index='" + params.index + "' data-id='" + params.row[params.dgSettings.idField] + "'>";

                    $.each(params.column.operateOptions, function(i, option){
                        operateHtml += "<div href='javascript:void(0);' class='operateButton operateButton_" + option.type + " levelOpera f-l' data-operate='" + option.type + "'>" + option.title + "</div> ";
                    });

                    operateHtml += "</div>";

                    operateHtml += "<div class='operate_editing_buttons operateButton levelTopList1' style='display: none;'>" +
                                        "<a class='editCompleted operateButton f-l gen-sureBtn levelMarginR' href='javascript:void(0);'>确定</a> " +
                                        "<a class='editCancel f-l gen-cancelBtn' href='javascript:void(0);'>取消</a>" +
                                    "</div>";

                }

                return operateHtml;
            }
        });

        // 列数据类型（dataType）和行内编辑editor关联映射（编辑网格内容时的列数据类型（dataType）对应显示的编辑器显示形式）
        $.fn.datagrid.defaults.dataTypeEditorRelationMap = $.extend($.fn.datagrid.defaults.dataTypeEditorRelationMap, {
            /**
                column: // 列设置信息
            */
            
            // 列数据类型（dataType）为select
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
        });

        // 重写行内编辑相关
        $.fn.datagrid.defaults.editors = $.extend($.fn.datagrid.defaults.editors, {
            // editor类型为datebox
            datebox: {
                init: function(container, options){
                    var input = $('<input type="text" class="datagrid-editable-input">').appendTo(container);

                    Calendar.calendarInit({ 
                        inputField : input[0],    //显示日期值的元素id
                        trigger : input[0]    //触发日历控件的元素id
                    });

                    return input;
                },
                getValue: function(target){
                    return $(target).val();
                },
                setValue: function(target, value){
                    $(target).val(value);
                },
                resize: function(target, width){
                    var input = $(target);
                    if($.boxModel == true){
                        input.width(width - (input.outerWidth() - input.width()));
                    }else{
                        input.width(width);
                    }
                }
            },
            colorbox: {
                init: function(container, options){
                    var input = $('<input type="text" class="datagrid-editable-input">').appendTo(container);

                    colorPick.colorPickInit(input);

                    return input;
                },
                getValue: function(target){
                    return $(target).val();
                },
                setValue: function(target, value){
                    $(target).val(value);
                },
                resize: function(target, width){
                    var input = $(target);
                    if($.boxModel == true){
                        input.width(width - (input.outerWidth() - input.width()));
                    }else{
                        input.width(width);
                    }
                }
            },
            image: {
                init: function(container, options){
                    var input = $('<input type="text" class="datagrid-editable-input">').appendTo(container);

                    input.on("click", function(e){
                        // 此处编写打开图片替换窗口，修改此列值，直接调用 input.val(newVal);

                        input.val("2222222222222.png");
                    });

                    return input;
                },
                getValue: function(target){
                    return $(target).val();
                },
                setValue: function(target, value){
                    $(target).val(value);
                },
                resize: function(target, width){
                    var input = $(target);
                    if($.boxModel == true){
                        input.width(width - (input.outerWidth() - input.width()));
                    }else{
                        input.width(width);
                    }
                }
            }
        });


        // datagrid所用的的callback，下边的函数都是datagrid内部调用的
        $.fn.datagrid.defaults.callbacks = $.extend($.fn.datagrid.defaults.callbacks, {
            // 打开详细窗口
            /**
                id: 此条数据的id值
            */
            openDetailDialog: function(id){
                alert("打开详细数据窗口：" + id);
            }
        });

    });
