/**
 * Created by lenovo on 2016/6/6.
 */
define(function (require) {
    //
    var dlog = require("../widgets/dialogs");
    var showMsg = require('../widgets/validate').showMsg;
    var pageParam = require("PageParam");
    require('../widgets/select');

    var pageOptions = pageParam.getParam();
    var result = false;
    $(".select").on("click", function(e) {//表单验证
        $.html5Validate.isAllpass($(this));
    });

    $('form').on('blur', 'input', showMsg);

    $('form').html5Validate(function() {//自己的验证方式接口，不需要时可删掉
        this.submit();
    }, {validate: function() {
        result = true;

        /**
         *此区域可以写自己的一些验证，比如用户名重复，省市区是否选择
         **/
        return result;
    }});

    $('.select:eq(1)').select({onlyShow: false});//下拉选择
    $('.select:eq(2)').select({onlyShow: false});//下拉选择

    $(".checkbox").click(function () {//复选框
        $(this).toggleClass("checked");

        if($(this).hasClass("checked")){
            $(this).siblings("input").val("1");
            if($(this).attr("name") == "supportValue") $(".logistics").css("display","inline-block");//物流保价
            if($(this).hasClass("marginL20")) $(".disable").css("color","#999").find("input").attr("readonly","readonly").removeClass("txt");
        }else{
            if($(this).attr("name") == "supportValue") $(".logistics").css("display","none");//物流保价
            if($(this).hasClass("marginL20")) $(".disable").css("color","#999");
            if($(this).hasClass("marginL20")) $(".disable").css("color","#666").find("input").removeAttr("readonly","readonly").addClass("txt");
            $(this).siblings("input").val("0");
        }

    })

    if($(".marginL15").is(":checked")) $(".deliveryWay").css("display","block");//初始化默认配送费用适用地区

    $("input[name=setting]").click(function () {//默认配送费用适用地区
        $(this).hasClass("marginL15") ? $(".deliveryWay").css("display","block"):$(".deliveryWay").css("display","none");
    })
    
    $(".addset").click(function () {//指定的地区设置运费按钮
        $(".payAdds-ul3").append($(".addHiddenBox").find("li").clone())
    })

    $(".payAdds").on("click",".select_area", function () {//地区选择
        var _this = $(this);
        dlog.showIframe({title:"提示",width:500,url:"/index.php/Logistics/Distribution/selectAddress",data:{id:1},callback:function(data){
            _this.parent("span").prev("span").text(data.showArea);
            _this.parent("span").siblings("input:eq(0)").val(data.showArea);
            _this.parent("span").siblings("input:eq(1)").val(data.uploadArea);
            //console.log(data)

        }})
    })

    $(".payAdds").on("click",".useEquation", function () {//使用公式

    });

    $(".payAdds").on("click",".delete_btn", function () {//删除按钮
        var _this = $(this);
        dlog.showAlert({title:"提示",width:500,content:"确认删除？",ok:function(){
           _this.parent("span").parent("li").remove();//ajax请求成功后调用
        }})
    })

    $('.gen-sureBtn').click(function(){
        var result = $.html5Validate.isAllpass($('form'));
        if($('form').find('.error')[0]) {
            showMsg.call($('form').find('.error')[0]);
        }
        //重量设置验证
        if($("div.select:eq(0)>span").text() == "请选择"){
            $("div.select:eq(0)").parent("span").next("div").css("display","inline-block").children("span").text("请选择首重重量");
            $("div.select:eq(0)").parent("span").parent("span").addClass("err");
            result = false;
        }else{
            $("div.select:eq(0)").parent("span").next("div").css("display","none")
        }

        if($("div.select:eq(1)>span").text() == "请选择"){
            $("div.select:eq(1)").parent("span").next("div").css("display","inline-block").children("span").text("请选择续重重量");
            $("div.select:eq(1)").parent("span").parent("span").addClass("err");
            result = false;
        }else{
            $("div.select:eq(1)").parent("span").next("div").css("display","none")
        }

        if(result){
            if(pageOptions.type == 'add'){
                //配送方式名称重复检测
                $.post('/index.php/Logistics/Distribution/checkNameExist',{name:$("input[name=dt_name]").val()}, function (data) {
                    var data = $.parseJSON(data);
                    if(data.status){
                        create();//表单提交
                    }else{
                        $("input[name=dt_name]").siblings("div").css("display","inline-block").children("span").text("配送方式名称重复");
                        $("input[name=dt_name]").parent("div").addClass("err");
                    }
                })
            }else{
                create();//表单提交
            }

            //$('form').submit();//表单提交
            function create(){
                $.post(pageOptions.url,$('form').serialize(),function(info){//ajax提交
                    var data = $.parseJSON(info);
                    if(data.status == false){
                        alert(data.info);
                    }else{
                        window.close();
                        window.opener.top.finder.loadData()
                        window.opener.waring.warningHide("handleSuccess", data.info, 2000);

                    }
                });

            }
        }

    });
})
