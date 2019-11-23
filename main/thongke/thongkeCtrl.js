app.controller("thongkeCtrl", function ($scope, api, $stateParams) {
  var vm = this
  vm.id = $stateParams.thongkeId

  vm.init = () => {
    api.surveystatic({ id: vm.id }).then(result => {

      vm.datas = result.result

    })
  }
  $scope.label = []
  $scope.data = [[]]

  vm.alistq1 = (index) => {
    for (let i = 0; i < vm.datas[index].alist.length; i++) {
      $scope.label[i] = vm.datas[index].alist[i].content
      $scope.data[0][i] = vm.datas[index].alist[i].count
    }
    console.log($scope.data)
    console.log($scope.label)
    // $scope.myJson = {
    //   type: 'bar',
    //   plot: {
    //     'value-box': {
    //     }
    //   },
    //   'scale-x': {
    //     labels: $scope.label
    //   },
    //   // 'scale-y': {
    //   //   values: "0:10:1"
    //   // },
    //   series: [{
    //     values:$scope.data
    //   }]
    // };

    // return $scope.myJson
  }

  $scope.label1 = []
  $scope.data1 = []

  vm.alistq2 = (index) => {
    for (let i = 0; i < vm.datas[index].alist.length; i++) {
      $scope.label1[i] = vm.datas[index].alist[i].content
      $scope.data1[i] = vm.datas[index].alist[i].count
    }
    console.log( $scope.label1)
    console.log( $scope.data1)
    // console.log( $scope.label1)
    // console.log( $scope.data1)
  //   $scope.myJson2 = {
  //     type: "pie",
  //     title: {
  //       textAlign: 'center',
  //       text: "My title"
  //     },
  //     plot: {
  //       slice: 50 //to make a donut
  //     },
  //     series: [{
  //       values: [3],
  //       text: "Total Commits"
  
  //     }, {
  //       values: [4],
  //       text: "Issues Solved"
  
  //     }, {
  //       values: [8],
  //       text: "Issues Submitted"
  //     }, {
  //       values: [7],
  //       text: "Number of Clones"
  
  //     }]
  //   };
  //   // console.log($scope.myJson2)
  //  return  $scope.myJson2
  }



})