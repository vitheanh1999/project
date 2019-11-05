app.controller("cauhoiCtrl",function($scope,$location,api,$stateParams,$state){
  var vm=this
  vm.id = $stateParams.contactId
 
    api.question().then(result=>{
      vm.datas=result
    })
    vm.id=$stateParams.contactId
    api.viewquestion({id:vm.id}).then(result=>{
      console.log(result.a)
      $scope.datas=Object.assign({}, result.q[0])
    })
  })