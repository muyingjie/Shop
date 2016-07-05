/***新增会员的表单验证***/
define(function(require) {
    var main = require("../main"), area = require('./area'),tttt = require("../jquery.validate.min") ;
    //var $=require("jquery");

    /***收货地址的默认文字样式***/
    $(".addr-textarea").on("focus", function () {
        var $val = $(this).html();
        if ($val != "") {
            $(this).html("");
        }
    })
    $(".addr-textarea").on("keyup", function () {
        var $val = $(this).html();
        $(this).css("color", "#666");
    });
    
    //收货地址 省
    $('#pid').on('change',function(){
        area.getCity(2,this.value,'address_city')
    })

    //收货地址 市
    $('#address_city').on('change',function(){
        area.getCity(3,this.value,'address_region')
    })

    //修改会员时省市区加载数据
   if(id!=''){
        if(cityid!=''){
            area.getCity(2,pid,'address_city',cityid);
        }
        if(areaid!=''){
            area.getCity(3,cityid,'address_region',areaid);
        }
    }

	 $('#zhuce-btns').click(function(){
         $("#yqmInput").submit();
    })

    $("#yqmInput").validate({
        submitHandler:function(form) {
            var name= $('#name').val();
            var pid = $('#pid').val();
            var cityid = $('#address_city').val();
            var areaid = $('#address_region').val();
            var detail = $('#detail').val();
            var phone = $('#phone').val();
            var tel = $('#tel').val();
            var code = $('#code').val();
            var sets =  $("#sets").val()
            var id = $('#id').val();
            $.ajax({
                type: "POST",
                url: "/index.php/address/Index/addFront",
                data: {name:name,pid:pid,cityid:cityid,areaid:areaid,detail:detail,phone:phone,tel:tel,code:code,sets:sets,id:id},
                dataType: "json",
                success: function(data){
                    if (data.code) {
                        alert(data.msg);
                    }
                },
                error:function(data){
                    alert('提交失败');
                }
            });
        },
        rules:{
            name:{
                required: true,
                minlength: 3,
                maxlength: 10
            },
            phone:{
                required: true,
                minlength: 11,
                maxlength: 11,
                number:true
            },
            pid:{
                required: true,
                number:true
            },
            address_city:{
                required: true,
                number:true
            },
            address_region:{
                required: true,
                number:true
            },
            detail:{
                required: true,
                minlength: 3,
                maxlength: 100
            },
        },
        messages:{
            name:{
                required: "必须填写用户名",
                minlength: "用户名最小为3位",
                maxlength: "用户名最大为10位",
                //remote: "用户名不存在"
            },
            phone:{
                required: "必须填写手机号",
                minlength: "手机号为11位数字",
                maxlength: "手机号为11位数字",
                number:"请输入数字"
            },
            pid:{
                required: "请选择省份",
            },
            address_city:{
                required: "请选择城市",
            },
            address_region:{
                required: "请选择区域",
            },
            detail:{
                required: "请填写详细地址",
                minlength: "请填写详细地址",
                maxlength: "请填写详细地址",
            },
        }
    })

})

