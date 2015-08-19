﻿angular.module('udqApp')
    .controller('customerOrderMakeCtrl', ['$scope', '$ionicActionSheet', '$stateParams', '$state', '$ionicHistory', '$window', 'customerWashtypeSvr', 'customerOrderMakeSvr', 'customerOrderSvr', 'regionSvr', 'autoSvr', 'APP_CONFIG', function ($scope, $ionicActionSheet, $stateParams, $state, $ionicHistory, $window, customerWashtypeSvr, customerOrderMakeSvr, customerOrderSvr, regionSvr, autoSvr, APP_CONFIG) {

        /*从服务中获取选择的洗车类型、车辆以及小区*/
        var getWashTypeAndSelectAutoInfo = function () {
            $scope.types = customerOrderSvr.getTypes();
            $scope.selectedAuto.selectedAutoId = customerOrderSvr.getSelectedAutoId();
            $scope.selectedAuto.selectedRegionId = customerOrderSvr.getSelectedRegionId();
        }
        /*保存选择的洗车类型，选择的车辆以及选择的小区*/
        var saveWashTypeAndSelectAutoInfo = function () {
            customerOrderSvr.setType($scope.types);
            customerOrderSvr.setSelectedAutoId($scope.selectedAuto.selectedAutoId);
            customerOrderSvr.setSelectedRegionId($scope.selectedAuto.selectedRegionId);
        }

        $scope.selectedAuto = {};

        var typeSelect = $stateParams.typeSelect;
        switch (typeSelect) {
            case 'main':
                /*获取洗车类型，车辆信息，小区信息*/
                customerWashtypeSvr.callWashType().then(
                    function (data) {
                        $scope.totalAmount = 0;
                        $scope.types = data.rows;
                        if (data.rows.length != 0) {
                            /*1表示选中，2表示未选中，‘快洗’设置为选中，其他默认未未选中*/
                            for (var i = 0; i < data.rows.length; i++) {
                                if (i == 0) {
                                    $scope.types[i].check = 1;
                                    $scope.totalAmount = $scope.types[i].amount;
                                } else {
                                    $scope.types[i].check = 2;
                                }
                            }
                        }
                    },
                    function (data) {
                        console.log(data);
                    }
                );
                autoSvr.getAuto().then(
                    function (data) {
                        if (data.isSuccess) {
                            if (data.rows.length > 0) {
                                $scope.autoInfo = data.rows;
                                $scope.hasNoAuto = false;
                                /*设置默认的车辆、小区*/
                                if ($scope.autoInfo != undefined && $scope.autoInfo.length > 0) {
                                    $scope.selectedAuto.selectedAutoId = $scope.autoInfo[0].id;
                                    $scope.selectedAuto.selectedRegionId = $scope.autoInfo[0].defaultRegionId;
                                }
                            } else {
                                console.log('用户无车辆信息，未添加车辆');
                                $scope.hasNoAuto = true;
                            }
                        } else {
                            console.log(data.msg);
                        }
                    },
                    function (data) {
                        console.log(data);
                    }
                );
                regionSvr.doRequest().then(
                    function (data) {
                        if (data!=undefined) {
                            regionSvr.getCitiesFromData(data);
                            $scope.districts = regionSvr.getDistricts();
                        }
                    },
                    function (data) {
                        console.log(data);
                    }
                );
                
                break;
            case 'washTypeReturn':
            case 'autoReturn':
            case 'regionReturn':
            case 'payOrderReturn':
                /*计算金额*/
                getWashTypeAndSelectAutoInfo();
                $scope.totalAmount = 0;
                if ($scope.types != undefined && $scope.types.length > 0) {
                    for (var i = 0; i < $scope.types.length; i++) {
                        if ($scope.types[i].check == 1) {
                            $scope.totalAmount += $scope.types[i].amount;
                        }
                    }
                    $scope.totalAmount = $scope.totalAmount.toFixed(2);
                }
                /*获取车辆、小区*/
                autoSvr.getAuto().then(
                    function (data) {
                        if (data.isSuccess) {
                            if (data.rows.length > 0) {
                                $scope.autoInfo = data.rows;
                                $scope.hasNoAuto = false;
                            } else {
                                console.log('用户无车辆信息，未添加车辆');
                                $scope.hasNoAuto = true;
                            }
                        } else {
                            console.log(data.msg);
                        }
                    },
                    function (data) {
                        console.log(data);
                    }
                );
                regionSvr.doRequest().then(
                    function (data) {
                        if ($scope.districts == undefined) {
                            regionSvr.getCitiesFromData(data);
                            $scope.districts = regionSvr.getDistricts();
                        }
                    },
                    function (data) {
                        console.log(data);
                    }
                );
                break;
            case 'goToWashType':
                /*从服务获取洗车类型*/
                $scope.types = customerOrderSvr.getTypes();
                break;
            case 'goToAuto':
                /*从后台获取车辆信息*/
                autoSvr.getAuto().then(
                    function (data) {
                        if (data.isSuccess) {
                            if (data.rows.length > 0) {
                                $scope.autoInfo = data.rows;
                                $scope.hasNoAuto = false;
                                $scope.selectedAuto.selectedAutoId = customerOrderSvr.getSelectedAutoId();
                            } else {
                                console.log('用户无车辆信息，未添加车辆');
                                $scope.hasNoAuto = true;
                            }
                        } else {
                            console.log(data.msg);
                        }
                    },
                    function (data) {
                        console.log(data);
                    }
                );
                break;
            case 'goToRegion':
                /*从后台获取小区*/
                regionSvr.doRequest().then(
                    function (data) {
                        if ($scope.districts == undefined) {
                            regionSvr.getCitiesFromData(data);
                            $scope.districts = regionSvr.getDistricts();
                            $scope.selectedAuto.selectedRegionId = customerOrderSvr.getSelectedRegionId();
                        }
                    },
                    function (data) {
                        console.log(data);
                    }
                );
                break;
        }
        /*数据区*/
        $scope.order = {
            userId: $window.localStorage['userID']
        };
        /*保存选择，跳转到洗车类型选择*/
        $scope.goToWashType = function () {
            saveWashTypeAndSelectAutoInfo();
            $state.go('customerWashtype', { 'typeSelect': 'goToWashType' });
        }
        /*保存选择，跳转到车辆选择*/
        $scope.goToAutoList = function () {
            saveWashTypeAndSelectAutoInfo();
            $state.go('customerAutoList', { 'typeSelect': 'goToAuto' });
        }
        /*保存选择，跳转到小区选择*/
        $scope.goToRegionSelect = function () {
            saveWashTypeAndSelectAutoInfo();
            $state.go('customerRegionSelect', { 'typeSelect': 'goToRegion' });
        }
        /*预约洗车回转*/
        $scope.goBackMain = function () {
            $state.go('customerHome');
        }
        /*(洗车类型、车辆选择、小区选择、时间预约)*/
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
        /*前去订单*/
        $scope.commitOrder = function () {
            checkOrder();
            $state.go('customerOrderpay', { 'order': angular.toJson($scope.order), 'state': 'customerOrderMake' });
        }
        var checkOrder = function () {
            /*获取洗车类型*/
            if ($scope.types == undefined) {
                return true;
            }
            $scope.order.washTypeId = [];
            $scope.order.fixedAmount = [];
            for (var i = 0; i < $scope.types.length; i++) {
                if ($scope.types[i].check == 1) {
                    $scope.order.washTypeId.push($scope.types[i].id);
                    $scope.order.fixedAmount.push($scope.types[i].amount);
                }
            }
            /*获取车辆Id,小区Id*/
            $scope.order.autoId = $scope.selectedAuto.selectedAutoId;
            $scope.order.regionId = $scope.selectedAuto.selectedRegionId;

            //customerOrderMakeSvr.commitOrder($scope.order).then(
            //     function (data) {
            //         //根据data内的数据判断时候成功
            //         if (data.isSuccess) {
            //             console.log('提交成功');
            //             pingpp.createPayment(JSON.stringify(data.data.charge), function (result, error) {
            //                 if (result == "success") {
            //                     // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
            //                     /*从data中获取新添加的order*/
            //                     customerOrderSvr.setSelectedOrder(order);
            //                     $state.go('customerOrderMgr');
            //                 } else if (result == "fail") {
            //                     // charge 不正确或者微信公众账号支付失败时会在此处返回

            //                 } else if (result == "cancel") {
            //                     // 微信公众账号支付取消支付
            //                 }
            //             });
            //         }
            //     },
            //     function (data) {
            //         console.log(data);
            //         return true;
            //     });
        }
        /*************************洗车类型******************************/
        /*返回预定洗车界面*/
        $scope.goBackOfWashType = function () {
            if ($scope.types != undefined && $scope.types.length > 0) {
                customerOrderSvr.setType($scope.types);
            }
            $state.go("customerOrderMake", { 'typeSelect': 'washTypeReturn' });
        }
        /***************************************************************/
        /*************************车辆选择******************************/
        /*下拉刷新*/
        $scope.doRefresh = function () {
            autoSvr.getAuto().then(
            function (data) {
                if (data.isSuccess) {
                    if (data.rows.length > 0) {
                        $scope.autoInfo = data.rows;
                        console.log("获取车辆成功" + data.rows.length);
                    }
                } else {
                    console.log(data.msg);
                }
            }, function (data) {
                console.log(data);
            }
            );
            $scope.$broadcast('scroll.refreshComplete');
        }
        $scope.goToAddauto = function () {
            /*保存在service*/
            if ($scope.autoInfo != undefined && $scope.autoInfo.length > 0) {
                customerOrderSvr.setSelectedAutoId($scope.selectedAuto.selectedAutoId);
                /*选择车辆改变，则联动小区也改变*/
                var indexOfAuto = 0;
                for (var i = 0; i < $scope.autoInfo.length; i++) {
                    if ($scope.selectedAuto.selectedAutoId == $scope.autoInfo[i].id) {
                        indexOfAuto = i;
                    }
                }
                $scope.selectedAuto.selectedRegionId = $scope.autoInfo[indexOfAuto].defaultRegionId;

            }
            $state.go('customerAutoAdd', { 'backName': 'customerAutoList' });
        }
        $scope.goBackOfAuto = function () {
            /*保存在service*/
            if ($scope.autoInfo != undefined && $scope.autoInfo.length > 0) {
                customerOrderSvr.setSelectedAutoId($scope.selectedAuto.selectedAutoId);
                /*选择车辆改变，则联动小区也改变*/
                var indexOfAuto = 0;
                for (var i = 0; i < $scope.autoInfo.length; i++) {
                    if ($scope.selectedAuto.selectedAutoId == $scope.autoInfo[i].id) {
                        indexOfAuto = i;
                    }
                }
                $scope.selectedAuto.selectedRegionId = $scope.autoInfo[indexOfAuto].defaultRegionId;

            }
            
            /*跳转*/
            $state.go("customerOrderMake", { 'typeSelect': 'autoReturn' });
        }
        /***************************************************************/
        /*****************************小区选择**************************/
        $scope.doRefreshOfRegion = function () {
            $scope.districts = regionSvr.getDistricts();
            $scope.$broadcast('scroll.refreshComplete');
        }
        $scope.goBackOfRegionSelect = function () {
            /*保存到service*/
            if ($scope.districts != undefined && $scope.districts.length > 0) {
                customerOrderSvr.setSelectedRegionId($scope.selectedAuto.selectedRegionId);
            }
            $state.go('customerOrderMake', { 'typeSelect': 'regionReturn' });
        }
    }])