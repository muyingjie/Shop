/**
 * Created by lenovo on 2016/4/26.
 */
//拖拽效果
var date = {
    dragEle : ".boxCont",//被拖拽的元素的父元素
    dragStart : ".boxList-move",//启动拖拽的元素
    drag : "li",//被拖拽的元素
};
drag();
function drag(){
    $("body").on("mousedown",date.dragStart, function (e) {
        date.obj = $(this).parent(date.drag);
        date.disTop = date.obj.position().top;
        console.log(date.disTop);
        date.obj.before('<li class="nullLi boxR"></li>').css({
            position : "absolute",
            top : date.disTop
        });
        date.starty = e.pageY;
        date.dragBtn = true;
        $(".box").addClass("noCopy");
    })
    $(document).on("mousemove",function (e){
        if(date.dragBtn){
            var item = date.obj.siblings();
            var prevs = date.obj.prevAll();
            var endy = e.pageY;
            var disTop = endy-date.starty+date.disTop;
            date.obj.css("top",disTop);
            if (disTop > date.disTop){
                for (var i = 0;i < item.length;i++){
                    if(disTop >= (item.eq(i).position().top)){
                        item.eq(i).after($(".nullLi"));
                    }
                }
            }else{
                for (var i = 0;i < prevs.length;i++){
                    if(disTop <= (prevs.eq(i).position().top)){
                        prevs.eq(i).before($(".nullLi"));
                    }
                }
            }
        }
    })
    $(document).on("mouseup",function (){
        if (date.dragBtn){
            $(".nullLi").after(date.obj);
            date.obj.css("position","static");
            $(".nullLi").remove();
            date.dragBtn = false;
            $(".box").removeClass("noCopy")
        }
    })
}


