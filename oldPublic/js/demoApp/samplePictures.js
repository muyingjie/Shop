/**
 * Created by lenovo on 2016/5/9.
 */
define(function (require,exports,module) {
    
        var data = {
            img_url:[
                "../images/lookHead.png",
                "../images/default_image.jpg",
                "../images/goods.jpg"
            ]
        }
        for(var i=0;i<data.img_url.length;i++){
            $(".goodsImgList").append('<div class="addGoodsImg"><img src="'+data.img_url[i]+'" /><i class="deleteIcon"></i></div>')
        }
        $(".goodsImgList").on("click",".deleteIcon", function () {
            var _this = $(this);
            _this.parent().remove()
        })
})