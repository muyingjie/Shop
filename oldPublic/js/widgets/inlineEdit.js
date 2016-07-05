/**
 * Created by lenovo on 2016/5/16.
 */
define(function (require,exports,module) {
    

    function changestate(opt){//保存
        /*按钮变化*/
        if (opt.state == "save"){
            opt.thisDom.removeAttr("data-state").siblings("div").removeAttr("data-state");
            opt.thisDom.removeClass("gen-sureBtn labelMarginR saveButton levelOpera").addClass("labelOpera editBtn").text("编辑");
            opt.thisDom.siblings("div").removeClass("gen-cancelBtn cancelButton").addClass("labelOpera deleteBtn").text("删除");
            opt.thisDom.parents(".labelList,.levelList").find("input").each(function (i) {
                $(this).attr("v",$(this).val())
            })
        }else{
            if(opt.thisDom.attr("data-state")){//取消时删除本行
                creat = true;
                opt.thisDom.parents(".labelList,.levelList").parent("li").remove();
            }else{
                creat = false;
                opt.thisDom.siblings("div").removeClass("gen-sureBtn labelMarginR saveButton levelOpera").addClass("labelOpera editBtn").text("编辑");
                opt.thisDom.removeClass("gen-cancelBtn cancelButton").addClass("labelOpera deleteBtn").text("删除");
                opt.thisDom.parents(".labelList,.levelList").find("input").each(function (i) {
                    $(this).val($(this).attr("v"));
                    $(this).siblings("div").css("backgroundColor",$(this).attr("v"));
                })
            }

        }
        this.creat = function () {
            return creat;
        }
        /*处理input*/
        var parul = opt.thisDom.parents(".labelList,.levelList");
        parul.find("input").css("border","1px solid transparent").attr("readonly","readonly");
        parul.find("input").each(function (i) {
            if($(this).hasClass("picker")) $(this).css("display","none");
        });

        /*处理百分号*/
        parul.find("input").siblings("span").css("display","none");
        var discount = parul.find(".discount");
        var val = discount.val();
        if(val) discount.val(val+"%");
        /*处理图片按钮*/
        parul.find(".levelChange").css("display","none");
        /*处理色块位置*/
        parul.find(".labelColor2").removeClass("labelColor2").addClass("labelColor1");
    }
    function edit(opt){//编辑
        /*按钮变化*/
        opt.thisDom.removeClass("labelOpera editBtn levelOpera").addClass("gen-sureBtn labelMarginR saveButton").text("保存");
        opt.thisDom.siblings("div").removeClass("levelOpera labelOpera deleteBtn").addClass("gen-cancelBtn cancelButton").text("取消");
        /*处理input*/
        var parul = opt.thisDom.parents(".labelList,.levelList");
        parul.find("input").css("border","1px solid #e7e6eb").removeAttr("readonly");
        parul.find("input").each(function (i) {
            if($(this).hasClass("picker")) $(this).css("display","block");
        });
        /*处理百分号*/
        parul.find("input").siblings("span").css("display","block");
        var discount = parul.find(".discount");
        var val = discount.val()
        if(val) discount.val(val.replace("%",""));
        /*处理图片按钮*/
        parul.find(".levelChange").css("display","block");
        /*处理色块位置*/
        parul.find(".labelColor1").removeClass("labelColor1").addClass("labelColor2");
    };

    module.exports={
        changestate:function(opt){
            //console.log(opt)
            return new changestate(opt);
        },
        edit: function (opt) {
            return new edit(opt);
        }
    }
})
