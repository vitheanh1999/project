app.controller("khaosatCtrl",function(api,$uibModalInstance,args,$scope,$state,$stateParams){
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
    //     if(type==1){
    //         return 1
    //     }
    //     if(type==2){
    //         return 2
    //     }
    //     if(type){
    //         return 3
    //     }
    // }

  
    vm.id = $stateParams.listsectionId
    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      }
      vm.save = (id) => {
          let data={
              id:vm.idsurvey,
              listQ:vm.test
          }
          api.dosurvey(data).then(result=>{

          })
        //   vm.data={
        //       value:true
        //   }

        // let data = Object.assign({}, vm.data)
        $uibModalInstance.close(data);
        // location.reload();  
      }
})