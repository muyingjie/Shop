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
    drag : "dragLine",//��קԪ�ؿ���ק��������
    tableHead : "table1",//ͷ��table����
    tableCon : "table2",//����table����
    minWidth : "20"//tab����ק����С���
};
listDrag(date.tableHead,date.tableCon);
function listDrag(tag,tag2){
    $("."+date.drag).mousedown(function (e) {
        date.obj = $(this);//��ȡ��ǰԪ��
        date.startX = e.pageX;//��ȡ�����ʼλ��
        date.tdWidth = date.obj.parents("td").width();//��ȡ��ǰtd�Ŀ�
        date.tabWidth = $("."+tag).width();//��ȡtable�Ŀ�
        date.index = date.obj.parents("td").index();//��ȡ��ǰtd�����
        date.dragBtn = true;//������ק����Ϊ��
        $("table").addClass("noCopy");
    })
    $(document).on("mousemove",function (e){
        if(date.dragBtn){
            var endX = e.pageX;//��ȡ���ʵʱλ��
            var tdMovDis = date.tdWidth+endX-date.startX;//��ȡtd��ʵʱ��
            var tabMovDis = date.tabWidth+endX-date.startX<$(window).width()?$(window).width():date.tabWidth+endX-date.startX;//��ȡtable��ʵʱ���
            if (tdMovDis >= date.minWidth){
                date.obj.parents("td").css("width",tdMovDis+"px");//ʵʱ�ı䱻��ק��td��
                $("table").css("width",tabMovDis+"px");//ʵʱ�ı�table�Ŀ�
                $("."+tag2).find("tr").each(function (i) {//ʵʱ�ı�������td�Ŀ�
                    $(this).children("td").eq(date.index).css("width",tdMovDis+"px");
                })
            }
        }else{
            return false;
        }
    })
    $(document).mouseup(function (){
        date.dragBtn = false;//������ק����Ϊ��
        $("table").removeClass("noCopy");
        var endWidth = date.obj.parents("td").width();
        var ID = date.obj.parents("td").attr("id");

    })
}