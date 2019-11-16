angular.module("myapp").controller("headerCtrl", ['factory', '$scope', '$uibModal', 'api','user','$state', function (factory, $scope, $uibModal, api,user,$state) {
  var vm = this
  vm.checklogin=()=>{
    if(!user.checklogin()){
      $state.go("login")
    }
  }
  $scope.searchclick = function () {

    if ($scope.count % 2 != 0) {
      $scope.a = "active"
    }
    else {
      $scope.a = ""
    }
  }
  // vm.chude=[]
  // vm.chude.push(
  //   {
  //     "chude": "Lịch học",
  //     "url":"lichhoc"
  //   },
  //   {
  //     "chude": "Giảng đường",
  //     "url":"giangduong"
  //   },
  //   {
  //     "chude": "Giảng viên",
  //     "url":"giangvien"
  //   },
  //   {
  //     "chude": "Cơ sở vật chất",
  //     "url":"cosovatchat"
  //   },
  //   {
  //     "chude": "Lịch học",
  //     "url":"lichhoc"
  //   },
  //   {
  //     "chude": "Chủ đề khác",
  //     "url":"chudekhac"
  //   }
  // )
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