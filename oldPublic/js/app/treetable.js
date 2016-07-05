define(function (require, exports, module) {
	//
	var dlog = require("../widgets/dialogs");
	var treetable=require("../widgets/treetable");
	var waring = window.waring = require("../main");
	treetable.treeT($("#treeTList"),{column: 1,expandable: true});
	$('.refreshBtn').click(function(){
		location.reload() ;
	});

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
			_this.data("opra","edit")
			_this.text("编辑排序")
				$.ajax({
	                cache: true,
	                type: "POST",
	                url:$('#pForm').attr('action'),
	                data:$('#pForm').serialize(),// 你的formid
	                //async: false,
	                error: function(request) {
	                    waring.warningHide("handleDefault", "操作失败", 2000);
	                    setTimeout(function(){location.reload()},2000);
	                },
	                success: function(data) {
	                	waring.warningHide("handleSuccess", "操作成功", 2000);
	                	setTimeout(function(){location.reload()},2000);
	                }
	            });
				
		}
	});
	
	$(".deleteBtn").click(function(){
		var _this=$(this)
		dlog.showConfirm({title:"提示",width:500,content:"您确定要删除该分类？",ok:function(){
			
			$.ajax({   
	        	type: "POST", 
	        	url:_this.attr("url"),
	        	data:{cat_id:_this.attr("id")},
	        	dataType: "json",  
	        	success:function(data){
			            if(data.error){
			            	waring.warningHide("handleDefault", data.error, 3000);
			            	setTimeout(function(){location.reload()},3000);
			            }
			            if(1 == data.success){
			            	waring.warningHide("handleSuccess", "操作成功", 2000);
			            	setTimeout(function(){location.reload()},2000);
			            }
	        		}
	        });

		}})
	});
	//控制列表的高度
	/*var tableFixedHeight=$(".goods-classify-table").find("tr").height()*15;*/
	$(".mainCont").height($(window).height()-55);
	$(".tableCont").height($(".mainCont").height()-70).css("overflow-y","auto").css("border","1px solod red")

});