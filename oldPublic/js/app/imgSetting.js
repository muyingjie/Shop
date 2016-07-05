/**
 * Created by lenovo on 2016/5/18.
 */
define(function (require,exports,module) {
    //
    var swfUpload_w=require('../widgets/swfUpload_w');
    var dlog=require("../widgets/dialogs");
    require('../widgets/tabs');
    var waring = require("../main");
    var pageParam = require("PageParam");
    require('jqueryForm')
   var  pageOptions = pageParam.getParam();
    $(".mainCont").height($(window).height()-55).css("overflow-y","auto");
    $("#tabs").tabs(null, null, 'Tab-li-select');//tab切换
    selectLocation(".photoSet td");
    selectLocation(".pictureSet td");
    function selectLocation(domElem){//水印位置选择函数
        $(domElem).click(function () {
            $(domElem).removeClass("bg-4587da");
            $(this).addClass("bg-4587da");
            $(this).parents("table").siblings("input").val($(this).attr("position"));//给隐藏域input赋值
        })
    }


    $("input.radio").each(function () { //水印形式初始化
        var _this = $(this)
        var that = $(this).parents("label").siblings("div");
        if($(this).is(":checked")&&$(this).attr("mark") != "noWatermark"){
            that.css("display","block").find(".setPhotoSelctUl li:eq(0)>div").css("display","none").each(function () {
                if($(this).hasClass(_this.attr("mark"))) $(this).css("display","block");
            });
        }
    })


    $(".radio").click(function () {//水印形式选择
        var _this =$(this).parents("label").children("input.radio:checked");
        var that = $(this).parents("label").siblings("div");
        if(_this.attr("mark") == "noWatermark"){
            that.css("display","none");
        }else{
            that.css("display","block").find(".setPhotoSelctUl li:eq(0)>div").css("display","none").each(function (i) {
                if($(this).hasClass(_this.attr("mark"))) $(this).css("display","block");
            });
        }
    });

    var oIsUploadSucc = {
        goods_pic: {
            isUpload: false,
            errMsg: "必须上传水印图片"
        },
        goods_detail: {
            isUpload: false,
            errMsg: "必须上传水印图片"
        }
    };
    $(".file").click(function () {
        var _this = $(this);
        dlog.showIframe({
            title:"图片选择",
            width:650,
            url:pageOptions.imageManageUrl,
            data:{key:1},
            callback: function (data) {
                $.each(oIsUploadSucc, function (i, o) {
                    if (_this.parents("#" + i)) {
                        oIsUploadSucc[i].isUpload = true;
                    }
                });
                
                _this.siblings("span").children("input").val(data.image_id);
                _this.siblings("span").children("img").attr("src",data.image_src);
            }})
    })
    //保存按钮
    //$(".gen-sureBtn ").click(function () {
    //    var selectId;
    //    var item = $(".Tab-ul>li");
    //    if(item.eq(0).hasClass("Tab-li-select")){//商品缩略图设置
    //       selectId = "thumb";
    //    }else if(item.eq(1).hasClass("Tab-li-select")){//商品相册图设置
    //        selectId = "goods_pic";
    //    }else{//商品详情图设置
    //        selectId = "goods_detail";
    //    }

    //    $("#"+selectId).ajaxSubmit({
    //        dataType:"json",
    //        success:function(res){
    //            //console.log(res);
    //            if(res.status){
    //                waring.warningHide("handleSuccess", "操作成功！", 2000);
    //            }else{
    //                waring.warningHide("handleDefault", "操作失败！", 2000);
    //            }

    //        }
    //    })
    //})



    //$(".viewImg").click(function () {

    //    var selectId;
    //    var item = $(".Tab-ul>li");
    //    if (item.eq(0).hasClass("Tab-li-select")) {//商品缩略图设置
    //        selectId = "thumb";
    //    } else if (item.eq(1).hasClass("Tab-li-select")) {//商品相册图设置
    //        selectId = "goods_pic";
    //    } else {//商品详情图设置
    //        selectId = "goods_detail";
    //    }

    //    $("#" + selectId).ajaxSubmit({
    //        // dataType: "json",
    //        url:pageOptions.previewUrl,
    //        success: function (res) {
    //           // alert(res)
    //            dlog.showIframe({
    //                title:"图片预览",
    //                url:res
    //            })

    //        }
    //    })
    //})

    //定义一种规则
    //rule可以是一个正则，也可以是一个函数，函数接受要处理的字符串作为参数
    var nonNegativeRule = {
        rule: /^[1-9]\d*$/,
        instr: "必须是非负整数"
    };
    var num0To100Rule = {
        rule: function (str) {
            if (!str || str.indexOf("0") == 0 || str.indexOf("0x") == 0) {
                return false;
            }
            var n = Number(str);
            if (isNaN(n)) {
                return false;
            } else {
                return n >= 0 && n <= 100;
            }
        },
        instr: "必须是1-100的整数"
    };
    var txtWaterMarkRule = {
        rule: /^[\u4e00-\u9fa5|a-z|A-Z]{1,11}$/,
        instr: "必须是中英文，最多输入11个字符"
    };
    var aViewImgFormId = ["thumb", "goods_pic", "goods_detail"];

    function publicInitFn(rule, $obj, parClassName) {
        var oErrMsg = $obj.parent("." + parClassName).find(".errMsg");
        if (oErrMsg.length == 0) {
            $obj.parent("." + parClassName).append(
                $("<span>").html(rule.instr).addClass("errMsg warningTxt").css({ "display": "none" })
            );
        }
    }
    function publicSuccFn($obj, parClassName) {
        var $errMsg = $obj.parent("." + parClassName).find(".errMsg");
        $errMsg.css({ "display": "none" });
        $obj.removeClass("warning");
    }
    function publicErrFn($obj, parClassName) {
        var $errMsg = $obj.parent("." + parClassName).find(".errMsg");
        if ($errMsg.length == 0) {
            console.log("$errMsg长度为0");
        }
        $errMsg.css({ "display": "inline-block" });
        $obj.addClass("warning");
    }
    //点击预览和保存的校验
    $.each(aViewImgFormId, function (i, o) {
        var $par = $("#" + o);
        $par.find(".viewImg").click(function () {
            $par.find("input[type='text']").each(function (i, o) {
                $(o).focus();
                $(o).blur();
            });
            var ret = verifyBeforeInter(o, $par);
            if (!ret) {
                return;
            }
            $("#" + aViewImgFormId[i]).ajaxSubmit({
                // dataType: "json",
                url: pageOptions.previewUrl,
                success: function (res) {
                    // alert(res)
                    dlog.showIframe({
                        title: "图片预览",
                        url: res
                    })
                }
            });
        });
        $par.find(".gen-sureBtn").click(function () {
            var ret = verifyBeforeInter(o, $par);
            if (!ret) {
                return;
            }
            $("#" + aViewImgFormId[i]).ajaxSubmit({
                dataType: "json",
                success: function (res) {
                    //console.log(res);
                    if (res.status) {
                        waring.warningHide("handleSuccess", "操作成功！", 2000);
                    } else {
                        waring.warningHide("handleDefault", "操作失败！", 2000);
                    }

                }
            })
        });
        function verifyBeforeInter(o, $par) {
            var $SizeInput = $par.find(".sizeInput");
            var ret = true;
            //校验宽高
            $SizeInput.each(function (i, o) {
                if ($(o).hasClass("warning")) {
                    ret = false;
                }
            });
            var isImgWaterMark = $par.find("input[mark='imgWatermark']").prop("checked");
            var isTxtWaterMark = $par.find("input[mark='textWatermark']").prop("checked");
            //如果选择了水印
            if (isImgWaterMark || isTxtWaterMark) {
                if ($par.find("input[name='wm_opacity']").hasClass("warning")) {
                    ret = false;
                }
                //如果是图片类型的水印
                if (isImgWaterMark) {
                    if (!oIsUploadSucc[o].isUpload) {
                        ret = false;
                    }
                }
                if (isTxtWaterMark) {
                    if ($par.find("input[name='wm_text']").hasClass("warning")) {
                        ret = false;
                    }                    
                }
            }
            if (!ret) {
                //只有图片水印才做校验
                if (isImgWaterMark && oIsUploadSucc[o] && !oIsUploadSucc[o].isUpload) {
                    alert(oIsUploadSucc[o].errMsg);
                }
                ret = false;
            }
            return ret;
        }
    });
    
    //function publicSavePicture($obj, parId, veri, obj) {
    //    var $obj = obj.$obj;
    //    var index = obj.index;
    //    var parCls = obj.parClsName;
    //    $("#" + parId).find(".gen-sureBtn").click(function () {
    //        var $SizeInput = $obj.parents("."+parCls).find(".sizeInput");
    //        var ret = true;
    //        $SizeInput.each(function (i, o) {
    //            if (!veri.call($(o))) {
    //                ret = false;
    //            }
    //        });
    //        if (!ret) {
    //            return;
    //        }
    //        $("#" + aViewImgFormId[index]).ajaxSubmit({
    //            dataType: "json",
    //            success: function (res) {
    //                //console.log(res);
    //                if (res.status) {
    //                    waring.warningHide("handleSuccess", "操作成功！", 2000);
    //                } else {
    //                    waring.warningHide("handleDefault", "操作失败！", 2000);
    //                }

    //            }
    //        })
    //    });
    //}

    //透明度的校验
    $(".setPhotoSelctUl input[name='wm_opacity']").each(function (i, o) {
        verifyValue({
            index: i + 1,
            orgIndex: i,
            rule: num0To100Rule,
            $obj: $(o),
            initFn: publicInitFn,
            errFn: publicErrFn,
            succFn: publicSuccFn,
            parClsName: "opacityVerify"
        });
    });
    //尺寸的校验
    $(".sizeVerify .sizeInput").each(function (i, o) {
        verifyValue({
            index: parseInt(i / 2),
            orgIndex: i,
            rule: nonNegativeRule,
            $obj: $(o),
            initFn: publicInitFn,
            errFn: publicErrFn,
            succFn: publicSuccFn,
            parClsName: "sizeVerify"
        });
    });
    //文字水印校验
    $(".textWatermark input[name='wm_text']").each(function (i, o) {
        verifyValue({
            rule: txtWaterMarkRule,
            $obj: $(o),
            initFn: publicInitFn,
            errFn: publicErrFn,
            succFn: publicSuccFn,
            parClsName: "uploadTop"
        });
    });

    //按照rule规则校验$obj里面的值，将错误信息放在$errObj中
    function verifyValue(obj) {
        var index = obj.index;
        var orgIndex = obj.orgIndex;
        var rule = obj.rule;
        var $obj = obj.$obj;
        var initFn = obj.initFn;
        var errFn = obj.errFn;
        var succFn = obj.succFn;
        var otherOper = obj.otherOper;
        var parClsName = obj.parClsName;
        initFn(rule, $obj, parClsName);
        $obj.blur(veri);
        otherOper && otherOper(obj, veri);
        function veri() {
            var isMatchRule = false;
            if (rule.rule.test) {
                //正则的情况
                isMatchRule = $(this).val().match(rule.rule);
            } else if ($.isFunction(rule.rule)) {
                //函数的情况
                isMatchRule = rule.rule($(this).val());
            }
            if (isMatchRule) {
                succFn && succFn($(this), parClsName);
                //虽然当前$obj校验成功，但是如果$obj的兄弟元素仍然校验不成功，也要让$errMsg显示出来
                var $sizeVerify = $(this).parent("." + parClsName);
                var $errMsg = $sizeVerify.find(".errMsg");
                var $sizeInput = $sizeVerify.find(".sizeInput");
                var isHaveErr = false;
                $sizeInput.each(function (i, o) {
                    if (!$(o).val().match(rule.rule)) {
                        isHaveErr = true;
                    }
                });
                $errMsg.css({ "display": isHaveErr ? "inline-block" : "none" });
                return true;
            } else {
                errFn && errFn($(this), parClsName);
                return false;
            }
        }
    }

});
