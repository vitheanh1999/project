app.factory("user",function(){
    var methods={
        logout:logout,
        getinfo:getinfo,
        checklogin:checklogin,
        getinfouser:getinfouser,
        checkrole:checkrole,
        checkid:checkid
    }
    function logout(){
        localStorage.clear()
    }
    function checkrole(){
        infouser=JSON.parse(localStorage.getItem('infouser'))
        if(infouser.role==1){
            return 1
        }
        else if(infouser.role==2){
            return 2
        }
        else if(infouser.role==3){
            return 3
        }
    }
    function checkid(){
        return iduser=JSON.parse(localStorage.getItem('infouser')).id
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