app.controller("thongtinCtrl",function(api,user,factory){
    var vm=this
    vm.infouser=user.getinfo()
    vm.name=vm.infouser.name
    vm.init=()=>{
        api.info().then(result=>{
            
        })
    }
    vm.edit=()=>{
        factory.editquestion().then(result=>{
            
        })
    }
    vm.delete=()=>{
        factory.confirmdelete().then(result=>{
            
        })
    }
})