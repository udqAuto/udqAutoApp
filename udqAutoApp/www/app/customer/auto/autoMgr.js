angular.module('udqApp')
	.controller('customerAutoMgrCtrl', ['$scope', '$state', '$ionicHistory', '$window', 'autoSvr', 'popUpSvr', function ($scope, $state, $ionicHistory, $window, autoSvr, popUpSvr) {
	    var backParam = autoSvr.getBackParam();
	    autoSvr.getAuto().then(
            function (data) {
                if (data.isSuccess) {
                    if (data.rows.length > 0) {
                        $scope.autoInfo = data.rows;
                        $scope.hasNoAuto = false;
                    } else {
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
	    $scope.selectedAuto = autoSvr.getAutoInfo();
	    /*车辆详情*/
	    $scope.goToAutoInfo = function (auto) {
	        autoSvr.setAutoInfo(auto);
	        $state.go('customerAutoInfo');
	    }
	    $scope.goBackOfAutoInfo = function () {
	        $ionicHistory.clearHistory();
	        $state.go('customerAutoMgr');
	    }
	    /*删除车辆*/
	    $scope.deleteAuto = function (item) {
	        popUpSvr.confirmExit('注销当前用户？').then(function (res) {
	            if (res) {
	                var promise = autoSvr.deleteAutoItem(item.id);
	                promise.then(
                        function (data) {
                            if (data.isSuccess) {
                                ArrayRemove($scope.autoInfo, item);
                            }
                        },
                        function (data) {
                            console.log(data);
                        }
                    );
	                $scope.doRefresh();
	                console.log('确定删除');
	            } else {
	                console.log('you are not sure');
	            }
	        });
	    }
	    /*下拉刷新*/
	    $scope.doRefresh = function () {
	        autoSvr.getAuto().then(
                function (data) {
                    if (data.isSuccess) {
                        if (data.rows.length > 0) {
                            $scope.autoInfo = data.rows;
                            $scope.hasNoAuto = false;
                        } else {
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
	        $scope.$broadcast('scroll.refreshComplete');
	    }
	    /*添加车辆*/
	    $scope.goToAddauto = function () {
	        $ionicHistory.clearHistory();
	        $state.go('customerAutoAdd', { 'backName': 'customerAutoMgr' });
	    }
	    /*回跳(根据backParam)*/
	    $scope.goBack = function () {
	        $ionicHistory.clearHistory();
	        if (backParam == "customerMyDQ") {
	            $state.go('customerMyDQ');
	        }
	        if (backParam == "customerHome") {
	            $state.go('customerHome');
	        }
	    }
	    /*(自定义)数组移除指定元素*/
	    var ArrayRemove = function (array, item) {
	        var index = -1;
	        for (var i = 0; i < array.length; i++) {
	            var element = array[i];
	            if (item.id == element.id) {
	                index = i;
	                break;
	            }
	        }
	        if (index == -1) {
	            array.splice(index, 1);
	        }
	    }
	}]);
