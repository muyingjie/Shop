/**
 * Created by Administrator on 2016/6/2.
 */
//调用
define(function(require){
	//
    var dlog=require("../widgets/dialogs");
    var waring= require("../main");
    var pageParam = require("PageParam");
    require('jqueryForm')
    var  pageOptions = pageParam.getParam();
    $(".tclist").height($(window).height()-55).css("overflow","auto");
    $('.gen-sureBtn').click(function () {
        var result = $("#frm").serialize();
        if(result){
            var shopname      = $('#shopname').val();           
            var imgpath       = $('#imgpath').val();
            var closeregister = $("input:radio[name='closeregister']:checked").val();
            var closeshop     = $("input:radio[name='closeshop']:checked").val(); 
            var closexplain   = $('#closexplain').val();          
            var icp           = $('#icp').val();
            var countcode     = $("*[name='countcode']").val();
            $.post(url,{shopname:shopname,imgpath:imgpath,closeregister:closeregister,closeshop:closeshop,closexplain:closexplain,icp:icp,countcode:countcode},function (data) {
                if(data){
                	waring.warningHide("handleSuccess", "操作成功！", 2000);                 	
                }else {
                	alert('保存失败');
                    return false;
                }
            },'json');  

        }
    });
    
   
    
    //上传图片
    $(".file").click(function () {
        var _this = $(this);
        dlog.showIframe({
            title:"图片选择",
            width:500,
            url:pageOptions.imageManageUrl,
            data:{key:1},
            callback:function(ad){
                $("#imgpath").val(ad.image_src);
                $("#upImg").attr('src',ad.image_src);
            }})
    })
    
    //闭店原因的显示
    $("#closeshop2").click(function (){
      	 $("#closexplain").css('display', 'inline-block');
      });
    //闭店原因的隐藏
    $("#closeshop1").click(function (){
    	 $("#closexplain").css('display', 'none');
    });

})