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
3.7 state的命名规范。大类+‘_’+页面名称  比如：customer_main 表示  customer下面的main页面。
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
        });
    })

	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/login/login.html',
            controller:'loginCtrl'
        })
        .state('customerHome', {
            url: '/customerHome',
            templateUrl: 'app/customer/home/home.html',
            controller: 'customerHomeCtrl'
        });

	    $urlRouterProvider.otherwise('/login');

	}])