/**
 * Created by lenovo on 2016/5/16.
 */
define(function (require,exports,module) {
    //
    var colPick = require('../widgets/colorPick');
    var inlineedit = require('../widgets/inlineEdit');
    var box = require('../widgets/dialogs')
    colPick.colorPickInit($('.picker'));//需要设色器插件的的在此处调用一次
    (function () {
        $(".add-hiddenBox input").each(function (i) {//对input的属性v进行初始化
            $(this).attr("v",$(this).val());
        });
        var creat = true;
        $(".labelAdd,.levelAdd").click(function () {//新增按钮
            if (creat){
                $(".add-hiddenBox").append($(".hiddenBox>li").clone());
                colPick.colorPickInit($('.picker'));//需要设色器插件的，在此处在调用一次
            }
            creat = false;
        });
        $(".add-hiddenBox").on("click",".saveButton", function () {//保存按钮
            var _this = $(this);
            var name = _this.parents('.labelList').find('input:eq(1)').val();
            var id = _this.parents('.labelList').find('input:eq(0)').attr('invoice_id');
            if(_this.attr("data-state")){//新建保存
                $.post("/index.php/Invoice/Index/add",{name:name}, function (data) {
                    var data = $.parseJSON(data);
                    if (data.status){
                        creat = true;
                        _this.parents('.labelList').find('input:eq(0)').attr('invoice_id',data.status);
                        inlineedit.changestate({thisDom:_this,state: "save"});//在ajax上传成功后调用此方法
                        warningHide("handleSuccess", data.info, 2000);
                    }else{
                        warningHide("handleDefault", data.info, 2000);
                    }
                })
            }else{//编辑保存
                $.post("/index.php/Invoice/Index/edit",{id:id,name:name}, function (data) {
                    var data = $.parseJSON(data);
                    if (data.status == true){
                        inlineedit.changestate({thisDom:_this,state: "save"});//在ajax上传成功后调用此方法
                        warningHide("handleSuccess", data.info, 2000);
                    }else{
                        warningHide("handleDefault", data.info, 2000);
                    }
                })
            }
        })

        $(".add-hiddenBox").on("click",".cancelButton", function () {//取消按钮
            var _this = $(this);
            var creatNew = inlineedit.changestate({thisDom:_this,state: "cancel"});
            if(creatNew.creat()) creat=true;

        })

        $(".add-hiddenBox").on("click",".deleteBtn", function () {//删除按钮
            var _this = $(this);
            var id = _this.parents('.labelList').find('input:eq(0)').attr('invoice_id');
            box.showConfirm({title:"删除提示", content:"是否删除",width:300,subTxt:"确认",cancelTxt:"取消",ok: function () {
                //调用标签删除接口,更新数据
                $.post("/index.php/Invoice/Index/del",{"id":id}, function (info) {
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
            }})
        })

        $(".add-hiddenBox").on("click",".editBtn", function () {//编辑按钮
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
    })()
})
