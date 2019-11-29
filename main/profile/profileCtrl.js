app.controller("profileCtrl",function(api,$stateParams){
    var vm=this
    vm.id=$stateParams.profileId
    vm.init=()=>{
        api.profile({id:vm.id}).then(result=>{
            vm.thongtin=result.A[0]
            vm.listQ=result.listQ
            vm.listS=result.listS
        })
    }
})