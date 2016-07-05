/**
 * Created by lenovo on 2016/5/16.
 */
define(function (require,exports,module) {
    
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
            if(_this.attr("data-state")){//新建保存
                //$.post("",{}, function (data) {
                //if (data.stata == true){
                inlineedit.changestate({thisDom:_this,state: "save"});//在ajax上传成功后调用此方法
                creat = true;
                //}
                //})
            }else{//编辑保存
                //$.post("",{}, function (data) {
                //if (data.stata == true){
                inlineedit.changestate({thisDom:_this,state: "save"});//在ajax上传成功后调用此方法
                //}
                //})
            }
        })

        $(".add-hiddenBox").on("click",".cancelButton", function () {//取消按钮
            var _this = $(this);
            var creatNew = inlineedit.changestate({thisDom:_this,state: "cancel"});
            if(creatNew.creat()) creat=true;

        })

        $(".add-hiddenBox").on("click",".deleteBtn", function () {//删除按钮
            var _this = $(this)
            box.showConfirm({title:"新窗口", content:"是否删除",width:300,subTxt:"确认",cancelTxt:"取消",callback: function () {
            _this.parents(".labelList,.levelList").parent("li").remove();//在ajax上传成功后调用此方法
            }})
        })

        $(".add-hiddenBox").on("click",".editBtn", function () {//编辑按钮
            var _this = $(this)
            inlineedit.edit({thisDom:_this});
        });
    })()
})
