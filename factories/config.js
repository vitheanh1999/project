angular.module("myapp").factory('config',[function(){
    var config={
        DEFAULT_TOKEN: 'Basic 0b8d5a83-d655-4309-ace0-0468c6bc5dc0',
        HOST: 'http://localhost:1337/',
        // PORT: 8080,
    }
    return config
}])