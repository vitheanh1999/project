app.controller("trangchuCtrl",function(api,factory){
    var vm=this
    vm.init=()=>{
        api.getall().then(result=>{
            vm.datas=result.listA
        })
    }
    vm.taochutoa=()=>{
        factory.taochutoa().then(result=>{
            vm.init()
        })
    }
    vm.resetpassword=(id)=>{
        factory.confirm().then(result=>{
            if(result.value==0){
                api.resetpassword({id:id}).then(result=>{
                    factory.showSuccess("mật khẩu mới giống tên tài khoản của bạn")
                })
            }
        })
       
    }
    vm.changerole=(id)=>{
        api.changerole({id:id}).then(result=>{
            factory.showSuccess(result.conntent)
            vm.init()
        })
    }
})