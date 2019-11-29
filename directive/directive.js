app.directive("myHeader",function(){
    return{
        templateUrl:'./directive/header/header.html',
        controller:'headerCtrl',
        controllerAs:'vm'
    }
})
.directive("myFooter",function(){
    return{
        templateUrl:'./directive/footer/footer.html',
        controller:'footerCtrl'
    }
})
.directive("myLikecomment",function(){
    return{
        templateUrl:'./directive/likecomment/likecomment.html',
        controller:'likecommentCtrl'
    }
})
.directive("myComment",function(){
    return{
        templateUrl:'./directive/comment/comment.html',
        controller:'commentCtrl',
        controllerAs: 'vm'
    }
})
.directive("myNoidung",function(){
    return{
        templateUrl:'./directive/noidung/noidung.html',
        controller:'noidungCtrl',
        controllerAs:'vm'
    }
})
.directive("myNoidung",function(){
    return{
        templateUrl:'./directive/pagination.html',
        controllerAs:'vm'
    }
})
.directive("myListadmin",function(){
    return{
        templateUrl:'./directive/listadmin/listadmin.html',
        controller:'listadminCtrl',
        controllerAs:'vm'
    }
})
.directive("ngEnter",function(){
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
})