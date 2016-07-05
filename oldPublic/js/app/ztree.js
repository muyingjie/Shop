define(function (require, exports, module) {
	//
	var ztree=require("../widgets/ztree")
	var pageParam = require("PageParam");
	var datas = pageParam.getParam().tree;
	if(datas == ''){
		alert('请先添加分类信息');
		return false;
	}else{
		ztree.tree($("#treeDemo"),{zNodes:datas,hiddenID:"treeVal"});
	}
	
	$('#postBtn').click(function(){
		$('#catSearch').submit();
	});
	
	
})