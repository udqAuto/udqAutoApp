﻿angular.module('udqApp')
    .controller('customerOrderPayCtrl', ['$scope', '$stateParams', '$state', 'customerOrderMakeSvr', 'customerOrderSvr', function ($scope, $stateParams, $state, customerOrderMakeSvr, customerOrderSvr) {

        var orderParam = angular.fromJson($stateParams.order);/*传递过来的订单信息*/
        var state = $stateParams.state;/*前一个页面的state*/
        $scope.order = orderParam;
        if ($scope.order.channel == undefined) {
            $scope.order.channel = 'alipay';/*设置支付方式初始值：支付宝*/
        }
        /*提交订单*/
        $scope.commitOrder = function () {
            customerOrderMakeSvr.commitOrder($scope.order).then(
                 function (data) {
                     //根据data内的数据判断时候成功
                     if (data.isSuccess) {
                         console.log('提交成功');
                         pingpp.createPayment(data.data.charge,
                             function (result) {
                                 /*支付成功*/
                                 customerOrderSvr.setSelectedOrder($scope.order);
                                 $state.go('customerOrderMgr');
                             },
                         function (result) {
                             /*fail和cancel*/
                             if (result == 'fail') {
                                 alert("订单支付失败");
                             } else if (result == 'cancel') {
                                 console.log('取消支付');
                             }
                         });
                     }
                 },
                 function (data) {
                     console.log(data);
                     return true;
                 });

        }
        /*回跳到前一个页面*/
        $scope.goBack = function () {
            $state.go(state, { 'typeSelect': 'payOrderReturn' });
        }

    }])