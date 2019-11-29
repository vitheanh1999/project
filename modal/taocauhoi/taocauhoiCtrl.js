app.controller("taocauhoiCtrl",function($uibModalInstance,factory){
    var vm=this
    vm.newquestion={}
    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      }
      vm.save = () => {

        if(!vm.newquestion.content){
          factory.showError("Chưa nhập đủ nội dung")
          $uibModalInstance.close();
         
        }
        else{
          $uibModalInstance.close(vm.newquestion.content);
        }
      }
})