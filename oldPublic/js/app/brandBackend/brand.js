/**
 * Created by Administrator on 2016/5/18.
 */
//调用
define(function(require){
    var dlog=require("../../widgets/dialogs");
    //
    var showMsg = require('../../widgets/validate').showMsg;
    dlog.frameSize = {
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
    $('#save').click(function(){
        result = $.html5Validate.isAllpass($('form'));//yes 1
        if($('form').find('.error')[0]) {
            showMsg.call($('form').find('.error')[0]);
        }

        var name = $('#name').val();
        name = $.trim(name);
        var englishname = $('#english_name').val();
        englishname = $.trim(englishname);
        var urls = $('#url').val();
        urls = $.trim(urls);
        var logo = $('#logo').val();
        logo = $.trim(logo);
        var imgid = $('#img_id').val();
        imgid = $.trim(imgid);
        if(name.length == 0){
            //alert('品牌名称不能为空');
            $('#name').focus();
            return false;
        };
        var linkurl = $(this).attr('url');
        if(result){
            $.post(linkurl,{name:name,english_name:englishname,url:urls,logo:logo,img_id:imgid},function(data){
                if(data){
                    window.opener.waring.warningHide("handleSuccess", "操作成功！", 2000);

                        window.opener.top.finder.loadData();
                        self.close();
                    //self.close();
                    //self.opener.location.reload();
                    //window.top.location.href='{{ url }}/desktop/index?app=brand&act=brandLists&dsp=finder&argc=';
                }else{
                    alert("失败");
                    return false;
                }
            },'json');
        };
       /* $(this).attr("disabled","disabled");*/


    });

    $(".uploadImg").click(function(){
            var dataObj={"url":$(this).attr("url"),"size":"M","title":"图片选择"};
            var size=dataObj.size;
            dlog.showIframe({title:dataObj.title,width:dlog.frameSize[size].width,url:dataObj.url,data:{key:"1"},callback:function (ab) {
               // alert(ab.image_id);
                $('#uplogo').attr('src',ab.image_src);
                $("#logo").attr("value", ab.image_src);
                $("#img_id").attr("value", ab.image_id);
            }})

        }
    );
    $(".closeBtn").click(function () {
        dlog.closeDialog();
    });
})