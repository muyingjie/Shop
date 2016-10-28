/**
 * Created with JetBrains WebStorm.
 * User: muyingjie
 * Date: 16-8-29
 * Time: 下午2:52
 * To change this template use File | Settings | File Templates.
 */
shop.controller("goodsTypeListController",["$scope","$state",function($scope,$state){
    $scope.operations=[{
        cont:"新增",
        fnOper:function(){
            $state.go("addGoodsType");
        }
    },{
        cont:"删除",
        fnOper:function(){}
    }];
}]);