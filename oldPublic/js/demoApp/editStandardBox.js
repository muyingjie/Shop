/**
 * Created by lenovo on 2016/5/20.
 */
define(function (require) {
    

    $(".mainCtrl").on("click","i.checkbox",function(){//��ѡ��
        var that = $(this).siblings("input");
        $(this).toggleClass("checked");
        if($(this).hasClass("checked")){
            that.val("1")
        }else{
            that.val("0")
        }
    });

    $(".delBtn").click(function () {//���
        $(".tableList tbody").append($(".hiddenBox tr").clone());
    })

    $(".tableList").on("click",".goods-standard-del", function () {//ɾ����
        var _this = $(this)
        box.showConfirm({title:"�´���", content:"�Ƿ�ɾ��",width:300,subTxt:"ȷ��",cancelTxt:"ȡ��",callback: function () {
            _this.parents("tr").remove();;//��ajax�ϴ��ɹ�����ô˷���
        }})
    });

    function sort(sortUp,sortDown){//������򷽷�
        $(document).on("click",sortUp, function () {
            var _this = $(this).parents("tr");
            var index = _this.index();
            if (index > 1) _this.prev().before(_this);
        }).on("click",sortDown, function () {
            var _this = $(this).parents("tr");
            var index = _this.index();
            var indexs = _this.siblings().length;
            if (index < indexs) _this.next().after(_this);
        })
    }
    sort(".sortUp",".sortDown");//���õ�����򣬵���ʱֻ�贫�����ϻ����µİ�ť������ID�����ɵ������򷽷�
})