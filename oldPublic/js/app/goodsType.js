/**
 * Created by lenovo on 2016/5/20.
 */
define(function (require,exports,module) {
    //
    var box = require('../widgets/dialogs');
    $(".mainCont").on("click","i.checkbox",function(){//��ѡ��
        var that = $(this).siblings("input");
        if($(this).hasClass("checkAll")){
            /*ȫѡ*/
            if(!$(this).hasClass("checked")){
                $(".mainCont i.checkbox").addClass("checked");
            }else{
                $(".mainCont i.checkbox").removeClass("checked");
            }
        }else{
            /*��ѡ*/
            $(this).toggleClass("checked");
        }

        if($(this).hasClass("checked")){//��ѡ���input������ֵ
            that.val("1")
        }else{
            that.val("0")
        }
    });
    $(".mainCtrl").on("click",".del", function () {//ɾ��ѡ�ж���İ�ť
        box.showConfirm({title:"�´���", content:"�Ƿ�ɾ��",width:300,subTxt:"ȷ��",cancelTxt:"ȡ��",callback: function () {
            $(".tableList i").each(function (i) {
                if($(this).hasClass("checked")){
                    $(this).parents("tr").remove();
                }
            })
        }})
    })

    $(".tableList").on("click",".del-link", function () {//���ڵ���ɾ����ť
        var _this = $(this);
        box.showConfirm({title:"�´���", content:"�Ƿ�ɾ��",width:300,subTxt:"ȷ��",cancelTxt:"ȡ��",callback: function () {
            _this.parents("tr").remove();//��ajax�ϴ��ɹ�����ô˷���
        }})
    })
})