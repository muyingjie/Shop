$(function(){
    //获取所有输入框的value值
    var marks = ["请填写姓名","请填写联系电话","请填写电子邮箱","请填写详细地址","请填写详细地址的邮政编码","请填写身份证号码","请填写常用QQ号码","请填写常用微信号码"];
    var inputValues = [];
    $(".c-importStyle").each(function (i){
        inputValues.push($(this).attr("value"));
    });

    //绑定输入款获取焦点事件
    $(".c-focus").live("focus",function (){
        if($(this).attr("value") == marks[$(this).attr("mark")]){
            $(this).attr("value","");
            $(this).css("color","#666");
        }
        $(this).siblings(".c-sureBtn,.c-cancelBtn").css("display","block");
    });
    //绑定输入框失去焦点事件
    $(".c-focus").blur(function (){
        if($(this).attr("value") == ""){
            $(this).attr("value",inputValues[$(this).attr("mark")]);
            $(this).css("color","#bfbfbf")
        }
    });

    //绑定取消按钮事件
    $(".c-cancelBtn").click(function (){
        var wImport = $(this).siblings(".c-focus");
        $(this).css("display","none");
        $(this).siblings(".c-sureBtn").css("display","none");
        wImport.attr("value",inputValues[wImport.attr("mark")]);
        wImport.css("color","#bfbfbf");
    });
    //绑定确定按钮事件
    $(".c-sureBtn").click(function (){
        //表单检测
        var wImport = $(this).siblings(".c-importStyle");
        if(wImport.attr("value") == marks[wImport.attr("mark")]){
            alert(marks[wImport.attr("mark")]);
            wImport.focus();
            return false;
        }
        
        //ajax表单提交
        var ID = $(this).siblings(".c-importStyle").attr("id");
        var val = $(this).siblings(".c-importStyle").attr("value");
        $.post(rootUrl+"/Ucenter/company/updateInfo",{"ID":ID,"val":val},function (data){
            if(data.status == 'success'){
                alert(data.msg);
                //点击确定按钮表单提交成功后样式改变
                $(this).siblings(".c-cancelBtn").css("display","none");
                $(this).css("display","none");
                $(this).siblings(".c-change").removeClass("c-noChange");
                $(this).siblings(".c-importStyle").addClass("c-noBorder").attr("readonly","readonly").css("color","#666");
                $(this).siblings(".c-importStyle").removeClass("c-focus");
            }else{
                alert(data.msg);
            }
        },"json")
    });
    //绑定修改按钮事件
    $(".c-change").click(function (){
        $(this).addClass("c-noChange");
        $(this).siblings(".c-sureBtn,.c-cancelBtn").css("display","block");
        $(this).siblings(".c-importStyle").removeClass("c-noBorder").removeAttr("readonly");
        $(this).siblings(".c-importStyle").css("color","#bfbfbf");
        $(this).siblings(".c-importStyle").addClass("c-focus");
    })

    //表单检测对象
    function Test(){

    }
    Test.prototype.testName = function (){

    }
});
