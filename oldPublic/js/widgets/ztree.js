define(function (require, exports, module) {
	
	var zexcheck=require("zexcheck")
	var zcore=require("zcore")
	
	exports.tree=function(treeDom,option){
		var defaults={
			setting: {
				check: {
					enable: true,
					chkStyle: "radio",
					radioType: "all"
				},
				data: {
					simpleData: {
						enable: true
					}
				},
				callback: {
					onCheck: zTreeOnCheck
				}
			},
			zNodes:[],
			hiddenID:"treeVal"
		}
		var opts=$.extend(true,{},defaults,option),code;	
		if($("#"+opts.hiddenID).length==0){
			treeDom.before("<input type=\"hidden\" id=\""+opts.hiddenID+"\">")	
		}
		function setCheck() {
			showCode(opts.setting.check.radioType);
			$.fn.zTree.init(treeDom, opts.setting, opts.zNodes);
		}
		function showCode(str) {
			if (!code) code = $("#code");
			code.empty();
			code.append("<li>"+str+"</li>");
		}
		function zTreeOnCheck(event,treeId,treeNode) {
			$("#"+opts.hiddenID).val(treeNode.v).attr("name",treeNode.name);
		};
		$(document).ready(function(){
			setCheck();
		});
		
	}
})