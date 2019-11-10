app.controller("taokhaosatCtrl",function($scope){
    var vm=this
    $scope.hstep = 1; 

  $scope.options = {
    hstep: ["Yes/No-Question","Nhiều đáp án"],
  };
  if($scope.hstep="Yes/No-Question"){
    console.log("ysss")
  }
    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      }
      vm.save = () => {
        let data = Object.assign({}, vm.newquestion)
        $uibModalInstance.close(data);
      }
})