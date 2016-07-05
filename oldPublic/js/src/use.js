seajs.use(['jquery', 'gallery/js/src/dialog-plus.js', 'gallery/js/src/my.js', 'gallery/js/src/ms.js'], function ($, dialog, my, ms) {
	$(function() {
		my.resizeTable();
		$('.chilun').unbind().bind('click', function() {
          
           //ajax


			var d = dialog({
			    title: '配置列表项',
			    content:
			      '<form id="chilun_form" action="/code/Modules/Desktop/Themes/js/src/test.php" method="post">'+
			      '<ul id="sortable">'+
				  '<li>Item 1<input type="hidden"  name="name"/></li>'+
				  '<li>Item 2<input type="hidden"  name="email"/></li>'+
				  '<li>Item 3</li>'+
				  '<li>Item 4</li>'+
				  '<li>Item 5</li>'+
				'</ul></form>',
			    okValue: '确定',
			    ok: function () {
			    	//必须选一项
			    	$("#chilun_form").submit();
			       /* $.post('./test.php', function() {
			        	alert('sf');
			        });*/
			    }
			});
			$("#sortable").sortable({
				axis: "y"
			});
			d.showModal();
		});

	});
});