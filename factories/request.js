angular.module('myapp').factory('request',['$http','$q',
        function ($http, $q) {
            {
                var methods = {
                    get: get,
                    post: post,
                    excel: excel
                };
    
                function post(url, data, header, isUpload = false) {
    
    
                    var _defer = $q.defer();
                    var req = {
                        method: 'POST',
                        url: url,
                        objectKey: '.k',
                        arrayKey: '',
                        headers: {
                            Authorization: header,
                            'Accept-Language': 'vi'
                        },
                        data: data,
                        timeout: 1000000,

                        // currentBranch: ($localStorage.selectBranch) ? $localStorageselectBranch : 0
    
                    };
    
                    let onSuccess = data => {
    
    
                        _defer.resolve(data.data);
                        if (data.data.err == 0) {
                            _defer.resolve(data.data);
                        }
                        else {
                            _defer.reject(data.data);
                            if (data.data.logout) {
                                $state.go('login')
                            }
    
                        }
                    }
                    let onError = function (err) {
    
    
                        _defer.reject({
                            err: -1,
                            // desc: Cannot connect to server.,
                            // detail: err,
                            // msg: Cannot connect to server!,
                        });
                    }
                    if (isUpload) {
                        Upload.upload(req).then(onSuccess, onError).catch(function (fallback) {
    
                        });
                    }
                    else {
                        // if (useSocket) {
                        //     io.socket.request(req, function (res, body) {
                        //         if (res)
                        //             onSuccess({ data: res })
                        //         else
                        //             onError(body);
                        //     })
                        // }
                        // else {
                        $http(req).then(onSuccess, onError).catch(function (fallback) {
    
                        });
                        // }
                    }
    
                    return _defer.promise;
                }
    
    
    
    
    
    
                function get(url, header) {
                    // if (config.dev) {
    
                    // }
    
                    var defer = $q.defer();
                    var res = {
                        url: url,
                        method: 'GET',
                        headers: {
                            Authorization: header,
                            'Accept-Language': 'vi'
                        },
                        timeout: 20000
                    }
                    $http(res).then(function (data) {
                        defer.resolve(data.data);
                    }, function (err) {
                        defer.resolve({
                            error: 404,
                            msg: "Vui lòng kiểm tra lại kết nối mạng"
                        });
                    });
                    return defer.promise;
                }
    
    
                function excel(url, data, header) {
                    var _defer = $q.defer();
    
                    var req = {
                        method: 'POST',
                        url: url,
                        responseType: "arraybuffer",
                        headers: {
                            Authorization: header,
                            'Accept-Language': 'vi',
                            Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    
                        },
                        data: data,
                        timeout: 30000
                    };
    
                    $http(req).then(function (data) {
    
                        var type = data.headers('Content-Type');
                        var disposition = data.headers('Content-Disposition');
    
                        _defer.resolve(data);
                    }, function (err) {
    
                        _defer.resolve({
                            error: 1,
                            msg: "Lỗi kết nối"
                        });
                    });
                    return _defer.promise;
                }
    
                return methods;
            }
        }
    ]
);