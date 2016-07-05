/**
 * Created by lenovo on 2016/5/16.
 */
define(function (require,exports,module) {
    //
    //引入dialog提示层
    var box = require('../widgets/dialogs')
    //引入颜色选择器
    var colPick = require('../widgets/colorPick');
    //引入输入验证
    var valid = require('../widgets/valid');
    //引入提示
    var waring = require("../main");
    //引入行编辑
    var inlineedit = require('../widgets/inlineEdit');
    //需要设色器插件的的在此处调用一次
    colPick.colorPickInit($('.picker'));
    if($(window).height() < 286){
        $(".labelOuter").height(500);
        $(".add-hiddenBox").height(425).css({"overflow-y":"auto","width":"100%"});
    }else{
        $(".labelOuter").height($(window).height()-54);
        $(".add-hiddenBox").height($(window).height()-129).css({"overflow-y":"auto","width":"100%"});
    }


    (function () {
        $(".add-hiddenBox").find("input").each(function (i) {
            $(this).attr("v",$(this).val());
        });
        var creat = true;
        //新增按钮,事件处理
        $(".labelAdd,.levelAdd").click(function () {
            if (creat){
                $(".add-hiddenBox").append($(".hiddenBox>li").clone());
                colPick.colorPickInit($('.picker'));//需要设色器插件的，在此处在调用一次
            }
            creat = false;
        });
        //输入框验证
        var iSsave;
        var waringWord = {"picker":"请选择正确的颜色值","memberName":"请输入1-20内的中文,英文,_和_"}
        $(".add-hiddenBox").on("blur","input", function () {
            if($(this).hasClass("picker")){
                message = waringWord.picker;
            }else {
                message = waringWord.memberName;
            }
            iSsave=valid.valid({
                dom:$(this),
                def: function () {
                    waring.warningHide("handleDefault", message, 3000);
                },
                success: function () {
                }
            })
        })
        //保存按钮,事件处理
        $(".add-hiddenBox").on("click",".saveButton", function () {
            //获取this指针,同时获取input值
            var _this = $(this);
            var id = _this.parents('.labelList').find('input:eq(0)').attr('tag_id');
            var type = _this.parents('.labelList').find('input:eq(0)').attr('tag_type');
            var name = _this.parents('.labelList').find('input:eq(1)').val();
            var bg_color = _this.parents('.labelList').find('input:eq(2)').val();
            var color = _this.parents('.labelList').find('input:eq(3)').val();
            if(iSsave.status()){
                if(_this.attr("data-state")){
                    //调用标签添加接口添加数据
                    $.post("/index.php/Tag/Index/add",{"name":name,"bg_color":bg_color,"color":color,"type":type}, function (info) {
                        var data = $.parseJSON(info);
                        if (data.status){
                            //更新成功时调用
                            creat = true;
                            _this.parents('.labelList').find('input:eq(0)').attr('tag_id',data.status);
                            inlineedit.changestate({thisDom:_this,state: "save"});//在ajax上传成功后调用此方法
                            warningHide("handleSuccess", data.info, 2000);
                        }else{
                            //更新失败时调用
                            warningHide("handleDefault", data.info, 2000);
                        }
                    });
                }else{
                    //调用标签更新接口,更新数据
                    $.post("/index.php/Tag/Index/update",{"id":id,"name":name,"bg_color":bg_color,"color":color,"type":type}, function (info) {
                        var data = $.parseJSON(info);
                        if (data.status == true){
                            //更新成功时调用
                            inlineedit.changestate({thisDom:_this,state: "save"});//在ajax上传成功后调用此方法
                            warningHide("handleSuccess", data.info, 2000);
                        }else{
                            //更新失败时调用
                            warningHide("handleDefault", data.info, 2000);
                        }
                    });
                }
            }

        })
        //取消按钮,事件处理
        $(".add-hiddenBox").on("click",".cancelButton", function () {
            var _this = $(this);
            var creatNew = inlineedit.changestate({thisDom:_this,state: "cancel"});
            if(creatNew.creat()) creat=true;
        })
        //删除按钮,事件处理
        $(".add-hiddenBox").on("click",".deleteBtn", function () {
            //获取this指针,同时获取input值
            var _this = $(this);
            var id = _this.parents('.labelList').find('input:eq(0)').attr('tag_id');
            box.showConfirm({title:"删除提示", content:"是否删除这些数据?",width:300,subTxt:"确认",cancelTxt:"取消",ok: function () {
                //调用标签删除接口,更新数据
                $.post("/index.php/Tag/Index/delete",{"id":id}, function (info) {
                    var data = $.parseJSON(info);
                    if (data.status == true){
                        //删除成功时调用
                        _this.parents(".labelList,.levelList").parent("li").remove();//在ajax上传成功后调用此方法
                        warningHide("handleSuccess", data.info, 2000);
                    }else{
                        //删除失败时调用
                        warningHide("handleDefault", data.info, 2000);
                    }
                });
            }});
        })
        //编辑按钮,事件处理
        $(".add-hiddenBox").on("click",".editBtn", function () {
            var _this = $(this)
            inlineedit.edit({thisDom:_this});
        });
        //AJAX提示
        function warningHide(classname, txt, delay) {
            $(".handleWarning").attr("class", "handleWarning " + classname).text(txt).show()
            if (classname != "handleLoad") {
                setTimeout(function () {
                    $(".handleWarning").fadeOut()
                }, delay)
            }
        }
    })();
    // 点击刷新
    $(".refreshBtn").on("click",function(){
        window.location.reload();
    });
    $(".labelOuter").height($(window).height()-56).css("overflow","auto");
})