/*有bug      create  liqiang@300.cn
define(function(require, exports, module) {
	var param={};
	exports.getParam=function(){return param};
	exports.setParam=function(p){param=p};
	var paramList = {};
	exports.setParamByKey=function(aKey,param){paramList.aKey = param;};
	exports.getParamByKey=function(aKey){return paramList.aKey;}
});
*/


define(function(require, exports, module) {
	var param={};
	exports.getParam=function(){return param};
	exports.setParam=function(p){param=p};
	var paramList = {};
	exports.setParamByKey=function(aKey,param){paramList[aKey] = param;};
	exports.getParamByKey=function(aKey){return paramList[aKey];}
});

