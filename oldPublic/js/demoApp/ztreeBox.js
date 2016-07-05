define(function(require){
	var $=require("jquery")
	var dlog=require("../widgets/dialogs")	
	
		$(".gen-guiBtn").click(function(){
			dlog.showIframe({title:"商品分类",url:"ztree-content.html",width:800})	
		})	
})