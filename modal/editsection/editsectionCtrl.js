app.controller("editsectionCtrl",function($uibModalInstance,args){
    var vm=this
    vm.data={}
    vm.data=args
    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      }
      vm.save = () => {
        let data = Object.assign({}, vm.data)
        $uibModalInstance.close(data);
      }
})