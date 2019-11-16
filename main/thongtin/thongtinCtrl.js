app.controller("thongtinCtrl",function(api,user,factory){
    var vm=this
    // vm.infouser=user.getinfo()
    // vm.name=vm.infouser.name
    vm.init=()=>{
        api.listquestion().then(result=>{
            vm.datas=result.listQuestion
            console.log(vm.datas)
        })
        vm.id=user.getinfouser().id
        api.info({id:vm.id}).then(result=>{
            vm.user=result.dataAuth
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