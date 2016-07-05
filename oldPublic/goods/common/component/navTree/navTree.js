$(function(){
    function navTreeShow(e){//二级菜单显隐
        e.stopImmediatePropagation();
        $(this).find(".nt-second").toggleClass("c-hide");
        $(this).siblings().find(".nt-second").addClass("c-hide");

        $(this).find("p").toggleClass("nt-sel");
        $(this).siblings().find("p").removeClass("nt-sel");
    }
    $(".nt-first > li").off("click",navTreeShow).on("click",navTreeShow);

    function stopBubble(e){//阻止冒泡
        e.stopImmediatePropagation();

    }
    $(".nt-second > li").off("click",stopBubble).on("click",stopBubble);

    function navTreeStyleFir(){//一级菜单样式变化
        $(this).addClass("c-grey").siblings().removeClass("c-grey");
    }
    $(".nt-first > li").off("mouseover",navTreeStyleFir).on("mouseover",navTreeStyleFir);

    function navTreeStyleSec(){//二级菜单样式变化
        $(this).addClass("nt-list-sel").siblings().removeClass("nt-list-sel");
    }
    $(".nt-second > li").off("mouseover",navTreeStyleSec).on("mouseover",navTreeStyleSec);

});