define(function (require, exports, module) {
	//
	var dlog = require("../widgets/dialogs");
	var treetable=require("../widgets/treetable");
	var main = require("../main");
	var pageParam = require("PageParam");
	var opctions = pageParam.getParam();
	var waring = window.waring = require("../main");
	$(".Consult-list").height($(window).height()-56);
	treetable.treeT($("#treeTList"),{column: 1,expandable: true});
	$(".editSortCode").click(function(){
		var _this=$(this);
		
		if(_this.data("opra")!="save"){
			_this.data("opra","save");
			_this.text("保存");
			$(".treetable tr").each(function(){
					$('.hidorder').remove();
					$('.p_order').show();
			})
			
		}else{
			if (result){
			_this.data("opra","edit");
			_this.text("编辑排序");
				$.ajax({
	                cache: true,
	                type: "POST",
	                url:$('#pForm').attr('action'),
	                data:$('#pForm').serialize(),// 你的formid
	                //async: false,
	                error: function(request) {
						waring.warningHide("handleDefault", "操作失败", 2000);
						setTimeout(function () {
							location.reload();
						},1000);
	                },
	                success: function(data) {
						waring.warningHide("handleSuccess", "操作成功", 2000);
						setTimeout(function () {
							location.reload();
						},1000);
	                }
	            });
			}
		}
	});
	//排序码验证
	var result = true;
	$(".tableCont").on("blur","input",function () {
		var reg = /^\d$/;
		if (!reg.test($(this).val())){
			$(this).val("")
			$(this).focus();
			waring.warningHide("handleDefault", "只能输入0和正整数", 2000);
			result = false;
		}else{
			result = true;
		}
	})
	
	$(".deleteBtn").click(function(){
		var _this=$(this);
		dlog.showConfirm({title:"提示",width:500,content:"您确定要删除该分类？",ok:function(){
			
			$.ajax({   
	        	type: "POST",
	        	url:_this.attr("url"),
	        	data:{category_id:_this.attr("id")},
	        	dataType: "json",
	        	success:function(data){
			            if(data.error){
							waring.warningHide("handleDefault", data.error, 2000);
							setTimeout(function () {
								location.reload();
							},2000)

			            }
			            if(1 == data.success){
							waring.warningHide("handleSuccess", "操作成功", 2000);
							setTimeout(function () {
								location.reload();
							},2000)
			            }
	        		}
	        });
			
			
		}});
	});
	
	//更新是否发布
	$('.upPub').click(function () {
		var _this=$(this);
		$.ajax({
			type: "GET",
			url:_this.attr("url"),
			data:{},
			dataType: "json",
			success:function(data){
				if(data.success){
					// waring.warningHide("handleDefault", data.error, 2000);
					setTimeout(function () {
						location.reload();
					},2000)

				}
				if(1 == data.success){
					waring.warningHide("handleSuccess", "操作成功", 2000);
					setTimeout(function () {
						location.reload();
					},2000)
				}
			}
		});
	});

	//新增
	$('.add').click(function () {
		wind_open(opctions.url,800,800);
	});

	$(".openClassify").click(function () {
		$('#treeTList').treetable('expandAll');
	})
	$(".closeClassify").click(function () {
		$('#treeTList').treetable('collapseAll');
	})
	
	//页面刷新
	$('.refreshBtn').click(function () {
		window.location.reload();
	});
});