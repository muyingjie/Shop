/**
 * Created by lenovo on 2016/5/18.
 */
define(function (require,exports,module) {
    var ,dlog=require("../widgets/dialogs");
    require('../widgets/dragg');
    $(".boxList-move").drag();
	$(".boxSave").click(function(){
		var dialog=top.dialog.get(window)
		dialog.close()
	})
})
