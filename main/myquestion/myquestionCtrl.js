app.controller("myquestionCtrl",function(api){
    var vm=this
   vm.init=()=>{
    api.listquestion().then(result=>{
        vm.datas=result.listQuestion
        console.log(vm.datas)
    })
   }
})