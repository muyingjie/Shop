define(function(require){
	//var $=require("jquery");
	var dlog = require('../widgets/dialogs');

	$(".midify-info").click(function(){
		//dlog.showConfirm({title:"提示",width:500,content:"这是confirm内容",ok:function(){}})
		dlog.showIframe({title:"修改",width:500,url:"/index.php/DeskAuth/Users/Getedis?age=age",callback:function(ab){main.warningHide("handleDefault", "操作失败！", 2000)}})
	})
	var frame={//功能方法
		sideBarToggle:function(num,delay){//左侧菜单展开收缩
			var sideBar=$(".sideBar"),_left=sideBar.position().left,other=$(".container,.copyright");
			if(!sideBar.is(":animated")){
				if(_left==0){
					sideBar.animate({left:-num+"px"},delay);
					other.animate({marginLeft:0},delay);	
				}else{
					sideBar.animate({left:0},delay);
					other.animate({marginLeft:num+"px"},delay);	
				}	
			}
		},
		menuToggle:function(obj){//展开或收起二级菜单
			
			obj.toggleClass("dtcurr").siblings().slideToggle();
			obj.parent().siblings().find("dd").slideUp().end().find("dt").removeClass("dtcurr")
			
		},
		menuCurrent:function(obj){//选中当前二级菜单
			//$("title",document).text(function(){
			//	return obj.text();
		    //})
		    document.title = obj.text();
			$(".sideList dd").removeClass("ddcurr")
			obj.addClass("ddcurr");
		},
		frameHeight:function(obj){//获取右侧滚动区域高度
			obj.height(function(){
				return $(window).height()-126
			})	
		}
	}
	$(".sideBarBtn").click(function(){
		frame.sideBarToggle(187,300);
	})
	$(".sideList").on("click","dt",function(){
		frame.menuToggle($(this))	
	})
	$(".sideList").on("click","dd",function(){
		frame.menuCurrent($(this))	
	})
	frame.frameHeight($(".mainFrame"));

	//右侧IFRAME内部提示
	top.mainFrame = window.frames['main'];
	top.frameWarningHide = function(classname, txt, delay){
		if(typeof (top.mainFrame.waring) === 'object'){
			if(typeof(top.mainFrame .waring.warningHide) == 'function'){
				top.frames['main'].waring.warningHide(classname, txt, delay);
			}else{
				console.log("warningHide不是个function");
			}
		}else{
			console.log("waring不是个object");
		}

	}





	$(".user").hover(function(){
		$(".index-user-message").show();
		$(".user").addClass("user1")
	},function(){
		$(".index-user-message").hide();
		$(".user").removeClass("user1");
	});
	$(".index-user-message").hover(function(){
		$(".index-user-message").show();
		$(".user").addClass("user1")
	},function(){
		$(".index-user-message").hide();
		$(".user").removeClass("user1");
	});
})