
app.controller("newquestion", function ($scope, $uibModalInstance) {
  var vm = this
  // $scope.chudes=['Lịch học','Giảng đường','Giảng viên','Cơ sở vật chất','Môn học']
  $scope.chudes = [];
  vm.newquestion={}
  $scope.chudes = ['Khoa học', 'Công nghệ','Môn học','Lịch học','Giảng đường','Giảng viên','Cơ sở vật chất'];

  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  }
  vm.save = () => {
    let data = Object.assign({}, vm.newquestion)
    $uibModalInstance.close(data);
  }

})