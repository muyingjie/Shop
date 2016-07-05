$(document).ready(function(){
   /*右上方选项卡的切换*/
   $("#nav-list li").each(function(){
            $(".inputC").css("disabled","disabled");
            /*默认第一个选中*/
            $("#nav-list li:first").css("border","1px solid #ccc").css("border-bottom","none").css("color","#7ab55c").siblings("li").css("border","none").css("color","#666").css("border-bottom","1px solid #ccc");

            $(this).click(function(){
                var _index=$(this).index();
                /*当是最后一个li元素，不做处理，用作底边的填充 */
                if(_index ===3 ){return;}
                $(this).css("border","1px solid #ccc").css("border-bottom","none").css("color","#7ab55c").siblings("li").css("border","none").css("color","#666").css("border-bottom","1px solid #ccc");
                $(this).parents("#nav-list").siblings(".nav-contents").children("div").eq(_index).show().siblings("div").hide();
            });
        });


    /*左侧栏鼠标点击事件改变li样式事件*/
    $(".oul_l").children("a").click(function (){
        $(".oul_l").children("a").children("li").removeClass("bg-col-7ab55c");
        $(this).children("li").addClass("bg-col-7ab55c");
        $(".oul_l").children("a").removeClass("bgFont");
        $(this).addClass("bgFont");
    });

    /*修改文本框默认的属性值*/
    $(".img_r").click(function(){
        $(this).siblings(".confirm,.cancel").css("display","inline-block");
        $(this).prev(".inputC").removeAttr("disabled");
        $(this).prev(".inputC").addClass("bor");
        $(this).prev(".inputC").css("background-color","#f5f5f5");

        $(this).hide();
    });
    $(".confirm").click(function(){
        $(this).siblings(".inputC").css("background-color","#fff");
        $(this).hide();
        $(this).siblings(".inputC").removeClass("bor");
        $(this).siblings("span").hide();
        $(this).siblings(".img_r").show();
        $(this).siblings(".inputC").attr("disabled","disabled");

    });
    $(".cancel").click(function(){
        $(this).siblings(".inputC").css("background-color","#fff");
        $(this).hide();
        $(this).siblings(".inputC").val("");
        $(this).siblings(".inputC").removeClass("bor");
        $(this).siblings(".img_r").show();
        $(this).siblings("span").hide();
        $(this).siblings(".inputC").attr("disabled","disabled");
    });

    /*ajax数据提交部分*/
    $(".confirm").click(function(){
        var inputV = $(this).siblings(".inputC").attr("value");
        var ID = $(this).parent("dd").attr("id");

       $.post("",{"ID":ID,"inputV":inputV},function(data){
            if(data.status == "success"){

            }else{

            }
        },"json")





    });



    });










