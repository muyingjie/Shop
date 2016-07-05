///**
// * Created by lenovo on 2016/4/27.
// */
//$.fn.listDrag=function(opt){
//    var _this=$(this)
//    _this.mousedown(function(e){
//        $(this).data({flag:true,x: e.pageX,_width:$(this).parent().width(),tableWidth:$(this).parents("table").width().o=opt.tar.width()})
//        _this=$(this)
//
//    })
//    $(document).mousemove(function(e){
//        if(_this.data("flag")){
//            console.log(1)
//            var dis=e.pageX-_this.data("x")
//            _this.parent().width(_this.data("_width")+dis)
//            _this.parents("table").width(_this.data("tableWidth")+dis)
//            opt.tar.width(_this.data("o")+dis)
//            var index=_this.parent().index()
//            opt.tar.find("tr").each(function(){
//                $("td",this).eq(index).width(_this.parent().width())
//            })
//        }
//    }).mouseup(function(){
//        _this.data("flag",false)
//    })
//
//
//}
//$(".dragLine").listDrag({tar:$(".table2")})
$(".table1 td").each(function(){
    for(var i in localStorage["table1"]){
        if($(this).attr[id]==i){
            $(this).width(localStorage["table1"][i])
        }
    }
})
var date = {
    drag : "dragLine",//拖拽元素可拖拽部分类名
    tableHead : "table1",//头部table类名
    tableCon : "table2",//内容table类名
    minWidth : "20"//tab可拖拽的最小宽度
};
listDrag(date.tableHead,date.tableCon);
function listDrag(tag,tag2){
    $("."+date.drag).mousedown(function (e) {
        date.obj = $(this);//获取当前元素
        date.startX = e.pageX;//获取鼠标起始位置
        date.tdWidth = date.obj.parents("td").width();//获取当前td的宽
        date.tabWidth = $("."+tag).width();//获取table的宽
        date.index = date.obj.parents("td").index();//获取当前td的序号
        date.dragBtn = true;//设置拖拽开关为开
        $("table").addClass("noCopy");
    })
    $(document).on("mousemove",function (e){
        if(date.dragBtn){
            var endX = e.pageX;//获取鼠标实时位置
            var tdMovDis = date.tdWidth+endX-date.startX;//获取td的实时宽
            var tabMovDis = date.tabWidth+endX-date.startX<$(window).width()?$(window).width():date.tabWidth+endX-date.startX;//获取table的实时宽度
            if (tdMovDis >= date.minWidth){
                date.obj.parents("td").css("width",tdMovDis+"px");//实时改变被拖拽的td宽
                $("table").css("width",tabMovDis+"px");//实时改变table的宽
                $("."+tag2).find("tr").each(function (i) {//实时改变联动项td的宽
                    $(this).children("td").eq(date.index).css("width",tdMovDis+"px");
                })
            }
        }else{
            return false;
        }
    })
    $(document).mouseup(function (){
        date.dragBtn = false;//设置拖拽开关为关
        $("table").removeClass("noCopy");
        var endWidth = date.obj.parents("td").width();
        var ID = date.obj.parents("td").attr("id");

    })
}