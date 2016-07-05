/**
 * Created by zhushengli@300.cn on 2016/6/17.
 */

define(function(require, exports, module) {
    //
    var dlog = require("../widgets/dialogs");
    //上传图片
    $('.file').click(function () {
        dlog.showIframe({
            title:'选择图片', width: 900,url:$(this).attr("url"), callback: function (ad) {
                $("#image_url").val(ad.image_src);
                $("#upImg").attr('src',ad.image_src);
            }
        });
    });
});