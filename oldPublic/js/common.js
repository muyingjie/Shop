define(function(require){
	//var $=require("jquery")
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
			obj.toggleClass("dtcurr").siblings("dd").slideToggle();	
		},
		menuCurrent:function(obj){//选中当前二级菜单
			$("title",document).text(function(){
				return obj.text();
			})
			$(".sideList dd").removeClass("ddcurr")
			obj.addClass("ddcurr");
		}/*,
		frameHeight:function(obj){//获取右侧滚动区域高度
			obj.load(function(){
				$(this).height(function(){
					return $(this).contents().find("body").height();	
				})	
			})	
		}*/
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
	//frame.frameHeight($(".mainFrame"));
	
})