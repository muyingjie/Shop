//加载城市
define(function(require,exports) {
    //
    function getCity(areaType, parentId, selectId, value) {
        if (parentId == '' || parentId == 0 || areaType == '') {
            return false;
        }
        $.post('/index.php/Member/Member/getArea', {areaType: areaType, parentId: parentId},
            function (data) {
                if (data != '-1') {
                    var area = "<option value=''>请选择</option>";
                    for (var i in data) {
                        var s = '';
                        if (i == value) {
                            s = " selected='selected'";
                        }
                        area += "<option value='" + i + "'" + s + ">" + data[i] + "</option>";
                    }
                    $('#' + selectId).html(area);
                }
            }, 'json'
        );
    }
    exports.getCity = getCity;
})