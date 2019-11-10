angular.module('myapp').factory('api', ['config', 'request','factory','$stateParams', function (config, request, factory,$stateParams,$scope) {
    console.log('host', request);
    var idlistsectionId = $stateParams.listsectionId
    var idcauhoiId =$stateParams.idcauhoiId
    var apiget = {
        question: 'question/list',
        listsection:'section/list',
        listtopic:'topic/list',
    };
    
    var apipost = {
        
        createanswer:'answer/create',

        createsection:'section/create',
        viewsec:'section/viewsec',
        deletesection:'section/delete',
        editsection:'section/edit',

        createquestion:'question/create',
        viewquestion: 'question/viewquestion',
        deletequestion:'question/delete',
        editquestion:'question/edit',

        login:'auth/login',
        resgister:'auth/registration',
        like:'question/like',
        info:'auth/info'


    };

    var methods = {
        apiError: err => {
            switch (err.err) {
                case 1:
                    factory.showMessage(`Params error.`);
                    break;
                case 401:
                    if (err.desc == 'invalid bearer token!') {
                        //Refresh token
                        let tokenRefresh = user.getRefreshToken();
                        if (tokenRefresh && (new Date() < new Date(tokenRefresh.expiredAt))) {
                            let dataSend = {
                                tokenRefresh: tokenRefresh.token,
                                firebaseToken: 'asdfasdfasdfewoir234234'
                            }
                            methods.refreshToken(dataSend, config.DEFAULT_TOKEN).then(result => {
                                user.setData(result);
                                $state.reload();
                            }, err => {
                                if (err.err == 1) {
                                    if ($state.current.name != 'login') {
                                        factory.showMessage(`You have been signed out because your account is logged in elsewhere.`)
                                        $state.go('login');
                                    }
                                }
                            })
                        }
                    } else if (err.desc == 'invalid permission!') {
                        // factory.showMessage(`You don't have permission to view this page.`);
                    } else {
                        factory.showMessage(err.desc);
                    }
                    break;
                case -1:
                    factory.showMessage(err.desc);
                    break;
                default:
                    console.log('test')
                    factory.showMessage(err.desc);
                    break;
            }
            return false;
        }
    };
    angular.forEach(apiget, function (value, key) {
        // console.log('key', key);
        // this[key] = function (data, token = user.getData(), isUpload = false)
        // var token=user.gettoken().token
        this[key] = function (data, isUpload = false) {
            // let host = $location.protocol() + '://' + $location.host();
            let host = config.HOST;
            console.log('host', host);
            if (config.PORT) {
                host = host + ':' + config.PORT + '/'
            }
            var url = host + value;
            console.log(url)
            console.log(data)
            if (!data) {
                data = {}
            }
            return request.get(url, data, !!isUpload);

        }
    }, methods)
    angular.forEach(apipost, function (value, key) {
        // console.log('key', key);
        // this[key] = function (data, token = user.getData(), isUpload = false)
        // var token=user.gettoken().token
        this[key] = function (data, isUpload = false) {
            // let host = $location.protocol() + '://' + $location.host();
            let host = config.HOST;
            console.log('host', host);
            if (config.PORT) {
                host = host + ':' + config.PORT + '/'
            }
            var url = host + value;
            console.log(url)
            console.log(data)
            if (!data) {
                data = {}
            }
            return request.post(url, data, !!isUpload);

        }
    }, methods)
    return methods;
}
])