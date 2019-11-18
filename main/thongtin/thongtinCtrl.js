app.controller("thongtinCtrl",function(api,user,factory){
    var vm=this
    // vm.infouser=user.getinfo()
    // vm.name=vm.infouser.name
    vm.init=()=>{
        api.listquestion().then(result=>{
            vm.datas=result.listQuestion
            console.log(vm.datas)
        })
        vm.user=user.getinfouser()
        if(user.checkrole()==1){
            vm.admin=()=>{
                return true
            }
        }
        else{
            vm.admin=()=>{
                return false
            }
        }
        
        // api.info({id:vm.id}).then(result=>{
        //     vm.user=result.dataAuth
        //     vm.name=user.getinfouser().name
        // })
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