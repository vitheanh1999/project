app.factory("user",function(){
    var methods={
        logout:logout,
        getinfo:getinfo,
        checklogin:checklogin
    }
    function logout(){
        localStorage.clear()
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