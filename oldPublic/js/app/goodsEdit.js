define(function (require) {
    //
    require('../widgets/select');
    window.box = require('../widgets/dialogs');
    var showMsg = require('../widgets/validate').showMsg;
    $(".container").height($(window).height()-53).css("overflow","auto");
    //选择商品分类
    $("#selectClassify").click(function () {
        box.showIframe({
            title:"选择商品分类",
            width:500,
            url:$(this).attr("url"),
            data:{key:1},
            callback:function(data){
                $("#cat_id").val(data.cat_id);
                $("#cat_name").text(data.cat_name);
                //console.log(data)
            }})
    });
    //添加图片
    $(".fake-img").click(function () {
        box.showIframe({
            title:"图片选择",
            width:500,
            url:$(this).attr("url"),
            data:{key:1},
            callback:function(data){
                $("#goodsImgList").append(
                    '<div class="addGoodsImg">'
                    +'<img src="'+data.image_src+'" width="100%">'
                    +'<input type="hidden" value="'+data.image_id+'" name="image_default_id[]"/>'
                    +'<i class="deleteIcon"></i>'
                    +'</div>'
                )
            }})
    });
    //自定义图片
    $(".fake-div").click(function () {//添加图片
        box.showIframe({
            title:"图片选择",
            width:500,
            url:$(this).attr("url"),
            data:{key:1},
            callback:function(data){
                $("#goodsImgList2").find(".addGoodsImg").remove();
                $("#goodsImgList2").append(
                    '<div class="addGoodsImg">'
                    +'<img src="'+data.image_src+'" width="100%">'
                    +'<input type="hidden" value="'+data.image_id+'" name="udfimg"/>'
                    +'<i class="deleteIcon"></i>'
                    +'</div>'
                )
            }})
    });
    //轮显 是否开启自定义图片
    $("#img-pics input[type=radio]").click(function(){
        if($(this).val() == '1'){
            $("#udfimg_show").css("display","block");
        }else{
            $("#udfimg_show").css("display","none");
        }
    })

    //删除图片
    $(".goodsImgList").on("click",".deleteIcon", function () {
        $(this).parents(".addGoodsImg").remove()
    });
    //选择商品
    //$(".selGoods").click(function () {
    //    box.showIframe({
    //        title:"提示",
    //        width:500,
    //        url:"ztree-content.html",
    //        data:{key:1},
    //        callback:function(data){
    //            console.log(data)
    //        }})
    //});
    //删除商品
    $(".separate-color").on("click",".del", function () {
        $(this).parents("tr").remove();
    })



    $(".select:eq(1)").select({onlyShow:false});//下拉
    $(".select:eq(2)").select({onlyShow:false});//下拉
    $(".select:eq(3)").select({onlyShow:false});//下拉

    //$(".select").on('sltChange', function(event, val) {//媒介类型的切换对应
    //    if($(this).hasClass("type_edit")){
    //        return false;
    //    }
    //    $(this).find("input").val(val.value);//给商品类型隐藏域赋值
    //});

    $(function(){
        var old_val = $("#type_id").val();
        var g_id = $("#g_id").val();
        //alert(old_val);
        //alert(g_id);
        //var typeUrl = $("#type_id").attr('url');
            $.ajax({
                type: "get",
                url: "/index.php/Goods/goodsType/getHtmlByEdit",
                data: 'id='+old_val+'&g_id='+g_id,
                success: function(msg){
                    //alert(msg);
                    $("#is_here").before(msg);
                    $(".select:gt(3)").each(function(){
                        $(this).select({onlyShow:false})
                    });//下拉
                    if(msg != ''){
                        $(".price_item").css('display', 'none');
                    }else{
                        $(".price_item").css('display', 'block');
                    }
                },
                error:function(data){
                    console.log('data',data);
                    //alert(data);
                }
            });
    });

    $("#is_father").on('click',".c-img",function(){
        var _this = $(this);
        var val_id = $(this).attr("name");
        box.showIframe({
                    title:"图片选择",
                    width:500,
                    url:$(this).attr("url"),
                    data:{key:1},
                    callback:function(data){
                        var str = '<img src="'+data.image_src+'" style="height: 32px;width: 32px;">';
                        str += '<input type="hidden" value="'+data.image_id+'" name="f_img[]"/>';
                        str += '<input type="hidden" value="'+val_id+'" name="f_val_id[]"/>';
                        str += '<i class="deleteIcon"></i>';
                        _this.next().html(str);
                    }})
    })




    $("#is_father").delegate(".checkbox","click", function () {
        $(this).toggleClass("checked");
        if($(this).hasClass("isUserBox")){
            $(this).hasClass("checked") ? $(this).siblings("input").val("1") : $(this).siblings("input").val("2");
            return false;
        }
        if($(this).hasClass("isDefaultBox")){
            $(".isDefaultBox").removeClass("checked").siblings("input").val("2");

            $(this).addClass("checked").hasClass("checked") ? $(this).siblings("input").val("1") : $(this).siblings("input").val("2");
            return false;
        }


        if($(this).hasClass("checked")){//已选中
            var val = $(this).siblings("span").text();
            var val_id = $(this).attr("v");
            $(this).siblings("input").eq(0).val(val);
            $(this).siblings("input").eq(1).val(val_id);

            var url = $(".fake-div").attr("url");
            var show_type = $(this).attr("name");

            var str = '';
            str += '<tr>';
            str += '<td><span>'+val+'</span></td>';
            str += '<td><input type="text" class="txt Goods-input1" onblur="updateVals(this)" value="'+val+'"></td>';
            if(show_type == '1'){
                str += '<td><div class="c-img" url="'+url+'" name="'+val_id+'">添加图片</div><div></div></td>';
            }else{
                str += '<td>&nbsp;</td>';
            }
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
        var arr_id=[[],[],[]];

        var aAll= $('#box_main').find('.goodsClassify');

        $.each(aAll,function(i,v){
            var aCheckbox=$(v).find('.IsCheckBox');
            $.each(aCheckbox,function(x,z){
                if($(z).val()){
                    arr[i].push(z)
                }
            })

            var aCheckboxId=$(v).find('.IsCheckBoxId');
            $.each(aCheckboxId,function(x,z){
                if($(z).val()){
                    arr_id[i].push(z)
                }
            })
        })
        var index = $(this).parents(".goodsClassify").index()-1;
        //if($(this).siblings("input").val()) arr[index] = [$(this).siblings("input")[0]];
        if($(this).siblings("input").val()){
            arr[index] = [$(this).siblings("input")[0]];
            arr_id[index] = [$(this).siblings("input")[1]];
        }
        //arr.length = aAll.length;
        //console.log(arr_id);
        var arr_1 = eval(arr[0]);
        var arr_2 = eval(arr[1]);
        var arr_3 = eval(arr[2]);
        var arr_id_1 = eval(arr_id[0]);
        var arr_id_2 = eval(arr_id[1]);
        var arr_id_3 = eval(arr_id[2]);

        var str  = '';
        if(arr_1.length > 0){
            for(a in arr_1){
                if(arr_2.length > 0){
                    for (b in arr_2){
                        if(arr_3.length > 0){
                            for(c in arr_3){
                                str =  addStr(str,arr_1[a].value,arr_id_1[a].value,arr_2[b].value,arr_id_2[b].value,arr_3[c].value,arr_id_3[c].value);
                            }
                        }else{
                            str =  addStr(str,arr_1[a].value,arr_id_1[a].value,arr_2[b].value,arr_id_2[b].value,'','');
                        }
                    }
                }else if(arr_3.length > 0){
                    for(c in arr_3){
                        str =  addStr(str,arr_1[a].value,arr_id_1[a].value,'','',arr_3[c].value,arr_id_3[c].value);
                    }
                }else{
                    str =  addStr(str,arr_1[a].value,arr_id_1[a].value,'','','','');
                }
            }
        }else{
            alert('生成货品的话，请选择一个第一列的值');
        }

        if($(this).hasClass("checked")){

            var tpl = false;
            $.each(arr,function (i,v) {
                if(arr[i].length>0){
                    tpl = true;
                }else{
                    tpl = false;
                    return false
                }
            })
            if(tpl){
                $("#goods-norms_list tbody").append(str);
            }

        }else{
            $("#goods-norms_list tbody").find("span").each(function () {
                if($(this).text() == val)  $(this).parents("tr").remove();
            })
        }
        //$(".commodity_list").remove();
        //$("#list").after(str);
    });



    ////提交
    //$("#addGoods").click(function(){
    //    var cat_id      = $("#cat_id").val();
    //    var type_id     = $("#type_id").val();
    //    var goods_name  = $("#goods_name").val();

    //    if(cat_id == '' || type_id == '' || goods_name=='' ){
    //        alert('请完善信息！');
    //        return false;
    //    }
    //    $("#Form_sub").submit();
    //});


    $(".select").on("click", function (e) {
        $.html5Validate.isAllpass($(this));
    });
    $('form').on('blur', 'input', showMsg);

    //提交
    $("#addGoods").click(function () {
        if ($(".js_select").select('getValue') != undefined) {
            $(".price_item").find("input").removeAttr("required")
        };
        /* if($(".price_item").length){
             alert(123);
         }*/

        //校验货品表格 by 穆英杰================
        var $comList = $("#goods-norms_list .commodity_list");
        //货品编号数组
        var aComNumVal = [];
        //库存数量数组
        var aStockNumVal = [];
        //市场价数组
        var aMarketPrice = [];
        //零售价数组
        var aRetailPrice = [];
        //货品重量数组
        var aComWeight = [];
        //货品编号选中与否情况
        var aGoodsNumIsSelect = [];
        $comList.find("input[name='f_bn[]']").each(function (i, o) {
            aComNumVal.push($(o).val());
        });
        //默认一列至少选中一个
        $comList.find("input[name='is_default[]']").each(function (i, o) {
            aGoodsNumIsSelect.push($(o).val());
        });
        var aRepeatComIndex = [];
        var aRepeatComIndexItem = [];
        var aComErrCollect = [];
        var isComRepeat = false;
        //货品编号是否有一个被选中
        var isSelectAGoodNum = false;
        for (var i = 0; i < aComNumVal.length; i++) {
            aRepeatComIndexItem = [];
            for (var j = i + 1; j < aComNumVal.length; j++) {
                if (aComNumVal[i] == aComNumVal[j]) {
                    isComRepeat = true;
                    aRepeatComIndexItem.push(i, j);
                }
            }
            if (aRepeatComIndexItem.length != 0) {
                aRepeatComIndex.push(aRepeatComIndexItem);
            }
        }
        for (var i = 0; i < aGoodsNumIsSelect.length; i++) {
            if (aGoodsNumIsSelect[i] == "1") {
                isSelectAGoodNum = true;
            }
        }
        if (isComRepeat) {
            aComErrCollect.push("货品编号不可重复");
        }
        //if (isGoodsNumExist) {
        //    aComErrCollect.push("商品编号已存在");
        //}
        //if (isGoodsBnExist) {
        //    aComErrCollect.push("货号已存在");
        //}
        if (!isSelectAGoodNum) {
            aComErrCollect.push("货品编号必须有一个选中");
        }
        $comList.find("input[name='f_store[]']").each(function (i, o) {
            aStockNumVal.push($(o).val());
        });
        $comList.find("input[name='f_price_market[]']").each(function (i, o) {
            aMarketPrice.push($(o).val());
        });
        $comList.find("input[name='f_price_selling[]']").each(function (i, o) {
            aRetailPrice.push($(o).val());
        });
        $comList.find("input[name='f_weight[]']").each(function (i, o) {
            aComWeight.push($(o).val());
        });
        var aNeedJudgeIsEmptyCollect = [{
            handleArr: aStockNumVal,
            relatedStr: "库存数量"
        }, /*{
            handleArr: aMarketPrice,
            relatedStr: "市场价"
        },*/ {
            handleArr: aRetailPrice,
            relatedStr: "零售价"
        }, {
            handleArr: aComWeight,
            relatedStr: "货品重量"
        }];
        $.each(aNeedJudgeIsEmptyCollect, function (arri, arro) {
            isComRelatedValHasEmpty(arro.handleArr, function () {
                aComErrCollect.push(arro.relatedStr + "不能为空");
            });
        });
        //console.log(aComNumVal);
        //封装判断是否为空的方法
        //需传入需要遍历的数组以及如果为空执行的回调
        function isComRelatedValHasEmpty(arr, fn) {
            var isHasEmpty = false;
            $.each(arr, function (i, o) {
                if ($.trim(o).length == 0) {
                    isHasEmpty = true;
                }
            });
            if (isHasEmpty) {
                fn && fn();
            }
        }

        //判断是否上传了图片
        if ($("#goodsImgList .addGoodsImg").length == 0) {
            aComErrCollect.push("必须上传商品图片");
        }
        //自定义商品图片选中时需要上传图片
        console.log($(".selfDefineGoodImg label[for='difine'] input").prop("checked"));
        var isHasEmptySrcImg = false;
        $("#goodsImgList2 .addGoodsImg img").each(function (i, o) {
            if (!$(o).attr("src")) {
                isHasEmptySrcImg = true;
            }
        });
        if ($(".selfDefineGoodImg label[for='difine'] input").prop("checked") && ($("#goodsImgList2 .addGoodsImg").length == 0 || isHasEmptySrcImg)) {
            aComErrCollect.push("需上传自定义商品图片");
        }
        if (aComErrCollect.length > 0) {
            alert(aComErrCollect.join("\n"));
            return false;
        }
        //=====================================
        
        var result = $.html5Validate.isAllpass($('form'));

        if ($('form').find('.error')[0]) {
            showMsg.call($('form').find('.error')[0]);
        }
        if (result) {
            $("#Form_sub").submit();
        } else {
            return false;
        }
        //var cat_id      = $("#cat_id").val();
        //var type_id     = $("#type_id").val();
        //var goods_name  = $("#goods_name").val();

        //if(cat_id == '' || type_id == '' || goods_name=='' ){
        //   alert('请完善信息！');
        //    return false;
        //}
        //alert($("#Form_sub").attr("action"))
        //$("form").submit();
        //$.post($("#Form_sub").attr("action"),{tpl:"1"}, function (data) {
        //
        //},"json")
    });



});
var n = 1;
function addStr(str,val_1,val_id_1,val_2,val_id_2,val_3,val_id_3){
    n++;
    str += '<tr class="commodity_list">';
    str += '<td><input type="text" value="___'+n+'" name="f_bn[]"><input type="hidden" value="null" name="f_id[]"></td>';
    //str += '<td><span>10</span><input type="hidden" value="10" name="f_integral[]"></td>';
    str += '<td><span class="2_'+val_1+'">'+val_1+'</span><input type="hidden" class="2_'+val_1+'" value="'+val_id_1+'" name="f_item_1[]"></td>';
    str += '<td><span class="1_'+val_2+'">'+val_2+'</span><input type="hidden" class="1_'+val_2+'" value="'+val_id_2+'" name="f_item_2[]"></td>';
    str += '<td><span class="0_'+val_3+'">'+val_3+'</span><input type="hidden" class="0_'+val_3+'" value="'+val_id_3+'" name="f_item_3[]"></td>';
    str += '<td><input type="text" class="txt Goods-input2" value="" name="f_store[]"></td>';
    str += '<td><input type="text" class="txt Goods-input2" value="" name="f_price_market[]"></td>';
    str += '<td><input type="text" class="txt Goods-input2" value="" name="f_price_selling[]"></td>';
    //str += '<td><a href="#" class="edit">设置</a></td>';
    str += '<td><input type="text" class="txt Goods-input2" value="" name="f_weight[]"></td>';
    str += '<td><input type="hidden" name="is_use[]" value="1"/><i class="checkbox isUserBox checked" v=""></i></td>';
    str += '<td><input type="hidden" name="is_default[]" value="2"/><i class="checkbox isDefaultBox" v=""></i></td>';
    str += '</tr>';

    return str;
}
function updateVals(obj){
    var father = $(obj).parent().parent().parent().find("tr:first").attr("id");
    var a = $(obj).parent().prev().text();
    $("."+father+'_'+a).text(obj.value);
    //alert(father+'--'+obj.value+'---'+a);
}