define(function(require, exports, module) {
	var $=require('jquery');
	require('../widgets/select');
	var area=require('../widgets/area');  
    var $province =$("#province");
    var $city =$("#city");
    var $country =$("#country");
	var Calendar=require('jscal2');
	   Calendar.setup({
        inputField : "birthday",
        trigger    : "birthday",
        onSelect   : function() { this.hide() },
    });

	var provValue,cityValue;
    $province.select({onlyShow: false, vals: area.getProvinceData()}).on('sltChange',function(e,newProvVal){
        $city.find('span').text('请选择');
        $country.find('span').text('请选择');
        provValue=newProvVal.value;
        if (newProvVal.value&&newProvVal.value.indexOf("请选择")==-1){
            $city.select({onlyShow: false, vals: area.getCityData(provValue)}).on('sltChange',function(e,newCityVal){
                $country.find('span').text('请选择');
                cityValue =newCityVal.value;
                if (newCityVal.value&&newCityVal.value.indexOf("请选择")==-1) {
                     $country.select({onlyShow: false, vals: area.getCountryData(provValue,cityValue)});
                }

               
            });   
        }
        
    });

    $('.select').select({onlyShow: false});

	var showMsg = require('../widgets/validate').showMsg;

    $(".select").on("click", function(e) {
        $.html5Validate.isAllpass($(this));
    });

    $('form').on('blur', 'input', showMsg);

	$('form').html5Validate(function() {
		//this.submit();
	}, {validate: function() {
		/*if($('#province').find('>span').text() == '请选择') {
			$("#province").testRemind("请选择");
            return false; 
		}
		if($('#city').find('>span').text() == '请选择') {
			$("#city").testRemind("请选择");
            return false; 
		}
		if($('#country').find('>span').text() == '请选择') {
			$("#country").testRemind("请选择");
            return false; 
		}
		if($('#addmember-select').find('>span').text() == '请选择') {
			$("#addmember-select").testRemind("请选择");
            return false; 
		}
		return true;*/
	}});

	$('.add-member-save').click(function() {
		var result = $.html5Validate.isAllpass($('form'));
        if($('form').find('.error')[0]) {
           showMsg.call($('form').find('.error')[0]); 
        }
		/*if($('#province').find('>span').text() == '请选择') {
			$("#province").testRemind("请选择");
            return false; 
		}
		if($('#city').find('>span').text() == '请选择') {
			$("#city").testRemind("请选择");
            return false; 
		}
		if($('#country').find('>span').text() == '请选择') {
			$("#country").testRemind("请选择");
            return false; 
		}
		if($('#addmember-select').find('>span').text() == '请选择') {
			$("#addmember-select").testRemind("请选择");
            return false; 
		}*/

		if(!result) {
        
		}
	});
});