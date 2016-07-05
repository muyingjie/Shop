define(function(require){
    //var $=require("jquery");

    $("#a2222").click(function(){
        self.close();
        window.opener.waring.warningHide("handleSuccess", "操作成功！", 2000);
    })

//         dlog.frameSize = {
//         L: {
//             width: 750,
//         },
//         M: {
//             width: 600
//         },
//         S: {
//             width: 500
//         }
//     }
//
//     $(".windowOpenBtn").click(function(){
//         var dataCustom=$(this).attr("data-custom")
//         var  dataObj = JSON.parse(dataCustom);
//         window.open(dataObj.url, '', 'height='+dataObj.height+', width='+dataObj.width+', top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
//     })
//
//
//
// //ifame打开方式
// $(".iframeBtn").click(function(){
// //判断是否需要勾选数据
//     var dataCustom=$(this).attr("data-custom")
//     var  dataObj = JSON.parse(dataCustom);
//     var size =dataObj.size;
//     var  required=dataObj.required;
//     dlog.showIframe({title:dataObj.title,width:dlog.frameSize[size].width,url:dataObj.url})
// })
//
//     //刷新列表方法
//
//     //批量删除方法
//
//     //上传图片demo
//     $(".uploadImg").click(function(){
//  		 var dataObj={"url":$(this).attr("url"),"size":"L","title":"图片选择"};
//  		 var size=dataObj.size;
//  		 dlog.showIframe({title:dataObj.title,width:dlog.frameSize[size].width,url:dataObj.url,data:{key:"1"},callback:function (ab) {
//              alert(ab.image_id);
//          }})
//
//     }
//     )
//
//
//

    $("#imageList").click(function(){
        var dataCustom=$(this).attr("data-custom")
        var  dataObj = JSON.parse(dataCustom);
        var size =dataObj.size;
        window.open(dataObj.url, '', 'height='+dataObj.height+', width='+dataObj.width+', top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
    })



    var getSelectData=function(callBack){

        alert(callBack);

    }

})
