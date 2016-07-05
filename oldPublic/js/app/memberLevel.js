/**
 * Created by lenovo on 2016/5/16.
 */
define(function (require,exports,module) {
    //
    var inlineedit = require('../widgets/inlineEdit');
    var box = require('../widgets/dialogs');
    var main= require("../main");
    box.frameSize = {
        L: {
            width: 750,
        },
        M: {
            width: 600
        },
        S: {
            width: 500
        }
    };
    if($(window).height() < 286){
        $(".levelOuter").height(500);
        $(".add-hiddenBox").height(425).css({"overflow-y":"auto","width":"100%"});
    }else{
        $(".levelOuter").height($(window).height()-54);
        $(".add-hiddenBox").height($(window).height()-129).css({"overflow-y":"auto","width":"100%"});
    }
    (function () {
        $(".add-hiddenBox input").each(function (i) {//对input的属性v进行初始化
            $(this).attr("v",$(this).val());
        });
        var creat = true;
        var check=false;
        if(check==true){
            main.warningHide("handleDefault", "操作失败 等级已存在！", 2000);
            return false;
           /* box.showConfirm({
                title: "新窗口",
                content: "重复添加",
                width: 300,
                subTxt: "确认",
                cancelTxt: "取消",
            })*/

        }
        $(".labelAdd,.levelAdd").click(function () {//新增按钮
            if (creat){
                $(".add-hiddenBox").append($(".hiddenBox>li").clone());

            }
            creat = false;
        });
        $(".add-hiddenBox").on("blur",".levelList input[name=count],input[name=money]", function () {
            if(isNaN($(this).val())){
               main.warningHide("handleDefault", "折扣和金额为数字类型！", 2000);
               return false;
           }else{
               $(this).val(Number($(this).val()).toFixed(2));
            }
        })
        $(".add-hiddenBox").on("click",".saveButton", function () {//保存按钮
            var _this = $(this);
            var id = _this.parents('.levelList').find('input:eq(0)').val();
            var name = _this.parents('.levelList').find('input:eq(1)').val();
            var logo = _this.parents('.levelList').find('input:eq(2)').val();
            var count = _this.parents('.levelList').find('input:eq(3)').val();
            var money = _this.parents('.levelList').find('input:eq(4)').val();
			var imgid = _this.parents('.levelList').find('input:eq(5)').val();
       //     _this.parents('.levelList').find('input:eq(3)').val(Number(count).toFixed(2));
         //   _this.parents('.levelList').find('input:eq(4)').val(Number(money).toFixed(2));

            if ( name==''|| name.length >20 || name.length < 4) {
               /* _this.parents(".levelList").find("li:first").children(".levelInput").css("border","1px solid #f13848");*/
           /*   box.showConfirm({
                    title: name,
                    content: "等级名称不能为空",
                    width: 300,
                    subTxt: "确认",
                    cancelTxt: "取消",
                });*/
               /* _this.parents('.levelList').find('input:eq(0)').val(data.stata);
                inlineedit.changestate({thisDom:_this,state: "save"});//在ajax上传成功后调用此方法
                creat = true;
                var check=true;*/
                main.warningHide("handleDefault", "等级名称长度4-20！", 2000);
                return false;
            }
                if (count && isNaN(count)) {
                    main.warningHide("handleDefault", "折扣请填写数字", 2000);
                    return false;
                 /*   box.showConfirm({
                        title: count,
                        content: "折扣请填写数字",
                        width: 300,
                        subTxt: "确认",
                        cancelTxt: "取消",
                    })
                    return false;*/
            }
            if ( count && count >= 100 || count < 0) {
                main.warningHide("handleDefault", "折扣不能大于100或者小于0", 2000);
                return false;
               /* box.showConfirm({
                    title: count,
                    content: "折扣不能大于100",
                    width: 300,
                    subTxt: "确认",
                    cancelTxt: "取消",
                })
                return false;*/
            }
            if ( money && isNaN(money)) {
              /*  box.showConfirm({
                    title: money,
                    content: "金额请填写数字",
                    width: 300,
                    subTxt: "确认",
                    cancelTxt: "取消",
                })*/
                main.warningHide("handleDefault", "消费额度请填写数字", 2000);
                return false;
            }
            if ( money && money>9999999999 || money<0) {
                main.warningHide("handleDefault", "消费额度不能大于9999999999或者小于0", 2000);
                return false;
                /* box.showConfirm({
                 title: count,
                 content: "折扣不能大于100",
                 width: 300,
                 subTxt: "确认",
                 cancelTxt: "取消",
                 })
                 return false;*/
            }
            if(_this.attr("data-state")){//新建保存
                $.post("/index.php/Level/Index/add",{"id":id,"name":name,"logo":logo,"imgid":imgid,"count":count,"money":money}, function (info) {
                   //alert(info);
                var data = $.parseJSON(info);
                if (data.stata==false){
                    /*_this.parents('.levelList').find('input:eq(0)').val(data.stata);
                    inlineedit.changestate({thisDom:_this,state: "save"});//在ajax上传成功后调用此方法
                    creat = true;
                    var check=true;*/
                    main.warningHide("handleDefault", "操作失败 等级已存在", 2000);
                    return false;
                }else{
                    _this.parents('.levelList').find('input:eq(0)').val(data.stata);
                    inlineedit.changestate({thisDom:_this,state: "save"});//在ajax上传成功后调用此方法
                    creat = true;
                    var check=true;
                    main.warningHide("handleSuccess", "操作成功！", 2000);
                }
                })
            }else{//编辑保存
                $.post("/index.php/Level/Index/update",{"id":id ,"name":name,"imgid":imgid,"logo":logo,"count":count,"money":money}, function (info) {
                    var data = $.parseJSON(info);
                    if (data.stata==false){
                        _this.parents('.levelList').find('input:eq(0)').val(data.stata);
                        inlineedit.changestate({thisDom:_this,state: "save"});//在ajax上传成功后调用此方法
                        creat = true;
                        var check=true;
                        main.warningHide("handleDefault", "操作失败 等级已存在！", 2000);
                        return false;
                    }else{
                        inlineedit.changestate({thisDom:_this,state: "save"});//在ajax上传成功后调用此方法
                        main.warningHide("handleSuccess", "操作成功！", 2000);
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
            var _this = $(this)
            var id = _this.parents('.levelList').find('input:eq(0)').val();
                       box.showConfirm({
                           title: "是否删除",
                           content: "确定要删除此条数据吗",
                           width: 300,
                           subTxt: "确认",
                           cancelTxt: "取消",
                           ok: function () {
                               $.post("/index.php/Level/Index/del",{ "id":id }, function (info) {
                                   var data = $.parseJSON(info);
                                   if (data.stata) {
                                       _this.parents(".levelList").parent("li").remove();//在ajax上传成功后调用此方法
                                       main.warningHide("handleSuccess", "操作成功！", 2000);
                                   }else{

                                       main.warningHide("handleDefault", "操作失败！", 2000);
                                   }
                               })
                   }
               })
        })

        $(".add-hiddenBox").on("click",".editBtn", function () {//编辑按钮
            var _this = $(this)
            inlineedit.edit({thisDom:_this});
        });
        //上传图片demo
        $(".add-hiddenBox").on("click",".uploadImg",function(){
                var _this = $(this);
                var dataObj={"url":$(this).attr("url"),"size":"L","title":"图片选择"};
                var size=dataObj.size;
                box.showIframe({title:dataObj.title,width:box.frameSize[size].width,url:dataObj.url,data:{key:"1"},callback:function (ab) {
                   // console.log(ab.image_src)
                    var urls=ab.image_src;
					var imgid=ab.image_id;
                    _this.siblings("img").attr("src",urls)
                    _this.parents('.levelList').find('input:eq(2)').attr("value", urls);
					_this.parents('.levelList').find('input:eq(5)').attr("value", imgid);
                }})

            }
        )
        // 点击刷新
        $(".refreshBtn").on("click",function(){
            window.location.reload();
        });

    })();
    $(".levelOuter").height($(window).height()-55)
});

