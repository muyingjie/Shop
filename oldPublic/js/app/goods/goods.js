/**
 * Created by Administrator on 2016/5/18.
 */
//调用
define(function(require){
    var dlog=require("../../widgets/dialogs"),main=require("../../main");
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
        var name = $('#name').val();
        name = $.trim(name);
        var englishname = $('#english_name').val();
        englishname = $.trim(englishname);
        var urls = $('#url').val();
        urls = $.trim(urls);
        var logo = $('#logo').val();
        logo = $.trim(logo);
        if(name.length == 0){
            //alert('品牌名称不能为空');
            $('#name').focus();
            return false;
        }
        if(englishname.length == 0){
            // alert('英文名称不能为空');
            $('#english_name').focus();
            return false;
        }
        var linkurl = $(this).attr('url');
        $.post(linkurl,{name:name,english_name:englishname,url:urls,logo:logo},function(data){
            if(data){
                self.close();
                self.opener.location.reload();
                //window.top.location.href='{{ url }}/desktop/index?app=brand&act=brandLists&dsp=finder&argc=';
            }else{
                alert("失败");
                return false;
            }
        },'json');
    });
    $(".tableList").on("click",".uploadImg",function(){;
        var _this = $(this);
            var dataObj={"url":$(this).attr("url"),"size":"M","title":"图片选择"};
            var size=dataObj.size;
            dlog.showIframe({title:dataObj.title,width:dlog.frameSize[size].width,url:dataObj.url,data:{key:"1"},callback:function (ab) {
                //alert(ab.image_id);
                _this.siblings("input").val(ab.image_id);
               _this.siblings("img").attr('src',ab.image_src);
                //$("#img_val").attr("value", ab.image_src);
            }})

        }
    );
    $(".closeBtn").click(function () {
        dlog.closeDialog();
    });

    //选择商品
    $('#selectGoods').click(function(){
        window.open(selectGoodsUrl);
        //getGoods();
    })

    //回调
    window.getSelectData = function(data){
        if(data){
            if(data.findername=='goods'){
                getGoods(data['ids'].join(','));
            }else{
                alert('1');
            }
        }
    }
    //选择商品后执行
    function getGoods(goodsIds){
        if(goodsIds!=''){
            $.post('/index.php/Goods/index/getGoods', {goodsIds:goodsIds},
                function(data){
                    if(data!='-1'){
                        $("#goods").html(data);
                        main.listInit();
                    }
                }
            );
        }
    }
})