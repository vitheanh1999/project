app.controller("taochutoaCtrl",function(api,factory,$uibModalInstance){
    var vm=this
    vm.chutoa={}
    vm.save=()=>{
        api.createchutoa(vm.chutoa).then(result=>{
            if(result.success==false){
                factory.showError(result.content)
            }
            if(result.success==true){
                factory.showSuccess(result.content)
                $uibModalInstance.close();

            }
        })
    }
})