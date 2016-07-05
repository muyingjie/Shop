/**
 * Created by Administrator on 2016/5/18.
 */
//调用
define(function(require){
    var dlog=require("../../widgets/dialogs");
    //var $=require("jquery");
    //$(function(){
    //   var text = $.trim($('.comment-scroll-height').text());
    //    if(text){
    //       $('.comment-scroll-height').show();
    //    }else{
    //        $('.comment-scroll-height').hide();
    //    }
    //});
    //点击回复内容显示功能
    $('#submit').click(function(){
        var content = $('#content').val();
        content = $.trim(content);
        if(content.length == 0){
            // alert('评论内容不能为空');
            $('#content').focus();
            return false;
        }
        var parent_id = $('#parent_id').val();
        var is_admin = $('#is_admin').val();
        var member_id = $('#member_id').val();
        var linkurl = $('#url').val();
        $.post(linkurl,{parent_id:parent_id,is_admin:is_admin,member_id:member_id,content:content,ajax:1},function(data){
            if(data){
                var html='';
                    html+='<ul class="customer-comment-admin"><li class="comment-content bg-eee no-border-bottom"><div class="comm-left">评论人 ： <span>'+data["member_name"]+'</span></div><div class="comm-right">';
                    if(data["status"]==1){
                        html+='<span class="update update'+data["comId"]+'" ids="'+data["comId"]+'" cid="'+parent_id+'" url="'+data["editurl"]+'?id='+data["comId"]+'&cid='+parent_id+'" status="0">【关闭显示】</span>';
                    }else{
                        html+='<span class="update update'+data["comId"]+'" ids="'+data["comId"]+'" cid="'+parent_id+'" url="'+data["editurl"]+'?id='+data["comId"]+'&cid='+parent_id+'" status="1">【显示到商品页】</span>';
                    }
                    html+='<span class="delete delete'+data["comId"]+'" ids="'+data["comId"]+'" cid="'+parent_id+'" url="'+data["delurl"]+'?id='+data["comId"]+'&cid='+parent_id+'">【删除】</span></div></li><li class="comment-content"><ul><li>回复时间 ： <span>'+data["createtime"]+'</span></li><li>回复内容 ： <span>'+content+'</span></li></ul></li></ul>';
                $('.replyList').prepend($(html));
                $('#content').val('');
                //暂时解决识别不到js新增块高度的问题
                   //location=location;
                //$('.comment-scroll-height').show();
            }else{
                return false;
            }
        },'json');

        //javascript:comform.submit();
    });
    //修改评论或回复状态
    $('.lt-main').on("click",".update",function(){
        var status = $(this).attr('status');
        var url = $(this).attr('url')+'&status='+status+'&ajax=1';
        var ids = $(this).attr('ids');
        var zhuangtai = '';
        var wenzi = '';
        if(status ==1){
            zhuangtai = 0;
            wenzi = '【关闭显示】';
        }else if(status ==0){
            zhuangtai = 1;
            wenzi = '【显示到商品页】';
        }
        $.get(url,function(datac){
            if(datac){
                $('.update'+ids).attr('status',zhuangtai);
                $('.update'+ids).text(wenzi);
            }
        },'json');
    });
    //删除评论或回复
    $('.lt-main').on("click",".delete",function(){
        var url = $(this).attr('url')+'&ajax=1';
        var cid = $(this).attr('cid');
        var ids = $(this).attr('ids');
        //if(cid){
        //    $('.delete'+ids).parent().parent().parent().hide();
        //}else{
        //    $('.delete'+ids).parent().parent().parent().hide();
        //    $('.comment-scroll-height').text('');
        //}
        var self = window.self;
        dlog.showConfirm({title:"提示",width:500,content:"确定要删除所选信息吗？删除后将无法恢复！",ok:function(){
            $.get(url,function(datad){
                if(cid){
                    $('.delete'+ids).parent().parent().parent().hide();
                }else{
                    // $('.delete'+ids).parent().parent().parent().hide();
                    //window.location='http://www.work.com/index.php/desktop/index?app=ask&act=userListAskAdmin&dsp=finder&argc=';
                    window.opener.top.finder.loadData();
                    self.close();
                }
            },'json');
        }
        });
    });

    $('#save').click(function(){
        var content = $('#content').val();
        content = $.trim(content);

        if(content.length == 0){
            // alert('评论内容不能为空');
            $('#content').focus();
            return false;
        }
        var datas = $('#askform').serialize();
        var linkurl = $(this).attr('url');
        $.post(linkurl,datas+'&ajax=1',function(datae){
            if(datae){
                //暂时解决识别不到js新增块高度的问题
                alert(datae['msg']);
               location=location;
                //$('.comment-scroll-height').show();
            }else{
                return false;
            }
        },'json');
        //javascript:comform.submit();
    });
    //刷新验证码
    $('#update').click(function(){
        var updateCode = $(this).attr('url');
        $.post('updateCode',function(d){
            $('#update').attr('src', d['url']);
            $('#codes').attr('value',d['id']);
        },'json');
    });
    $(function(){
        $("#content").focus(function(){
            if($(this).val() ==this.defaultValue){
                $(this).val("");
            }
        }).blur(function(){
            if ($(this).val() == '') {
                $(this).val(this.defaultValue);
            }
        });
    });
    $(function(){
        var comLen=0;
        $(".answer-con").on("blur",function(){
            comLen=$(".answer-con").val().length;
            if(comLen>500){
                $(".answer-tip").show();
                $(".answer-con").css("border","1px solid #f13848");
            }else {
                $(".answer-con").css("border","1px solid #ddd");
                $(".answer-tip").hide()
            }
        });
        $(".com-anser-btn").on("click",function(){
            if(comLen>500){
                return false;
            }
        })
    });
})
