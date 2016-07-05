(function(){
    function checkInput(username){
        //var regEmail = /(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$)|(^$)/;
        var regPhone = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
        if(regPhone.test(username)){
            return true
        }else{
            return false;
        }
    }
    $("#login_submit").click(function(e){
        var Email = $("#tet").val();
        var password = $("#pasd").val();
        var valid = $("#verify_code").val();
        var $body=$("body"),      //body
            $login_user=$("#login_user"),    //整个登录注册大盒子
            $login=$(".login"),             //登录页面
            $signUp=$(".signUp");         //注册页面

        if(Email == '')
        {
            alert("请输入手机号码");
            $(".Email").focus();
            return false;
        }else
        {
            if(!(checkInput(Email)))
            {
                alert('请输入正确的手机号');
                $(".Email").focus();
                return false;
            }
        }
        if(password == '')
        {
            alert("请输入登录密码");
            $(".password").focus();
            return false;
        }
        /*表单提交Ajax提交部分*/
        $.post(rootUrl+"/Ucenter/login/islogin",{"Email":Email,"password":password,"valid":valid},function(data){

            if(data.status == "success"){
                alert('登录成功');
                //$(".y_suer").removeClass('disabled').html(Email);
                //$(".user").addClass('disabled');
                location.href = rootUrl+'/Ucenter/index/index';
                // $body.removeClass("modal-open");
                // $body.css("padding-right","0px");
                // $login_user.hide();
                // $login.hide();
                // $signUp.hide();
                return true;
            }else{
                alert(data.msg);
                $("#tet").focus();
                return false;
            }

        },"json")
        return false;
    });
    /**
     * 发送验证码
     */
    $("#sendSms").click(function () {
        //alert('1111');
        var mobile = $("#tetx").val();
        if(mobile == ''){
            alert('请输入手机号');
            $("#tetx").focus();
            return false;
        }else {
            if (!(checkInput(mobile))) {
                alert('请输入正确的手机号');
                $("#tetx").focus();
                return false;
            }
        }
        validCode();
        /*表单提交Ajax提交发送验证码部分*/
        $.post(rootUrl+"/Ucenter/login/sendSms",{"mobile":mobile},function(data){
            if(data.status == "success"){
                alert(data.msg);
            }else{
                alert(data.msg);
            }
        },"json")
        return false;

    });

    /*函数部分*/
    function validCode(){
        var curTime=60;
        $("#sendSms").html("60秒后重发");
        timer1=window.setInterval(function(){
            curTime--;
            $("#sendSms").html(curTime+"秒后重发");
            if(curTime==0){
                clearInterval(timer1);
                $("#sendSms").html("立即发送验证码");
            }
        },1000);
    }


    /*注册提交*/
    /*表单提交部分*/
    $("#user_submit").click(function(){
        var Ephone = $("#tetx").val();
        var valid = $("#valid").val();
        var password = $("#password").val();
        var repassword = $("#pasd_t").val();
        var shopUrl = $("#pasd_scwz").val();
        var name = $("#name").val();
        if(Ephone == ''){
            alert('请输入手机号');
            $("#tetx").focus();
            return false;
        }else {
            if (!(checkInput(Ephone))) {
                alert('请输入正确的手机号');
                $("#tetx").focus();
                return false;
            }
        }
        if(password == ''){
            alert('请输入密码');
            $("#password").focus();
            return false;
        }else {
            if(password != repassword){
                alert('两次密码匹配不正确');
                $("#pasd_t").focus();
                return false;
            }
        }
        if(shopUrl == ''){
            alert('请输入商城网址');
            $("#pasd_scwz").focus();
            return false;
        }
        if(name == ''){
            alert('请输入联系人姓名');
            $("#name").focus();
            return false;
        }
        /*表单提交Ajax提交部分*/
        $.post(rootUrl+"/Ucenter/register/register",{"Ephone":Ephone,"valid":valid,"password":password,"repassword":repassword,"shopUrl":shopUrl,"name":name},function(data){
            if(data.status == "success"){
                alert(data.msg);
                location.href = rootUrl+'/Ucenter/Index/index';
            }else{
                alert(data.msg);
            }
        },"json")
        return false;
    });
})(jQuery)


