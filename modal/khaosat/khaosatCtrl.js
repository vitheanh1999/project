app.controller("khaosatCtrl",function(api,$uibModalInstance,args,$scope,$state,$stateParams,factory){
    var vm=this
    console.log(args)

    vm.init=()=>{
        api.viewsurvey({id:args}).then(result=>{
            vm.title=result.surveyView.title,
            vm.description=result.surveyView.description
            vm.list=result.listQ
            vm.idsurvey=result.surveyView.id
            vm.test = {}
        })
    }

    vm.user={
    }
    // vm.checktype=(type)=>{
    //     if(type==3){
    //         return true
    //     }
    //    else return false
    // }

  
    vm.id = $stateParams.listsectionId
    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      }
      vm.save = () => {
          let data={
              id:vm.idsurvey,
              listQ:vm.test
          }
          console.log(data)
          api.dosurvey(data).then(result=>{
              if(result.success==false){
                factory.showError(result.content)
              }
              else{
                  factory.showSuccess("Khảo sát thành công")
              }
           
          })


        // let data = Object.assign({}, vm.data)
        $uibModalInstance.close(data);
        // location.reload();  
      }
})