angular.module("myapp").controller("headerCtrl", ['factory', '$scope', '$uibModal', 'api', function (factory, $scope, $uibModal, api) {
  var vm = this
  $scope.searchclick = function () {

    if ($scope.count % 2 != 0) {
      $scope.a = "active"
    }
    else {
      $scope.a = ""
    }
  }
  vm.chude=[]
  vm.chude.push(
    {
      "chude": "Lịch học",
      "url":"lichhoc"
    },
    {
      "chude": "Giảng đường",
      "url":"giangduong"
    },
    {
      "chude": "Giảng viên",
      "url":"giangvien"
    },
    {
      "chude": "Cơ sở vật chất",
      "url":"cosovatchat"
    },
    {
      "chude": "Lịch học",
      "url":"lichhoc"
    },
    {
      "chude": "Chủ đề khác",
      "url":"chudekhac"
    }
  )
  console.log(vm.chude)
  $scope.newquestion = function () {
    factory.newquestion().then(function (result) {
      api.createquestion(result).then(data => {
        location.reload();
      })
    })
  }
}])