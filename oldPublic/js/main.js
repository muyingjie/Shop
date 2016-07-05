/*列表顶部控制按钮*/
define(function(require,exports,moudel){
var dlog=require("widgets/dialogs");//$ = require("jquery"),

/*$(".mainCtrl").on("click", "span", function () {
    var _this = $(this), url = "";
    if (_this.hasClass("ex")) {
        _this.toggleClass("sel").parent().siblings().find("span").removeClass("sel").next().hide()
        _this.next().toggle();
        return false;
    }

    if (_this.hasClass("delBtn") && $(".checked:not(.checkAll)").length > 0) {//删除按钮
        data.type = "del"
        ajax("delete.html", "post", data, function (res) {
            $(".tableCont").html(res)
            delete data.type
            listInit()
        })
    }
    if (_this.hasClass("useBtn") && $(".checked:not(.checkAll)").length > 0) {//启用按钮
        data.useType = 1
        ajax("delete.html", "post", data, function (res) {
            $(".tableList .checked").each(function () {
                $(this).parents("tr").find(".use i").attr("class", "yes")
            })
            $(".checkbox").removeClass("checked")
            $(".checkTip").hide()
            delete data.useType
        })
    }
    if (_this.hasClass("unuseBtn") && $(".checked:not(.checkAll)").length > 0) {//停用按钮
        data.useType = 0
        ajax("delete.php", "post", data, function (res) {
            $(".tableList .checked").each(function () {
                $(this).parents("tr").find(".use i").attr("class", "no")
            })
            $(".checkbox").removeClass("checked")
            $(".checkTip").hide()
            delete data.useType
        })
    }
    if (_this.hasClass("exportBtn") && $(".checked:not(.checkAll)").length > 0) {
        data.exportData = "export"
        showBox($(".exportBox"), "1.php", data, function () {
            delete data.exportData
        })

    }
})*/

function ajax(url, type, data, successCallback) {
   /* if ($(".isAll").val() == 1) {
        var arr = $(".tableList .checked:not(.checkAll)").map(function () {
            return $(this).parents("tr").attr("id")
        }).get()
        data.ids = arr
    } else {
        data.ids = 0
    }*/
    warningHide("handleLoad", "加载中，请稍后！")
	$.ajax({
        url: url,
        type: type,
        data: data,
        success: function (res) {
            warningHide("handleSuccess", "操作成功！", 2000)
			successCallback(res);
        },
        error: function () {
            warningHide("handleDefault", "操作失败，请重试！", 2000)
        }
    })
}
function warningHide(classname, txt, delay) {
    $(".handleWarning").attr("class", "handleWarning " + classname).text(txt).show()
	var timer
    if (classname != "handleLoad") {
		clearTimeout(timer)
        timer=setTimeout(function () {
            $(".handleWarning").fadeOut()
        }, delay)
    }
}
    window.waring = warningHide;
function listInit() {//列表初始化
    $(".tableTitle th").each(function (i) {
        var _width = $(this).width();
        //$(".tableList tr:eq(0) td").eq(i).width(_width)
        $(".tableList tr td").eq(i).width(_width)
    });
}
listInit();
    function listInit1($obj1,$obj2) {//列表初始化 this是当前的元素
        var aW= [];
        $obj1.find("tr").eq(0).find("th").each(function(i,o){
            aW.push($(o).width());
        });
        $obj2.find("tr").eq(0).find("td").each(function(i,o){
            $(o).css({"width":aW[i]});
        });
    }

/*$(".refreshBtn").click(function () {//刷新
    ajax("", "post", {currpage: $(".currPage").val()}, function (res) {
        $(".tableCont").html(res)
        listInit()
    })
});

$(".configBtn").click(function(){
	dlog.showIframe({title:"分类配置",url:"config.html",width:400})	
})*/
moudel.exports={
	listInit:listInit,
	listInit1:listInit1,
	warningHide:warningHide,
	ajax:ajax
}
});
