(function(){
	/*
	 * 智能机浏览器版本信息:
	 *
	 */
	var browser = {
		versions: function() {
			var u = navigator.userAgent, app = navigator.appVersion;
			return {
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1
			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	}
	var ios_c=browser.versions.iPhone;

	//注册登录页面
	var $user=$(".user"),     //首页登陆按钮
		$body=$("body"),      //body
		$user_login=$(".user_login"),   //登录页面  注册按钮
		$us_ad=$(".us_ad"),				//免费试用==注册按钮
		$login_user=$("#login_user"),    //整个登录注册大盒子
		$login=$(".login"),             //登录页面
		$signUp=$(".signUp"),            //注册页面
		$user_reg=$(".user_reg"),
		$user_admin=$(".user_admin");     //注册页面下面的登陆按钮

	$user.on("click",function(){     //进入登录页面
		$body.addClass("modal-open");
		if(ios_c){
			$body.css("padding-right","0px");
		}else{
			$body.css("padding-right","17px");
		}
		$login_user.show();
		$login.show();
	})
	$user_login.on("click",function(){
		show_user();
	});
	$us_ad.on("click",function(){
		show_user();
	});
	$user_reg.on("click",function(){
		show_user();
	});
	function show_user(){         //进入注册页面
		if(!$body.hasClass("modal-open")){
			$body.addClass("modal-open");
			if(ios_c){
				$body.css("padding-right","0px");
			}else{
				$body.css("padding-right","17px");
			}
		}
		$login_user.show();
		$login.hide();
		$signUp.show();

	}
	$user_admin.on("click",function(){
		$login.show();
		$signUp.hide();
	})
	/*$(".denglu").on("click",function(){
	 $body.removeClass("modal-open");
	 $login_user.hide();
	 $login.hide();
	 $signUp.hide();
	 })*/
	//关闭按钮
	$(".login_close").on("click",function(){
		$body.removeClass("modal-open");
		$body.css("padding-right","0px");
		$login_user.hide();
		$login.hide();
		$signUp.hide();
	})
    function login_close(){
		$body.removeClass("modal-open");
		$body.css("padding-right","0px");
		$login_user.hide();
		$login.hide();
		$signUp.hide();
	}
})(jQuery)