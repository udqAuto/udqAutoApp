﻿/*
1.目录结构
1.1 按业务功能划分目录
1.2 每个功能页面单独一个目录，目录中包括：html,controller,service(可选）和 directive（可选)
1.3 每个customer 和 employee 的专有功能分别放在各自目录下
1.4 公共部分之间放在app目录下
1.5 工具类的放在  util 目录下
3.命名规范：
3.1 customer 用来表示车主，不能使用 owner。已有的必须要改
3.2 employee 用来表示职员  ，不能使用其它命名
3.3 controller的文件用 Ctrl后缀
3.4 service文件用 Svr后缀
3.5 module 和 html 没有后缀
3.5 首字母小写，后面的单词大写开头（驼峰命名）
3.6 控制器的命名规范参考 mainCtrl 
3.7 state的命名规范。大类+页面名称  比如：customerMain 表示  customer下面的main页面。
3.8 原则上除大家约定成俗的缩写外，其它单词不能使用缩写，如果要写缩写，需要经过我的同意。
4.页面
4.1 APP界面一般都没有超链接，用按钮来操作。
*/



angular.module('udqApp', ['ionic'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            jPush.init(notificationCallback);
            jPush.setAlias("123");

            window.plugins.jPushPlugin.init();
            windows.plugins.jPushPlugin.setDebugMode(true);

        });

        var notificationCallback = function (data) {
            console.log('received data :' + data);
            var notification = angular.fromJson(data);
            //app 是否处于正在运行状态
            var isActive = notification.notification;

            // here add your code
            //ios
            if (ionic.Platform.isIOS()) {
                window.alert(notification);

            } else {
                //非 ios(android)
            }
        };

    })
	.config(['$stateProvider', '$urlRouterProvider', 'APP_CONFIG', function ($stateProvider, $urlRouterProvider, APP_CONFIG) {
	    $stateProvider
        /*登录*/
        .state('login', {
            url: '/login',
            templateUrl: 'app/login/login.html',
            controller:'loginCtrl'
        })
	    /*车主主页*/
        .state('customerHome', {
            url: '/customerHome',
            templateUrl: 'app/customer/home/home.html',
            controller: 'customerHomeCtrl'
        })
        /*车主-我的订单*/
        .state('customerMyOrder', {
            url: '/customerMyOrder',
            templateUrl: 'app/customer/order/order.html',
            controller: 'customerOrderCtrl'
        })
        /*车主-我的点趣*/
        .state('customerMyDQ', {
            url: '/customerMyDQ',
            templateUrl: 'app/customer/member/memberCenter.html',
            controller: 'customerMemberCenterCtrl'
        })
        /*车主-车辆管理-添加车辆(注册添加)*/
        .state('customerAutoAdd', {
            url: '/customerAutoAdd',
            templateUrl: 'app/customer/auto/autoAdd.html',
            controller: 'customerAutoAddCtrl'
        })
        /*车主-车辆管理-添加车辆(登录添加)*/
        .state('customerAutoAdd1', {
            url: '/customerAutoAdd1',
            templateUrl: 'app/customer/auto/autoAdd1.html',
            controller: 'customerAutoAddCtrl'
        })
        /*车主-车辆管理*/
        .state('customerAutoMgr', {
            url: '/customerAutoMgr',
            templateUrl: 'app/customer/auto/autoMgr.html',
            controller: 'customerAutoMgrCtrl'
        })
        /*车主-我要洗车-车辆选择*/
        .state('customerAutoList', {
            url: '/customerAutoList',
            templateUrl: 'app/customer/auto/autoList.html',
            controller: 'customerAutoListCtrl'
        })
        /*车主-我的点趣-信息编辑*/
        .state('customerMemberInfoEdit', {
            url: '/customerMemberInfoEdit',
            templateUrl: 'app/customer/member/memberInfoEdit.html',
            controller: 'customerMemberInfoEditCtrl'
        })
        /*车主-我的订单-订单评价*/
        .state('customerOrderEvaluate', {
            url: '/customerOrderEvaluate',
            templateUrl: 'app/customer/order/orderEvaluate.html',
            controller: 'customerOrderEvaluateCtrl'
        })
        /*车主-我要洗车*/
        .state('customerOrderMake',{
            url:'/customerOrderMake',
            templateUrl:'app/customer/order/orderMake.html',
            controller:'customerOrderMakeCtrl'
        })
        /*车主-我要洗车-洗车类型*/
        .state('customerWashtype', {
            url: '/customerWashtype',
            templateUrl: 'app/customer/order/washtype.html',
            controller: 'customerWashtypeCtrl'
        })
        /*车主-注册*/
        .state('customerRegister', {
            url: '/customerRegister',
            templateUrl: 'app/customer/register/register.html',
            controller: 'customerRegisterCtrl'
        })
        /*洗车店*/
        .state('employeeHome', {
            url: '/employeeHome',
            templateUrl: 'app/employee/home/home.html',
            controller: 'employeeHomeCtrl'
        })
        /*洗车店-待确认*/
        .state('employeeOrderToBeConfirmed',{
            url:'/employeeOrderToBeConfirmed',
            templateUrl:'app/employee/order/orderToBeConfirmed.html',
            controller: 'employeeOrderToBeConfirmedCtrl'
        })
       .state('sex',{
            url:'/sex',
            templateUrl:'app/util/sex.html',
            controller:'sexCtrl'
        })
	    /*        .state('',{
            url:'',
            templateUrl:'',
            controller:''
        })*/
        ;

	    //console.log(appConfigProvider);
	    var y = APP_CONFIG;
	    var surl = APP_CONFIG.server.address;

	    $urlRouterProvider.otherwise('/login');

        /*test*/

	}])


