/**
 * Created with JetBrains WebStorm.
 * User: muyingjie
 * Date: 16-8-26
 * Time: 下午5:50
 * To change this template use File | Settings | File Templates.
 */
shop.directive("mBtn",function(){
    return {
        restrict:"E",
        template:"<a href='javascript:;' class='bddddddd fl' style='height: {{data.h}}px; text-align: center; line-height: {{data.h}}px; padding: 0 {{data.p}}px; background: #ededed; border-width: 1px; border-style: solid; border-radius: 2px; margin-left: 10px;'>{{data.c}}</a>",
        scope:{
            h:"=",//height和line-height参数，默认为30px
            p:"=", //padding参数默认为18px,
            c:"="
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