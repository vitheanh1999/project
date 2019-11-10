app.controller("taocauhoiCtrl",function($uibModalInstance){
    var vm=this
    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      }
      vm.save = () => {
        // let data = Object.assign({}, vm.newquestion.content)
        $uibModalInstance.close(vm.newquestion.content);
      }
})