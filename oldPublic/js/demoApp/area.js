define(function(require, exports, module) {
	var $=require('jquery');
    require('../widgets/select');
	var area=require('../widgets/area');  
    var $province =$("#province");
    var $city =$("#city");
    var $country =$("#country");

    area.getDropdownList($province,$city,$country);
    
});