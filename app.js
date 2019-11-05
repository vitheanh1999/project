var app = angular.module("myapp", ['ui.router','ngAnimate', 'ngSanitize','ui.bootstrap','toastr']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('root',{
            url: '/root',
            templateUrl: 'root/rootview.html'
        })
        .state('root.trangchu', {
            url: '/trangchu',
            controller: 'trangchu as vm',
            templateUrl: 'main/trangchu/trangchu.html'
        })
        .state('root.cauhoi',{
            url:'/cauhoi/:contactId',
            controller:'cauhoiCtrl as vm',
            templateUrl:'main/cauhoi/cauhoi.html'
        })
        .state('login',{
            url:'/login',
            controller:'loginCtrl',
            templateUrl:"plugin/login/login.html"
        })
        .state('resgister',{
            url:'/resgister',
            controller:'resgisterCtrl as vm',
            templateUrl:"plugin/resgister/resgister.html"
        })
        .state('root.thongtin',{
            url:'/thongtin',
            controller:'thongtinCtrl as vm',
            templateUrl:"main/thongtin/thongtin.html"
        })
        .state('root.myquestion',{
            url:'/myquestion',
            controller:'myquestionCtrl',
            templateUrl:"main/myquestion/myquestion.html"

        })
        .state('root.chude',{
            url:'/chude/:chudeId',
            controller:'chudeCtrl as vm',
            templateUrl:'main/chude/chudeCtrl.js'
        })
     

});
