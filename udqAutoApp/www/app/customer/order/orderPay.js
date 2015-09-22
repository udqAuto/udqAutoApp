﻿angular.module('udqApp')
    .controller('customerOrderPayCtrl', ['$scope', '$ionicHistory', '$ionicPopup', '$stateParams', '$state', 'customerOrderMakeSvr', 'customerOrderSvr', 'popUpSvr', function ($scope, $ionicHistory, $ionicPopup, $stateParams, $state, customerOrderMakeSvr, customerOrderSvr, popUpSvr) {
        var orderParam = angular.fromJson($stateParams.order);/*传递过来的订单信息*/
        var state = $stateParams.state;/*前一个页面的state*/
        $scope.order = orderParam;
        if ($scope.order.channel == undefined) {
            $scope.order.channel = 'alipay';/*设置支付方式初始值：支付宝*/
        }

        $scope.payMethod = {
            alipay: {
                name: "alipay",
                text: "支付宝",
                imgUri: "image/logo/64x64.png"
            },
            wx: {
                name: "wx",
                text: "微信支付",
                imgUri: "image/logo/icon64_appwx_logo.png"
            }
        };

        /*提交订单*/
        $scope.commitOrder = function () {
            customerOrderMakeSvr.commitOrder($scope.order).then(
                 function (data) {
                     //根据data内的数据判断时候成功
                     if (data.isSuccess) {
                         pingpp.createPayment(data.data.charge,
                             function (result) {
                                 /*支付成功*/
                                 $scope.order = data.data;
                                 $scope.order.state = 1;
                                 customerOrderSvr.setSelectedOrder($scope.order);
                                 $ionicHistory.clearHistory();
                                 $state.go('customerOrderMgr');
                             },
                         function (result) {
                             /*fail和cancel*/
                             if (result == 'fail') {
                                 popUpSvr.showAlert('支付失败，请重试！');
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

        $scope.alertPopup = function () {
            $ionicPopup.alert({
                title: '错误',
                template: '支付失败，请重试！',
                okType: 'button-asertive'
            });
        }
            

    }])