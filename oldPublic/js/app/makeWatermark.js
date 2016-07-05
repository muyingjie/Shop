
define(function (require) {
    //
    var dlog = require("../widgets/dialogs");
    require('jqueryForm')

    $(".gen-sureBtn").click(function(){


        var isWatermark=$("input[name='isWatermark']:checked").val();

        if(typeof(isWatermark)=="undefined"){
            dlog.closeDialog();
            return false;
        }

       var checkRule=top.finder._checkedRule;
       var ids=top.finder.getCheckedRowIds();
       if(checkRule=="checked"){
            checkRule="in";
       }
       if(checkRule=="unchecked"){
            checkRule="not in";
       }
       
       $.post("watermark",{checkRule:checkRule,ids:ids,isWatermark:isWatermark},function(res){

           if(res.status){
               top.frameWarningHide("handleSuccess", "操作成功！", 2000);
               top.finder.loadData();
               dlog.closeDialog();
           }else{
               top.frameWarningHide("handleDefault",res.error, 2000);
               dlog.closeDialog();
           }

       },"json")


    })





})