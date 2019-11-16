app.factory("user",function(){
    var methods={
        logout:logout,
        getinfo:getinfo,
        checklogin:checklogin,
        getinfouser
    }
    function logout(){
        localStorage.clear()
    }
    function getinfouser(){
        infouser=JSON.parse(localStorage.getItem('infouser'))
        return infouser
    }
    function getinfo(){
        info=JSON.parse(localStorage.getItem('info'))
        return info
    }
    function checklogin(){
        token = JSON.parse(localStorage.getItem('token'));
        if(token){
            return true
        }
        else return false
    }
    return methods;
})