define(function (require, exports, moudles) {
    ;
    require("../src/jquery.ResizableColumns.js")($);
	require("../src/jqueryui.js")($);

    var resizeTable = function() {
    	$(document).ready(function () {
	        $("#data_table").resizableColumns({
		        store: store
		      });
	    });
    };

    exports.resizeTable  =  resizeTable;
});