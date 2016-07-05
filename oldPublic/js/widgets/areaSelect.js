define(function (require) {

	
	(function() {

		$.fn.extend({
			"tree": function(opction) {
				for(var i=0;i<opction.city.length;i++){
					$(".tree").append(
						'<div class="one">'
							+'<i name="two"type="2" id="'+opction.city[i].id+'"></i><input level="one" type="checkbox" name="'+opction.city[i].name+'" value="'+opction.city[i].id+'">'+opction.city[i].name
						+'</div>'
					)
				}

				$(".all").click(function () {
					var status = $(this).is(':checked') ? true : false;
					$("input[type=checkbox]").prop('checked', status);
				});
				$(".tree").on("click","[level=one]",function() {
					var $parent = $(this).parents('.one');
					var status = $(this).is(':checked') ? true : false;
					$parent.find('[level=one]').prop('checked', status);
					$parent.find('[level=two]').prop('checked', status);
					$parent.find('[level=three]').prop('checked', status);
				});
				$(".tree").on("click","[level=two]",function() {

					var $parent = $(this).parents('.two');
					var status = $(this).is(':checked') ? true : false;
					$parent.find('[level=three]').prop('checked', status);
					var isCheckOne = $(this).parents('.one').find('.two').find('input:checked').length ? true : false;
					$parent.parents('.one').find('[level=one]').prop('checked', isCheckOne);


				});
				$(".tree").on("click","[level=three]",function() {
					var $one = $(this).parents('.one');
					var $two = $(this).parents('.two');
					var isCheckOne = $one.find('[level=three]:checked').length ? true : false;
					var isCheckTwo = $two.find('[level=three]:checked').length ? true : false;
					$two.find('[level=two]').prop('checked', isCheckTwo);
					$one.find('[level=one]').prop('checked', isCheckOne);

				});
				var close = true;
				$(".tree").on("click","i",function () {
					var _this = $(this);
					if(!_this.attr("close")){
						if(close){
							$.post(opction.url,{type:$(this).attr("type"),id:$(this).attr("id")},function(data){
								var data = $.parseJSON(data);
								if(data.status){
									if(_this.attr("name") == "two"){
										var state = _this.siblings("input").is(":checked") ? "checked" : "null";
										for(var i = 0;i<data.info.length;i++){
											_this.parent("div").append(
												'<div class="two">'
												+'<i name="tree" type="3" id="'+data.info[i].id+'"></i><input level="two" '+state+' type="checkbox" name="'+data.info[i].name+'" value="'+data.info[i].id+'" />'+data.info[i].name
												+'<div class="three">'
												+'</div>'
												+'</div>'
											)
										}
									}else{
										var state = _this.siblings("input").is(":checked") ? "checked" : "null";
										for(var i = 0;i<data.info.length;i++){
											_this.siblings(".three").append(
												'<div><input level="three" '+state+' type="checkbox" name="'+data.info[i].name+'" value="'+data.info[i].id+'">'+data.info[i].name+'</div>'
											)
										}
									}

									_this.attr("close",true);
									_this.toggleClass("tree_close");
									_this.hasClass("tree_close") ? _this.parent("div").css("height","auto") : _this.parent("div").css("height","17px");
									close = true;
								}else{
									close = true;
									return false;
								}

							})
							close = false;
						}

					}else{
						$(this).toggleClass("tree_close");
						$(this).hasClass("tree_close") ? $(this).parent("div").css("height","auto") : $(this).parent("div").css("height","17px");
					}



				})
			}
		});



	})();
})



