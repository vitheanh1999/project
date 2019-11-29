app.controller("editpasswordCtrl",function($uibModalInstance,args){
    var vm=this
    vm.user={}
    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      }
      vm.save = () => {
        let data = Object.assign({}, vm.user)
        $uibModalInstance.close(data);
      }
})