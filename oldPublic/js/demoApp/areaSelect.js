/**
 * Created by lenovo on 2016/5/31.
 */
define(function (require) {
    
    require('../widgets/areaSelect');
    var pageParam = require("PageParam");
    var dlog = require("../widgets/dialogs");

    var pageOptions = pageParam.getParam();
    $('.tree').tree(pageOptions);//调用地区tree

    $(".saveBtn").click(function () {//保存按钮
        var arry_province = [];
        var arry_city = [];
        var arry_town= [];

        $("input[level=one]:checked").each(function () {//获取所有已选的区域数据
            arry_city = [];//初始化二级数组
            $(this).siblings(".two").children("input[level=two]:checked").each(function(){
                arry_town= [];//初始化三级数组
                $(this).siblings(".three").find("input[level=three]:checked").each(function () {
                    arry_town.push({"id":$(this).val(),"name":$(this).attr("name")});
                });
                arry_city.push({"id":$(this).val(),"name":$(this).attr("name"),"town":arry_town});
            });
            arry_province.push({"id":$(this).val(),"name":$(this).attr("name"),"city":arry_city});
        });

        var area = JSON.stringify(arry_province);//将获得的所有已选区域的数据转换为字符串
        var showArea = [];
        $("input[level=one]:checked").each(function () {//获得父页面前端展示的数据
            var length = $(this).siblings(".two").find("input").length;
            var lengthed = $(this).siblings(".two").find("input:checked").length;
            length == lengthed ? showArea.push($(this).attr("name")+"全省") : showArea.push($(this).attr("name")+"部分地区");
        })


        var obj = {"showArea":showArea,"uploadArea":area};//传递给父页面的所有数据对象

        dlog.closeDialog(obj);

    })
})