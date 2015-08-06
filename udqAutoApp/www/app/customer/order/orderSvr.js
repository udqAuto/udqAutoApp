﻿angular.module('udqApp')
     .service('customerOrderSvr', ['$http', '$q', '$window', 'APP_CONFIG', function ($http, $q, $window, APP_CONFIG) {
         var bathUrl = APP_CONFIG.server.getUrl();

         var _selectedTypes = [];
         var _selectedTypeId = [];
         var _pn = '';

         this.setType = function (types, typeId) {
             _selectedTypes = types;
             _selectedTypeId = typeId;
         }
         this.getTypes = function () {
             return _selectedTypes;
         }
         this.getTypeId = function () {
             return _selectedTypeId;
         }
         this.setAutoPN = function (pn) {
             _pn = pn;
         }
         this.getPN = function () {
             return _pn;
         }
         /*获取所有订单*/
         this.getOrdersList = function () {
             //var userId = $window.localStorage['userID'];
             var userId = 16;
             var url = bathUrl + 'fzmgr/order/getOrderByUserId4App.do?userId='+userId;

             var deferred = $q.defer();
             $http.get(url).success(
                 function (data, status, headers, config) {
                     deferred.resolve(data);
                 }).error( 
                 function (data, status, headers, config) {
                     deferred.reject("get order List failed");
                 });
             return deferred.promise;
         }
         /*获取未确认订单*/
         this.getEvaluateOrders = function () {
             var url = bathUrl + '';

             var deferred = $q.defer();
             $http.get(url).success(
                 function (data, status, headers, config) {
                     deferred.resolve(data);
                 }).error(
                 function (data, status, headers, config) {
                     deferred.reject("获取未确认订单失败");
                 });
             return deferred.promise;
         }
         /*获取已完成订单*/
         this.getFinishedeOrders = function () {
             var url = bathUrl + '';

             var deferred = $q.defer();
             $http.get(url).success(
                 function (data, status, headers, config) {
                     deferred.resolve(data);
                 }).error(
                 function (data, status, headers, config) {
                     deferred.reject("获取已完成订单失败");
                 });
             return deferred.promise;
         }
         /*取消订单*/
         this.cancelOrder = function (order) {
             var url = bathUrl + 'fzmgr/order/handleOrder4App.do';
             var orderInfo = {
                 orderNo: order.orderNo,
                 state: 11
             };
             
             var deferred = $q.defer();
             $http({
                 method: 'post',
                 url: url,
                 data: {
                     orderInfo: JSON.stringify(orderInfo)
                 }
             }).success(
                 function (data, status, headers, config) {
                     deferred.resolve(data);
                 }).error(
                 function (data, status, headers, config) {
                     deferred.reject("取消订单失败");
                 });
             return deferred.promise;
         } 
         /*订单评价*/
         this.judgeOrder = function (order) {
             /*?orderId=&mark=*/
             var url = bathUrl + 'fzmgr/order/handleOrder4App.do';
             var orderInfo = {
                 orderNo: order.orderNo,
                 gradeUser:order.gradeUser,
                 state: 0
             };
             var deferred = $q.defer();

             $http({
                 method: 'post',
                 url: url,
                 data: {

                 }
             }).success(
                 function (data, status, headers, config) {
                     deferred.resolve(data);
                 }).error(
                 function (data, status, headers, config) {
                     deferred.reject("评价订单失败");
                 });
             return deferred.promise;
         }
     }])