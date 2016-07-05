define(function(require){
	var $=require("jquery"),main=require("../main"),dlog=require("../widgets/dialogs");
	var lelist=$(".levellist"),lalist=$(".labellist")
	function display(type,a,b){
		if(type=="show"){
			a.show()
			b.addClass("sel")
		}
		if(type=="hide"){
			a.hide()
			b.removeClass("sel")
		}
	}
	$(".ex").click(function(){
		var list=$(this).siblings()
		
		if(list.is(":visible")){
			display("hide",list,$(this))	
		}else{
			if($(".datagrid-row-checked").length>0){
				if($(this).hasClass("ck")){
					main.ajax("index.html","post",{},function(res){
						lalist.find("dd").each(function(i){
							if(res[i]==1){
								$(this).addClass("checked")	
							}
						})
					})
				}
				console.log(list)
				display("show",list,$(this))
			}else{
				main.warningHide("handleDefault","至少选择一条数据",2000)	
			}	
		}
		return false;
	})
	/*$(".oex").click(function(){
		if(lelist.is(":visible")){
			display("hide",lelist,$(this))
		}else{
			if($(".datagrid-row-checked").length>0){
				display("show",lelist,$(this))
			}else{
				main.warningHide("handleDefault","至少选择一条数据",2000)	
			}
		}
		return false
	})*/
	lelist.find("dd").click(function(){
		main.ajax("index.html","post",{},function(){
			
			window.location.reload()
		})
		display("hide",lelist,$(".oex"))	
	})
	
	/*$(".ck").click(function(){
		if(lalist.is(":visible")){
			display("hide",lalist,$(this))	
		}else{
			if($(".datagrid-row-checked").length>0){
				display("show",lalist,$(this))
			}else{
				main.warningHide("handleDefault","至少选择一条数据",2000)	
			}
		}
		return false
	})*/
	var flag=true
	lalist.find("dd").click(function(){
		var icon=$(this).children("i")
		if(flag&&$(".handleWarning").is(":hidden")){
			flag=false
			if(icon.hasClass("checked")){
				main.ajax("index.html","post",{a:1},function(){
					icon.removeClass("checked");flag=true
				})
				//callback  //icon.removeClass("checked");flag=true	
			}else{
				main.ajax("index.html","post",{a:1},function(){
					icon.addClass("checked");flag=true
				})
			}
		}
	})
	$(".mainCtrl li").has("dl").mouseleave(function(){
		display("hide",$(this).children(":not(.ex)"),$(".ex"))		
	})
	lalist.find("a").click(function(){
		dlog.showIframe({title:"添加标签",url:"newLabelBox.html",width:450})	
	})
})