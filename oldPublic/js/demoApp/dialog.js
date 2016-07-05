define(function(require){
	var dlog=require("../widgets/dialogs"),$=require("jquery"),main=require("../main")
	$(".alertBtn").click(function(){
		var _this=$(this)
		dlog.showAlert({title:"提示",width:500,content:"这是alert内容",ok:function(){
			main.warningHide("handleSuccess", "操作成功！", 2000)
		}})
	})
	$(".confirmBtn").click(function(){
		dlog.showConfirm({title:"提示",width:500,content:"这是confirm内容"})
	})
	$(".iframeBtn").click(function(){
		dlog.showIframe({title:"提示",width:500,url:"ztree-content.html",data:{id:1},callback:function(ab){main.warningHide("handleDefault", "操作失败！", 2000)}})
	})
})