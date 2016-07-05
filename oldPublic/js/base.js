(function(){
  var isDemo=/\/demo\//.test(window.location.href);
  var base=isDemo?"../js/":'/Public/js/';//示例使用相对路径
  var base = 	'/Public/js/';
  seajs.config({
    base: base,
    /*paths:{//路径别名
     'widget':'widgets'
    },*/
    alias: {//别名
      "jquery": "libs/jquery/jquery-1.9.1.min.js",
      "jqueryUI":"libs/plugs/jquery-ui.js",
      "colpick":"libs/plugs/jquery.colpick.js",
      'easyui':'libs/plugs/jquery.easyui.custom.js',
      'jscal2':'libs/plugs/calendar/jscal2.js',
      'swfUpload':'libs/plugs/swfUpload/swfupload.js',
  	  'zcore':'libs/plugs/ztree/jquery.ztree.core.js',
  	  'zexcheck':'libs/plugs/ztree/jquery.ztree.excheck.js',
  	  'treetable':'libs/plugs/jquery.treetable.js',
      'validate':'libs/plugs/jquery-html5Validate.js',
      'PageParam':'widgets/pageParameter.js',
      'jqueryForm':"libs/plugs/jqueryForm.js"
    }
  });
})();


 

/**
 * 应用模块管理
 * 
 */


var appManager=function(){
	var isDemo=/\/demo\//.test(window.location.href);
	var desktopDemo = /\/deskDemo\//.test(window.location.href);
	return {
		use:function(appName,param){
			var basePath="/Public/js/app/";
			if(isDemo&&!desktopDemo)basePath='../js/demoApp/';

			seajs.use(['PageParam'],function(a){
				if(Object.prototype.toString.call(appName)=== "[object Array]"){
					for(var i=0;i<appName.length;i++){
						if(param){
							a.setParamByKey(basePath+appName[i],param[i]);
						}
						//TODO 产品模式 开发模式切换
						appName[i]=basePath+appName[i];

					}
					seajs.use(appName);

				}else{
					if(param){
						a.setParam(param);
					}
					//TODO 产品模式 开发模式切换
					//alert(basePath);
					seajs.use(basePath+appName);
				}
			});
		}
	};
}();

//var appManager=function(){
//	var isDemo=/\/demo\//.test(window.location.href);
//	var basePath=isDemo?"../js/demoApp/":"/Public/js/app/";
//	return{
//		use:function(a,b){
//			var arr=[]
//			 if(Object.prototype.toString.call(a)=== "[object Array]"){
//				for(var i=0;i<a.length;i++){
//					arr.push(basePath+a[i])
//				}
//			}else{
//				arr.push(basePath+a)
//			}
//			return seajs.use(arr,b)
//		}
//	}
//}();