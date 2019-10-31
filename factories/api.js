angular.module('myapp').factory('api', ['config', 'request','factory', function (config, request, factory) {
    console.log('host', request);
    var apiget = {
        question: 'question/list',
    };
    
    var apipost = {
        
        creareanwer:'answer/create',
        viewquestion: 'question/viewquestion',
        createquestion:'question/create',
        login:'login',
        resgister:'resgister'
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