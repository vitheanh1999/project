app.controller("questionCtrl",function(api){
    var vm=this
    vm.init=()=>{
        api.history().then(result=>{
            vm.listA=result.historyA
            vm.listQ=result.historyQ
            vm.listSec=result.historySec
            vm.listSur=result.historySur
        })
    }
})