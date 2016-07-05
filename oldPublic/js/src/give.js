define(function(require, exports, module){
	

	var give = function() {
		console.log(store.getAll());
		$.post('', store.getAll());
	};

	exports.give = give;
});