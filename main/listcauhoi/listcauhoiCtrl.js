app.controller("listcauhoiCtrl", function (api, $scope, factory, $stateParams) {
  var vm = this


  $scope.currentPage = 1;
  $scope.numPerPage = 6;
  $scope.maxSize = 5;



  vm.listquestion = []
  vm.id = $stateParams.listsectionId
  $scope.searchclick = function () {

    if ($scope.count % 2 != 0) {
      $scope.a = "active"
    }
    else {
      $scope.a = ""
    }
  }
  vm.taocauhoi = () => {
    factory.taocauhoi().then(result => {
      api.createquestion({ content: result, id: vm.id }).then(result => {
        vm.listquestion.push(result)
        vm.init()
      })
    })
  }
  vm.delete = (id) => {
    factory.confirmdelete().then(result => {
      if (result.value = true) {
        api.deletequestion({ id: id }).then(result => {
          vm.listquestion = vm.listquestion.splice(id, 1)
          vm.init()
        })
      }

    })

  }
  vm.edit = (content, id) => {
    let data = {
      content: content
    }
    let args = Object.assign({}, data)
    factory.editquestion(args).then(result => {
      let data = {
        idQuestion: id,
        content: result.content
      }
      api.editquestion(data).then(result => {
        vm.init()
      })
    })
  }
  vm.checkopen=(open)=>{
    if(open==false){
      return true
    }
    else return false
  }
  vm.checkuser=(id,iduser)=>{
    if(id==iduser){
      return true;
    }
    else return false
  }
  vm.init = () => {
    vm.iduser=JSON.parse(localStorage.getItem('infouser')).id
    api.viewsec({ id: vm.id }).then(result => {
      vm.listquestion = result.listQ.reverse()
      vm.name=vm.listquestion.name
      vm.infoadmin=result.sec[0]
    })
  }
  vm.khaosat=()=>{
    factory.khaosat().then(result=>{
      
    })
  }

  $scope.$watch(updateFilteredItems)

  function updateFilteredItems() {

    var begin = (($scope.currentPage - 1) * $scope.numPerPage),
      end = begin + $scope.numPerPage;

    $scope.datas = vm.listquestion.slice(begin, end);
  }

})
app.filter('startFrom', function () {
  return function (input, start) {
    if (input) {
      start = +start;
      return input.slice(start);
    }
    return [];
  };
});