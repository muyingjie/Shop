define(function (require) {
    
    require('../widgets/select');

    $(".selectClassify").click(function () {//选择商品分类
        box.showIframe({
            title:"提示",
            width:500,
            url:"http://www.webshop.com/index.php/goods/goodscat/ztree",
            data:{key:1},
            callback:function(data){
                console.log(data)
            }})
    });

    $(".fake-img").click(function () {//添加图片
        box.showIframe({
            title:"提示",
            width:500,
            url:"ztree-content.html",
            data:{key:1},
            callback:function(data){
                $(".goodsImgList").append(
                    '<div class="addGoodsImg">'
                    +'<img src="'+data.image_url+'">'
                    +'<input type="hidden" value="'+data.image_id+'"/>'
                    +'<i class="deleteIcon"></i>'
                    +'</div>'
                )
            }})
    });

    $(".goodsImgList").on("click",".deleteIcon", function () {//删除图片
        $(this).parents(".addGoodsImg").remove()
    });

    $(".selGoods").click(function () {//选择商品
        box.showIframe({
            title:"提示",
            width:500,
            url:"ztree-content.html",
            data:{key:1},
            callback:function(data){
                console.log(data)
            }})
    });

    $(".separate-color").on("click",".del", function () {
        $(this).parents("tr").remove();
    })



    $(".select").select({onlyShow:false});//下拉
    $(".select").on('sltChange', function(event, val) {//媒介类型的切换对应
        $(this).find("input").val(val.value);//给商品类型隐藏域赋值
    });

    $(".goodsClassify").on("click",".checkbox", function () {

        $(this).toggleClass("checked");

        if($(this).hasClass("checked")){//已选中
            var val = $(this).siblings("span").text();
            $(this).siblings("input").val(val);
            var str = '';
            str += '<tr>';
            str += '<td><span>'+val+'</span></td>';
            str += '<td><input type="text" class="txt Goods-input1" onblur="updateVals(this)" value="'+val+'"></td>';
            str += '<td><a href="javascrip:void(0)" class="edit">选择</a></td>';
            str += '</tr>';


            $(this).parent().parent().find(".goods-norms").append(str);
        }else{
            var val = $(this).siblings("span").text();

            $(this).parent().parent().find("tr").each(function(index,element){

                if($(element).find("span").html() == val ){
                    $(element).remove();
                }
            });
            //取消选中
            $(this).siblings("input").val("");

        };
        var arr=[[],[],[]];

        var aAll= $('#box_main').find('.goodsClassify');

        $.each(aAll,function(i,v){
            var aCheckbox=$(v).find('.IsCheckBox');
            $.each(aCheckbox,function(x,z){
                if($(z).val()){
                    arr[i].push(z)
                }
            })
        })
        arr.length = aAll.length;
        //console.log(arr);
        var arr_1 = eval(arr[0]);
        var arr_2 = eval(arr[1]);
        var arr_3 = eval(arr[2]);

        var str  = '';
        //var val_1 = '';
        //var val_2 = '';
        //var val_3 = '';
        if(arr_1.length > 0){
            for(a in arr_1){
                if(arr_2.length > 0){
                    for (b in arr_2){
                        if(arr_3.length > 0){
                            for(c in arr_3){
                                //val_1 = arr_1[a].value;
                                //val_2 = arr_2[b].value;
                                //val_3 = arr_3[c].value;
                                str =  addStr(str,arr_1[a].value,arr_2[b].value,arr_3[c].value);
                            }
                        }else{
                            str =  addStr(str,arr_1[a].value,arr_2[b].value,'');
                        }
                    }
                }else if(arr_3.length > 0){
                    for(c in arr_3){
                        str =  addStr(str,arr_1[a].value,'',arr_3[c].value);
                    }
                }else{
                    str =  addStr(str,arr_1[a].value,'','');
                }
            }
        }else{
            alert('生成货品的话，请选择一个第一列的值');
        }
        $(".commodity_list").remove();
        $("#list").after(str);


    });

    function addStr(str,val_1,val_2,val_3){

        str += '<tr class="commodity_list">';
        str += '<td><span>1001156501</span></td>';
        str += '<td><span>10</span></td>';
        str += '<td><span class="2_'+val_1+'">'+val_1+'</span><input type="hidden" class="2_'+val_1+'" value="'+val_1+'"></td>';
        str += '<td><span class="1_'+val_2+'">'+val_2+'</span><input type="hidden" class="1_'+val_2+'" value="'+val_2+'"></td>';
        str += '<td><span class="0_'+val_3+'">'+val_3+'</span><input type="hidden" class="0_'+val_3+'" value="'+val_3+'"></td>';
        str += '<td><input type="text" class="txt Goods-input2" value=""></td>';
        str += '<td><input type="text" class="txt Goods-input2" value=""></td>';
        str += '<td><input type="text" class="txt Goods-input2" value=""></td>';
        str += '<td><a href="#" class="edit">设置</a></td>';
        str += '<td><input type="text" class="txt Goods-input2" value=""></td>';
        str += '<td><i></i></td>';
        str += '</tr>';

        return str;
    }
});
function updateVals(obj){
    var father = $(obj).parent().parent().parent().find("tr:first").attr("id");
    var a = $(obj).parent().prev().text();
    $("."+father+'_'+a).text(obj.value);
    //alert(father+'--'+obj.value+'---'+a);
}