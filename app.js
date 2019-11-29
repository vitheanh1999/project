var app = angular.module("myapp", ['ui.router','ngAnimate', 'ngSanitize','ui.bootstrap','toastr','chart.js']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');
    // $urlRouterProvider.otherwise(function ($injector, $location) {
    //     var $state = $injector.get('$state');
    //     var path = $location.protocol();
    //     if (path == 'http') {
    //        $state.go('external');
    //     }
    //     else {
    //         return '/login';
    //     }
    $stateProvider
        .state('root',{
            url: '/root',
            templateUrl: 'root/rootview.html'
        })
        .state('admin',{
            url: '/admin/trangchu',
            controller: 'trangchuCtrl as vm',
            templateUrl: 'admin/trangchu/trangchu.html'
        })
        .state('section',{
            url: '/admin/section',
            controller: 'sectionCtrl as vm',
            templateUrl: 'admin/section/section.html'
        })
        .state('question',{
            url: '/admin/question',
            controller: 'questionCtrl as vm',
            templateUrl: 'admin/question/question.html'
        })
        .state('root.trangchu', {
            url: '/trangchu',
            controller: 'trangchu as vm',
            templateUrl: 'main/trangchu/trangchu.html'
        })
        .state('root.phienhoatdong',{
            url: '/phienhoatdong',
            controller: 'phienhoatdongCtrl as vm',
            templateUrl: 'main/phienhoatdong/phienhoatdong.html'
        })
        .state('root.cauhoi',{
            url:'/cauhoi/:cauhoiId',
            controller:'cauhoiCtrl as vm',
            templateUrl:'main/cauhoi/cauhoi.html'
        })
        .state('root.listcauhoi',{
            url:'/listcauhoi/:listsectionId',
            controller:'listcauhoiCtrl as vm',
            templateUrl:'main/listcauhoi/listcauhoi.html'
        })
        .state('login',{
            url:'/login',
            controller:'loginCtrl',
            templateUrl:"plugin/login/login.html"
        })
        .state('taokhaosat',{
            url:'/taokhaosat/:surveyId',
            controller:'taokhaosatCtrl as vm',
            templateUrl:"modal/taokhaosat/taokhaosat.html"
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
            controller:'myquestionCtrl as vm',
            templateUrl:"main/myquestion/myquestion.html"

        })
        .state('root.chude',{
            url:'/chude/:chudeId',
            controller:'chudeCtrl as vm',
            templateUrl:'main/chude/chude.html'
        })
        .state('root.thongke',{
            url:'/thongke/:thongkeId',
            controller:'thongkeCtrl as vm',
            templateUrl:'main/thongke/thongke.html'
        })
        .state('root.profile',{
            url:'/profile/:profileId',
            controller:'profileCtrl as vm',
            templateUrl:'main/profile/profile.html'
        })
     

});
