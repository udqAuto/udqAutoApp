﻿angular.module('udqApp')
.service('LoadingSvr', ['$ionicLoading', '$timeout', function ($ionicLoading, $timeout) {
    this.show = function () {
        $ionicLoading.show({
            template: 'Loading...'
        });
        $timeout(function () {
            $ionicLoading.hide(); 
        }, 5000);
    }
    this.hide = function () {
        $ionicLoading.hide();
    }
}])