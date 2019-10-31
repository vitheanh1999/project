app.controller("resgisterCtrl",function($scope,api,$state,factory){
   var vm=this;
   vm.user={}
   vm.resgister=()=>{
    vm.data={
        username:vm.user.username,
        password:vm.user.password,
        confirmpassword:vm.user.confirmpassword,
        name:vm.user.name
    }
      api.resgister(vm.data).then(result=>{
          if(result.success===true){
            factory.showSuccess("Đăng ký thành công")
            $state.go("login")
          }
          else{
              factory.showError(result.content)
          }
      })
   }
})