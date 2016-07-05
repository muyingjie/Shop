define(function(require, exports, module) {
	//var $=require('jquery');
	require('../widgets/select');
	function pageCalculator(pageSize,total){
		var that=this,
			pi=pageInfo={
				total:total,//数据总数
				currentPage:1,//当前页数
				totalPage:1,//总页数
				pageSize:pageSize,//一页数据条数
				recordForm:1,//当前页起始数据idx
				recordTo:pageSize,//当前页结束数据idx
				tag:"all"//标签
			};
		var onChangeCAL=$.Callbacks();
		var onChangeUpData = $.Callbacks();
		function _countPage(isUpData){//3计算分页显示
			var oPi=$.extend({},pi);
			pi.totalPage=Math.ceil(pi.total/pi.pageSize);
			if(pi.currentPage>pi.totalPage)pi.currentPage=pi.totalPage;
			pi.recordForm=(pi.currentPage-1)*pi.pageSize+1;
			var tmpTo=pi.recordForm+pageSize-1;
			pi.recordTo=tmpTo>pi.total?pi.total:tmpTo;
			if(isUpData == "noUpData") {
				onChangeUpData.fire(pi);
			}else{
				if(!_objEquals(oPi,pi))
					onChangeCAL.fire(pi);
			}

		}
		function _objEquals(obj1,obj2){
			var eq=true;
			$.each(Object.keys(obj1),function(i,v){
				if(obj1[v]!=obj2[v]){
					eq=false;
					return false;
				}
			});
			return eq;
		}
		_countPage();
		this.getPageInfo=function(){
			return pi;
		}
		function _toPage(pageNum){
			if(pageNum<=pi.totalPage){
				pi.currentPage=pageNum;
				_countPage();
			}
		}
		this.toPage=_toPage;
		this.next=function(){
			pi.currentPage+=1;//2 计算点击下一页后的页数
			_countPage();
		};
		this.setTag = function (oTag) {
			pi.tag = oTag;
			if(pi.currentPage == 1){
				onChangeCAL.fire(pi);
			}else{
				pi.currentPage = 1;
				_countPage();
			};
		}
		this.prev=function(){
			pi.currentPage-=1;
			_countPage();
		};
		this.first=function(){
			pi.currentPage=1;
			_countPage();
		};
		this.last=function(){
			pi.currentPage=pi.totalPage;
			_countPage();
		};
		this.setTotal=function(total){
			pi.total=total;
			_countPage("noUpData");
		};
		this.setPageSize=function(pageSize){
			pi.pageSize=pageSize;
			_countPage();
		};
		this.onChange=function(fn){
			onChangeCAL.add(fn);
		};
		this.onlyUpData = function(fn){
			onChangeUpData.add(fn);
		}
	}
	var createPagination=function(pageSize,total){
		return new pageCalculator(pageSize,total);
	}
	function _updataInterface(pageDom,pageInfo){
		pageDom.find('.pageCount').text(pageInfo.total);
		if(pageInfo.currentPage==1){//首页 上一页禁用
			pageDom.find('[data-pagebtn="first"]').addClass('dis');
			pageDom.find('[data-pagebtn="prev"]').addClass('dis');
		}else{
			pageDom.find('[data-pagebtn="first"]').removeClass('dis');
			pageDom.find('[data-pagebtn="prev"]').removeClass('dis');
		}
		if(pageInfo.currentPage==pageInfo.totalPage){//尾页 下一页禁用
			pageDom.find('[data-pagebtn="last"]').addClass('dis');
			pageDom.find('[data-pagebtn="next"]').addClass('dis');
		}else{
			pageDom.find('[data-pagebtn="last"]').removeClass('dis');
			pageDom.find('[data-pagebtn="next"]').removeClass('dis');
		}
		var sltVal=[];
		for(var i=1;i<=pageInfo.totalPage;i++){
			sltVal.push({text:'第'+i+'页',value:i});
		}
		var pageList=pageDom.find('.pageList');
		if(pageList.children("input").val() != pageInfo.currentPage){
			pageList.select('setValue',pageInfo.currentPage);
		}
		pageList.select({onlyShow:false,vals:sltVal});
		if(pageList.select('getValue')!=pageInfo.currentPage||pageList.children("input").val() != pageInfo.currentPage){
			pageList.select('setValue',pageInfo.currentPage);
		}

	}
	function _urlTmplReplace(urlTmpl,data){
		urlTmpl=urlTmpl.replace(/\{pageSize\}/,data.pageSize);
		urlTmpl=urlTmpl.replace(/\{pageNum\}/,data.currentPage);
		urlTmpl=urlTmpl.replace(/\{tag\}/,data.tag);
		return urlTmpl;
	}
	function _dataUpdate(opt,pageInfo){
		if(!opt.urlTmpl){
			if(opt.onPageChange)opt.onPageChange(pageInfo);
		}else{
			var url=_urlTmplReplace(opt.urlTmpl,pageInfo);
			$.when($.get(url))
			 .then(function(data){
					if(opt.onPageChange)opt.onPageChange(data);
			});
		}
	}
	function pager(options){
			var opt=options;
			var pageDom=$('#'+opt.domId);
			var pageCalc=new pageCalculator(opt.pageSize,opt.total);
			var pageInfo=pageCalc.getPageInfo();
			_updataInterface(pageDom,pageInfo);//更新翻页界面
			_dataUpdate(opt,pageInfo);//更新数据
			//***初始化
			pageDom.find('[data-pagebtn]').on('click',function(){
				var btn=$(this);
				var type=btn.data('pagebtn');
				if(!btn.hasClass('dis')){
					pageCalc[type]();//1 点击下一页
				}
			});

		pageDom.siblings(".local-img").find(".local-img-nav>span").on("click",function(){

			$(".local-img-nav>span").removeClass("local-img-nav_col");
			$(this).addClass("local-img-nav_col");
			var tag = $(".local-img-nav>span[class=local-img-nav_col]").attr("id");
			pageCalc.setTag(tag);
		})
			pageDom.find('.pagePer').select({onlyShow:false}).on('sltChange',function(e,val){
				pageCalc.setPageSize(val.value/1);
			});
			pageDom.find('.pageList').on('sltChange',function(e,val){
				pageCalc.toPage(val.value/1);
			});
			pageCalc.onChange(function(pageInfo){
				_updataInterface(pageDom,pageInfo);
				_dataUpdate(opt,pageInfo);
			});
			pageCalc.onlyUpData(function(pageInfo){
				_updataInterface(pageDom,pageInfo);
			});
			this.setTotal=function(total){
				pageCalc.setTotal(total);
			}
			this.setPageSize=function(pageSize){
				pageCalc.setPageSize(pageSize)
			}
			this.toPage=function(pageNum){
				pageCalc.toPage(pageNum);
			}
			//***
		}
	module.exports={
		init:function(opt){
			//console.log(opt)
			return new pager(opt);
		}
	}
});