/**
 * Created by qiguozheng on 2016/5/18.
 */
//调用
define(function(require, exports, module) {

    //引入依赖
    var event = require('./event');
    var waring = require("../main");
    var dialogs = require("../widgets/dialogs");
    var advanceFilter = require("../widgets/advancefilter");
    var pageParam = require("PageParam");
    var advanceSearchFields=pageParam.getParamByKey("/Public/js/app/desktop").advanceSearchFields;
    require('jqueryForm');

    //定义iframe尺寸
    dialogs.frameSize = {
        L: {
            width: 870,
        },
        M: {
            width: 650
        },
        S: {
            width: 450
        }

    };


    //通过UID获取关联元素
    function UID(id) {
        return $('[UID=' + id + ']');
    };

    //创建下拉框
    function createSelect(d) {
        var str = '';
        $.each(d, function(i, v) {
            str += '<dd data-id=' + v.id + ' ><i class=status' + v.isChecked + '></i>' + v.text + '</dd>'
        });
        $(this).next('.labellist').find('dl').html('').append(str);
    };



/*
    //创建下拉框
    function createSelect(d) {
        var str = '';
        var aO=[];
        $.each(d, function(i, v) {
            // str += '<dd data-id=' + v.id + ' ><i class=status' + v.isChecked + '></i>' + v.text + '</dd>'
            var $obj=$("<dd data-id="+v.id+">").append(
                $("<i>").addClass("status"+v.isChecked)
            ).append(
                $("<span>").html(v.text)
            );
            aO.push($obj);
        });
        console.log(aO);
        // $(this).next('.labellist').find('dl').html('').append(str);
        $(this).next('.labellist').find('dl').html('');
        var _this=this;
        $.each(aO,function(i,o){
            $(_this).next('.labellist').find('dl').append($(o));
        });

    };
    */

    //下拉框元素点击事件
    $('.labellist').on('click', 'dd', function() {
        var that = this;
        var checkId = top.finder.getCheckedRowIds();
        if (checkId.length === 0) {
            waring.warningHide("handleDefault", "请选择数据！", 2000);
            return false;
        }


        var status = '';
        switch ($(this).find('i')[0].className) {
            case 'status1':
                {
                    status = '1';
                    break;
                }
            case 'status2':
                {
                    status = '2'
                    break;
                }
            default:
                {
                    status = '0';
                    break;
                }

        }

        postTag.call(this, {
            status: status,
            id: $(that).attr('data-id')
        });


    });

    //请求标签


    var postTagUrl='';

        var postTag = function(status) {
            var that = this;
            var checkedData = getCheckedData();
            checkedData.tagId = status.id;
            checkedData.status = status.status == 0 ? 2 : 0;
            checkedData.type = 'saveTagData';
            $.post(postTagUrl, checkedData, function(res) {
                var $i = $(that).find('i');
                if (!res.status) {
                    waring.warningHide("handleDefault", "操作失败！", 2000)
                    return false;
                }
                if ($i.hasClass('status0')) {
                    $i[0].className = "status2";
                } else {
                    $i[0].className = "status0 ";
                }

                top.finder.loadData();
            }, 'json')
        }




    //快捷搜索下拉
    $('.listSearch').mouseover(function() {
        $(this).find('ul').show();
    })
    $('.listSearch').mouseout(function() {
        $(this).find('ul').hide();
    })
    $('.listSearch li').click(function() {
        var $parent = $(this).parents('.listSearch');
        $parent.find('input').val($(this).attr('v'));
        $parent.find('span').html($(this).html());
        $parent.find('ul').hide();
    })

    //获取列表勾选数据
    function getCheckedData() {
        var checkRule = top.finder._checkedRule;
        var ids;
        if (checkRule == 'checked') {
            ids = top.finder.getCheckedRowIds();
        } else {
            ids = top.finder.getUncheckedRowIds();
        }
        if (checkRule == "checked") {
            checkRule = "in";
        }
        if (checkRule == "unchecked") {
            checkRule = "not in";
        }

        return $.extend({},{checkRule: checkRule,
            ids: ids},whereFn.mergeWhere())
    };

    //创建iframBtn按钮
    event.addModule('iframeBtn', function(arg, uid) {
        //打开iframe窗口
        dialogs.showIframe({
            title: arg.title,
            width: dialogs.frameSize[arg.size].width,
            url: arg.url
        })
    });

    //创建window.open按钮
    event.addModule('windowOpenBtn', function(arg) {

        var height=arg.height;
        var width=arg.width;
        var url =arg.url;
        var iTop = (window.screen.availHeight-30-height)/2; //获得窗口的垂直位置;
        var iLeft = (window.screen.availWidth-10-width)/2; //获得窗口的水平位置;
        window.open(url, '', 'height='+height+', width='+width+', top='+iTop+', left='+iLeft+', toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no');
        //window.open(arg.url, '', 'height=' + arg.height + ', width=' + arg.width + ', top=0, left=0, toolbar=no, menubar=no, scrollbars=yes, resizable=no, location=no, status=no');

    });

    //创建window.location按钮
    event.addModule('locationBtn', function(arg) {
        window.location = arg.url;
    })

    //创建refresh按钮
    event.addModule('refreshBtn', function(arg) {
        top.finder.loadData();
    })

    //创建删除按钮
    event.addModule('deleteBtn', function(arg) {
        dialogs.showConfirm({
            title: "删除提示",
            width: 500,
            content: "是否删除这些数据？",
            ok: function() {
                var oCheckData = getCheckedData();
                //获取列表勾选规则：
                $.post(arg.url, oCheckData, function(res) {

                    if (res.status) {
                        if (arg.isRefresh) {
                            top.finder.deleteRow(oCheckData.ids);
                        }
                        waring.warningHide("handleSuccess", "操作成功！", 2000);
                    } else {
                        waring.warningHide("handleDefault", "操作失败！", 2000);
                    }
                }, "json")
            }
        })
    })

    //创建ajax按钮
    event.addModule('ajaxBtn', function(arg) {
        var oCheckData = getCheckedData();
        $.post(arg.url, oCheckData, function(res) {
            if (res.status) {
                window.waring.warningHide("handleSuccess", "操作成功！", 2000);
                if (arg.isRefresh) {
                    top.finder.loadData();
                }
            } else {
                waring.warningHide("handleDefault", "操作失败！", 2000)
                return false;
            }
        }, "json")
    })


    //tagMenu

    event.addModule('filterBtn', function(arg) {
        where.advancedFilter={}
        where.quickFilter={}
        where.tabFilter = {};
        where.tabFilter = $.parseJSON($(this).attr('data-custom')).filter;
        top.finder.loadData(whereFn.mergeWhere());
    })

    //创建下拉菜单
    event.addModule('tag', function(arg) {
        var that = this;
        var oCheckData = getCheckedData();
        oCheckData.type = "getTagData";
        $.post(arg.url, oCheckData, function(res) {
            if (res.status) {
                postTagUrl=arg.url;
                createSelect.call(that, res.data);
            } else {
                waring.warningHide("handleDefault", "读取数据失败！", 2000)
            }
        }, 'json')

    }, 'mouseover')

    //普通按钮组



    event.addModule('sendSelectData', function(arg) {
        var checkId = top.finder.getCheckedRowIds();
        if (checkId.length == 0) {
            waring.warningHide("handleDefault", "请选择数据！", 2000)
        } else {
            var checkedData = getCheckedData();
            checkedData.findername = arg.findername;
            window.opener.getSelectData(checkedData);
            self.close();
        }
    })

    //初始化功能按钮
    event.init();

    //调用列表回传勾选数据
    var where = {
        tabFilter: {},
        quickFilter: {},
        advancedFilter: {}
    }


    $('.searchIcon').click(function() {
            var valJson= $.parseJSON($('.listSearch input').val());
            where.advancedFilter={};
            valJson.value=$('.searchTxt').find('input').val();
             where.quickFilter[0]=valJson;
        
            top.finder.loadData(whereFn.mergeWhere());
    })

    $('.searchSet .gen-sureBtn').click(function() {
        var $parent = $(this).parents('.searchSet');
        where.quickFilter = {};
        where.advancedFilter={};
        $(".filterForm").ajaxSubmit({
            dataType:"json",
            success:function(res){
                where.advancedFilter=res;
                top.finder.loadData(whereFn.mergeWhere());
            }
        });

    })

    exports.where=where;

    var whereFn = function() {
        var getWhere = function() {

            return {filter:where};
        }

        var mergeWhere = function() {



            return {filter:where};

/*
            return {
                filter:where
            }*/

        /*    var _arr = [];
            $.each(where, function(i, v) {
                if (Object.prototype.toString.call(v) == '[object Object]' && !$.isEmptyObject(v)) {

                    if (v.filter) {
                        _arr.push(v.filter);
                    }else{
                        _arr.push(v);
                    }

                };
                if (Object.prototype.toString.call(v) == '[object Array]' && v.length) {

                    $.each(v, function(a, b) {
                        _arr.push(b);
                    })
                };
            })

            if(!_arr.length){
                return {
                    filter:{}
                };
            }*/

       /*     _arr.unshift({});


            return {
                filter: $.extend.apply(null,_arr)
            };*/
        }

        return {
            getWhere: getWhere,
            mergeWhere: mergeWhere
        }
    }();




    if(advanceSearchFields != undefined ){
        advanceFilter.initAdvanceFilter($("#advanceFilterPanel"), advanceSearchFields, {
            openTarget: "openAdvanceFilterPanel"	// 调用打开高级筛选面板的元素id
        });
    }





    $(".Tab-li").click(function() {
        if (!$(this).hasClass("Tab-li-select")) {
            $(this).addClass("Tab-li-select").siblings().removeClass("Tab-li-select");
        }
    });

    //给订单列表添加下拉事件
    $("body").on("click", ".handle-list",function(event) {
        event.stopPropagation();
        if($(this).children(".order-proce").css("display") == "none"){
            $(".order-proce").hide();//所有的隐藏，当前的显示
            $(this).children(".order-proce").show();
            $(".handle-list").find("i.arrow").css("border", "none");//所有的隐藏，当前的显示
            $(this).find("i.arrow").css("border", "1px solid #ccc").css("borderBottom", "1px solid #fff");
            $(this).parents(".datagrid-cell").css("overflow", "visible");
        }else{
            $(this).children(".order-proce").hide();
            $(this).find("i.arrow").css("border", "none");
            $(this).parents(".datagrid-cell").css("overflow", "hidden");
        }
    });
    $(document).on("click", function () {
        $(".order-proce").hide();//所有的隐藏
        $(".handle-list").find("i.arrow").css("border", "none");
    });

})