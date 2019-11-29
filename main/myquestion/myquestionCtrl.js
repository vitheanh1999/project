app.controller("myquestionCtrl",function(api){
    var vm=this
    vm.init = () => {

        api.myauth().then(result=>{
            vm.listQ=result.listQ
            vm.info=result.A[0]
        })

    }
})