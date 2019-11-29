angular.module("myapp").controller("headerCtrl", ['factory', '$scope', '$uibModal', 'api','user','$state', function (factory, $scope, $uibModal, api,user,$state) {
  var vm = this
  vm.checklogin=()=>{
    if(!user.checklogin()){
      $state.go("login")
    }
  }
  vm.info=user.getinfouser()
  vm.checkrole=()=>{
  return user.checkrole()
  }
  vm.gotoadmin=()=>{
    
  }
  $scope.searchclick = function () {

    if ($scope.count % 2 != 0) {
      $scope.a = "active"
    }
    else {
      $scope.a = ""
    }
  }
  console.log(vm.chude)
  $scope.taophien = function () {
    factory.taophien().then(function (result) {
      api.createsection(result).then(data => {
        if(data.success==true){
          factory.showSuccess(data.content)
          location.reload();
        }
        else{
          factory.showError(data.content)
        }

        // $state.go('root.trangchu')
      })
    })
  }
  $scope.logout=function(){
    factory.confirm().then(result=>{
      if(result.value==0){
        user.logout()
        $state.go('login')
      }
    })
  }
}])