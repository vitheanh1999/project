app.controller("trangchuCtrl",function(api){
    var vm=this
    vm.init=()=>{
        api.getall().then(result=>{
            vm.datas=result.listA
        })
    }
})