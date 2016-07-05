shop.service("MainMenuService", [function () {
    var menu = [{
        name: "订单管理",
        items: [
            {
                name: "订单列表",
                hash: "orderList"
            }, {
                name: "发货单",
                hash: "deliveryGoodsOrder"
            }, {
                name: "售后单",
                hash: "afterSalesOrder"
            }, {
                name: "退货单",
                hash: "cancelGoodsOrder"
            }
        ]
    }, {
        name: "商品管理",
        items: [
            {
                name: "商品列表",
                hash: "goodsList"
            },
            {
                name: "商品分类",
                hash: "goodsCategory"
            },
            {
                name: "商品类型",
                hash: "goodsType"
            },
            {
                name: "商品标签",
                hash: "goodsLabel"
            },
            {
                name: "商品品牌",
                hash: "goodsBrand"
            },
            {
                name: "商品评价",
                hash: "goodsAssess"
            },
            {
                name: "商品咨讯",
                hash: "goodsNews"
            }
        ]
    }, {
        name: "会员管理",
        items: [
            {
                name: "会员列表",
                hash: "memberList"
            },
            {
                name: "会员等级",
                hash: "memberGrade"
            },
            {
                name: "会员标签",
                hash: "memberLabel"
            }
        ]
    }];
    return {
        menu: menu
    };
}]);