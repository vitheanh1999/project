
app.controller("taophienCtrl", function ($scope, $uibModalInstance) {
  var vm = this
  // $scope.chudes=['Lịch học','Giảng đường','Giảng viên','Cơ sở vật chất','Môn học']
  $scope.chudes = [];
  vm.newphien={}
  $scope.chudes =[
    {id:1,topic:'Lịch học'},
    {id:2,topic:'Giang đường'},
    {id:3,topic:'Giảng viên'},
    {id:4,topic:'Cơ sở vật chất'},
    {id:5,topic:'Môn học'},
    {id:6,topic:'Chủ đề khác'}
  ];

  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  }
  vm.save = () => {
    let data = Object.assign({}, vm.newphien)
    $uibModalInstance.close(data);
  }

})