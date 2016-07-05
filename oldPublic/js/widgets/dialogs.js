define(function(require,exports){
	//
	return{
		showAlert:function(obj){
			var defaults={title:"标题",width:400,content:"信息内容",okValue:"确定",ok:function(){}}
			var opt=$.extend({},defaults,obj)
			top.dialog(opt).showModal();
			return false;
		},
		showConfirm:function(obj){
			var defaults={title:"标题",width:400,content:"信息内容",okValue:"确定",ok:function(){},cancelValue:"取消",cancel:function(){}}
			var opt=$.extend({},defaults,obj)
			top.dialog(opt).showModal();
			return false;
		},
		showIframe:function(obj){
			top.dialog({
				title:obj.title,
				width:obj.width,
				url:obj.url,
				data:obj.data,
				onclose:function(){
					if(this.returnValue){
						//console.log(this.returnValue)
						obj.callback(this.returnValue)
					}
					this.focus()
				}
			}).showModal();
			return false;
		},
		initFrame:function(callback){
			var dialog=top.dialog.get(window)
			var data=dialog.data
			callback(data)
			dialog.reset();	
		},
		closeDialog:function(data){
			var dialog=top.dialog.get(window)
			dialog.close(data).remove()
		}
	}
})