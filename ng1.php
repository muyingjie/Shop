<!doctype html>
<html ng-app="shop">
<head>
    <meta charset="utf-8">
    <title>ngShop</title>
    <link rel="stylesheet" href="css/public.css" />
    <link rel="stylesheet" href="css/index.css" />
    <style type="text/css">
        .bddddddd{ border-color: #dddddd;}

        .default-tip-color{ color: #a9a9a9;}

        .w160{ width: 160px;}

        .ft12{ font-size: 12px;}
        .ft14{ font-size: 14px;}
        .ft16{ font-size: 16px;}
        .ft20{ font-size: 20px;}

        .top-items{ width: 100%; border-bottom-width: 1px; border-bottom-style: solid;}
        .top-items .logo{ width: 186px; text-align: center;border-right-width: 1px; border-right-style: solid; padding: 12px 0;}

        .speci-content .nav{ width: 186px; border-right-width: 1px; border-right-style: solid;}
        .speci-content .nav .item{ overflow: hidden;}
        .speci-content .nav .item40h{ height: 40px;}
        .speci-content .nav .item .nav-title,.speci-content .nav .item .nav-item{ height: 40px; line-height: 40px;}
        .speci-content .nav .item .nav-title a,.speci-content .nav .item .nav-item a{ display: block;}
        .speci-content .nav .item .nav-title a{ padding-left: 20px; }
        .speci-content .nav .item .nav-item a{ padding-left: 40px;}
        .speci-content .nav .item .nav-item a.highlight{ background: #eee;}

        .speci-content .contentWrap{ position: relative; margin-left: 187px;}
        .speci-content .contentWrap .copyRight{ width: 100%; height: 50px; line-height: 50px; position: absolute; bottom: 0; border-top-width: 1px; border-top-style: solid;}
        .speci-content .contentWrap .topMenu{ height: 60px;}
        .speci-content .contentWrap .title{ padding-left: 30px; line-height: 60px; font-weight: normal;}
        .speci-content .contentWrap .content-padding{ padding: 10px;}
        .speci-content .contentWrap .content{ margin-top: 0; border-width: 1px; border-style: solid;}
    </style>
</head>

<body>
    <div class="ngshop">
        <div class="top-items bddddddd clear">
            <a href="javascript:;" class="logo fl bddddddd"><img src="images/logo.png" alt=""></a>
            <div class="menu fl">
                <div class="hide-logo"></div>
                <ul class="operate-list"></ul>
            </div>
        </div>
        <div class="speci-content clear" ng-controller="MainController">
            <div class="nav fl bddddddd">
                <dl ng-class="{item:true,item40h:!firstLevelMenu.isShow}" ng-repeat="firstLevelMenu in menu track by $index">
                    <dt class="nav-title ft16"><a href="javascript:;" ng-click="navShow($index)">{{firstLevelMenu.name}}</a></dt>
                    <!--<dd ng-class="{nav-item:true, ft14:true, highlight:secondLevelMenu.highlight}" ng-repeat="secondLevelMenu in firstLevelMenu.items track by $index">-->
                        <!--<a ng-href="#/{{secondLevelMenu.hash}}" ng-click="highlight($index,$index)">{{secondLevelMenu.name}}</a>-->
                    <!--</dd>-->
                    <dd class="nav-item ft14" ng-repeat="secondLevelMenu in firstLevelMenu.items track by $index">
                        <a ng-href="#/{{secondLevelMenu.hash}}" ng-click="highlight($parent.$index,$index)" class="{{secondLevelMenu.highlight ? 'highlight' : ''}}">{{secondLevelMenu.name}}</a>
                    </dd>
                </dl>
            </div>
            <div class="contentWrap clear">
                <div class="topMenu" ng-if="curState.isShow">
                    <h2 class="title ft20">{{curState.title}}<span class="subTitle ft12">-{{curState.subTitle}}</span></h2>
                </div>
                <div class="content-padding">
                    <div class="content bddddddd" ui-view></div>
                </div>
                <div class="copyRight bddddddd">Company 2015-2020 1.0</div>
            </div>
        </div>
    </div>
    <script src="libs/jquery.js"></script>
    <script type="text/javascript">
        $(function(){
            autoHeight();
            window.onresize=autoHeight;

            var eachNavH=40;

//            var $lastItem;
//            $(".speci-content .nav .item .nav-title").click(function(){
//                $lastItem && $lastItem.animate({"height":eachNavH});
//
//                var $this=$(this);
//                var $item;
//                if($this!==$lastItem){
//                    $item=$this.parents(".item");
//                    $item.animate({"height":$item.children().length*eachNavH});
//                    $lastItem=$item;
//                }
//            });

            function autoHeight(){
//                var ch=$(document).height();
                var ch=$(window).height();
                var navH=ch-54;
                $(".speci-content").height(navH);
                $(".speci-content .nav").height("100%");
                $(".speci-content .contentWrap").height("100%");

                $(".speci-content .content").height(navH-132);
            }
        });
    </script>
    <script src="libs/angular.js"></script>
    <script src="libs/angular-animate.js"></script>
    <script src="libs/angular-route.js"></script>
    <script src="libs/angular-ui-router.js"></script>
    <script src="libs/bootstrap.js"></script>
    <script src="libs/ui-bootstrap-tpl.js"></script>
    <script>
        var shop = angular.module("shop", ["ngAnimate", "ui.router", "ui.bootstrap"]);
        //shop.config(["$routeProvider", function ($routeProvider) {
        //    $routeProvider.when("/orderList", {
        //        templateUrl: "template/order/orderList.html"
        //    }).when("/deleveryGoodsOrder", {
        //        templateUrl: "template/order/deleveryGoodsOrder.html"
        //    });
        //}]);
        shop.config(["$stateProvider", "$urlRouterProvider", function ( $stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/index");
            //订单
            $stateProvider.state("index",{
                url:"/index",
                templateUrl:"template/index.html",
                data:{
                    title:"",
                    subTitle:""
                }
            });

            $stateProvider.state("orderList", {
                url: "/orderList",
                templateUrl: "template/order/orderList.html",
                data:{
                    title:"订单管理",
                    subTitle:"订单列表"
                }
            }).state("deliveryGoodsOrder", {
                url: "/deliveryGoodsOrder",
                templateUrl: "template/order/deliveryGoodsOrder.html",
                data:{
                    title:"订单管理",
                    subTitle:"发货单"
                }
            });

            //商品
            $stateProvider.state("goodsList", {
                url: "/goodsList",
                templateUrl: "template/goods/goodsList.html",
                data:{
                    title:"商品管理",
                    subTitle:"商品列表"
                }
            }).state("goodsCategory", {
                url: "/goodsCategory",
                templateUrl: "template/goods/goodsCategory.html",
                data:{
                    title:"商品管理",
                    subTitle:"分类列表"
                }
            }).state("goodsType",{
                url:"/goodsType",
                templateUrl: "template/goods/goodsType.html",
                data:{
                    title:"商品管理",
                    subTitle:"类型列表"
                }
            }).state("addGoodsType",{
                url:"/addGoodsType",
                templateUrl:"template/goods/addGoodsType.html",
                data:{
                    title:"商品管理",
                    subTitle:"添加类型"
                }
            });
        }]);
        shop.controller("MainController", ["$scope", "MainMenuService", "$state", function ($scope, MainMenuService, $state) {
            $scope.menu = MainMenuService.menu;

            setAllMenuHide();
            setAllNavNonHightlight();

            var isShowMenu=$state.current.name!="index";

            //右侧内容区域标题和副标题
            $scope.curState={
                isShow:isShowMenu,
                title:$scope.menu[0].name,
                subTitle:$scope.menu[0].items[0].name
            };

            $scope.navShow = function (i) {
                setAllMenuHide();
                $scope.menu[i].isShow = true;
            };

            $scope.highlight = function(i1,i2){
                $scope.curState.isShow=true;
                setAllNavNonHightlight();
                //当前行显示高亮
                $scope.menu[i1].items[i2].highlight=true;
            };

            $scope.$on("$stateChangeStart",function(event,toState,toParams,fromState,fromParams){
                //更换右侧标题和副标题
                $scope.curState.title=toState.data.title;
                $scope.curState.subTitle=toState.data.subTitle;
            });

            function setAllMenuHide() {
                angular.forEach($scope.menu, function (d, i) {
                    d.isShow = false;
                });
            }
            function setAllNavNonHightlight(){
                angular.forEach($scope.menu,function(d,i){
                    angular.forEach(d.items,function(d3,i3){
                        d.items[i3].highlight=false;
                    });
                });
            }
        }]);
    </script>
    <?php
        $dirs=array("./controller", "./directive", "./service");
        foreach($dirs as $dir){
            $cur_dir=dir($dir);
            while(($file=$cur_dir->read()) !== false){
                if($file != "." && $file != ".."){
                    echo "<script src='".$dir."/".$file."'></script>";
                }
            }
        }
    ?>
</body>
</html>
