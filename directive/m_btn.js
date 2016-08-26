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
        template:"<a href='javascript:;' class='bddddddd fl' style='height: 30px; text-align: center; line-height: 30px; padding: 0 18px; background: #ededed; border-width: 1px; border-style: solid; border-radius: 2px;'>内容</a>",
        scope:{
            h:"=",
            p:"="
        },
        replace:false,
        link:function($scope,element,attrs,ngModelController){

        }
    };
});