$(document).ready(function(){
   /*���Ϸ�ѡ����л�*/
   $("#nav-list li").each(function(){
            $(".inputC").css("disabled","disabled");
            /*Ĭ�ϵ�һ��ѡ��*/
            $("#nav-list li:first").css("border","1px solid #ccc").css("border-bottom","none").css("color","#7ab55c").siblings("li").css("border","none").css("color","#666").css("border-bottom","1px solid #ccc");

            $(this).click(function(){
                var _index=$(this).index();
                /*�������һ��liԪ�أ��������������ױߵ���� */
                if(_index ===3 ){return;}
                $(this).css("border","1px solid #ccc").css("border-bottom","none").css("color","#7ab55c").siblings("li").css("border","none").css("color","#666").css("border-bottom","1px solid #ccc");
                $(this).parents("#nav-list").siblings(".nav-contents").children("div").eq(_index).show().siblings("div").hide();
            });
        });


    /*�����������¼��ı�li��ʽ�¼�*/
    $(".oul_l").children("a").click(function (){
        $(".oul_l").children("a").children("li").removeClass("bg-col-7ab55c");
        $(this).children("li").addClass("bg-col-7ab55c");
        $(".oul_l").children("a").removeClass("bgFont");
        $(this).addClass("bgFont");
    });

    /*�޸��ı���Ĭ�ϵ�����ֵ*/
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

    /*ajax�����ύ����*/
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










