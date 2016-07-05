define(function (require, exports, module) {
	
	var treetable=require("../widgets/treetable")
	treetable.treeT($("#treeTList"),{column: 1,expandable: true})
	$(".editSortBtn").click(function(){
		var _this=$(this)
		
		if(_this.data("opra")!="save"){
			_this.data("opra","save")
			_this.val("保存")
			$(".treetable tr").each(function(){
				$("td:eq(3)",this).html(function(){
					return "<input type=\"text\" class=\"sortNum\" value=\""+$.trim($(this).text())+"\">"	
				})	
			})
			
		}else{
			_this.data("opra","edit")
			_this.val("编辑排序")
			//ajax回调
			$(".treetable tr").each(function(){
				$("td:eq(3)",this).html(function(){
					return "<span>"+$(":text",this).val()+"</span>"	
				})	
			})	
		}
	})
})