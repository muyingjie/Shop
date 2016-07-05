define(function(require, exports, module) {
	var $=require('jquery');
	var pageController=require('../widgets/pagination');
	var page=pageController.init({
		domId:'pagination1',
		urlTmpl:'testData.json?pageSize={pageSize}&page={pageNum}',
		pageSize:20,
		total:108,
		onPageChange:function(data){
			//翻页时页面渲染
			//console.table(JSON.parse(data));
			 
		}
	});
	page.setTotal(256);
	//console.log(page.getPageInfo());
});