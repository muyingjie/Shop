/**
 * Created by lenovo on 2016/4/26.
 */
define(function (require,exports,module) {
    
    $.fn.drag = function () {
        var obj;
        var _this;
        var data = {};
        $("body").on("mousedown",".boxList-move", function (e) {
            _this = $(this);
            obj = $(this).parent("li");
            data ={flag:true,y: e.pageY,disTop:$(this).parent("li").position().top};
            obj.before('<li class="nullLi boxR"></li>').css({
                position : "absolute",
                top : data.disTop
            })
        });
        $(document).on("mousemove", function (e) {
            if(data.flag){
                var item = obj.siblings();
                var prevs = obj.prevAll();
                var endy = e.pageY;
                var disTopEnd = endy - data.y + data.disTop;
                obj.css("top",disTopEnd);
                if(disTopEnd > data.disTop){
                    for (var i = 0;i < item.length;i++){
                        if(disTopEnd >= (item.eq(i).position().top)){
                            item.eq(i).after($(".nullLi"));
                        }
                    }
                }else{
                    for (var i = 0;i < prevs.length;i++){
                        if(disTopEnd <= (prevs.eq(i).position().top)){
                            prevs.eq(i).before($(".nullLi"));
                        }
                    }
                }
            }
        })
        $(document).on("mouseup",function (){
            if (data.flag){
                $(".nullLi").after(obj);
                obj.css("position","static");
                $(".nullLi").remove();
                data.flag = false;
                $(".box").removeClass("noCopy")
            }
        })
    }
})





