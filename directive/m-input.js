/**
 * Created with JetBrains WebStorm.
 * User: muyingjie
 * Date: 16-8-31
 * Time: 下午6:38
 * To change this template use File | Settings | File Templates.
 */
shop.directive("mInput",function(){
    return {
        restrict:"E",
        templateUrl:"/ng/template/goods/mInput.html",
        scope:{

        },
        replace:false,
        link:function($scope,element,attrs,ngModelController){
            $scope.data={
                h:$scope.h ? $scope.h : 30,
                p:$scope.p ? $scope.p : 18,
                c:$scope.c ? $scope.c : "默认内容"
            };
        }
    };
});