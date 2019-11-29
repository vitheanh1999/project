app.controller("listcauhoiCtrl", function (api, $scope, factory, $stateParams,user) {
  var vm = this

  vm.iduser=JSON.parse(localStorage.getItem('infouser')).id
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
         if(result.success==true){
          factory.showSuccess(result.content)
          vm.listquestion.push(result)
          vm.init()
        }
     
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
  vm.checkopen=()=>{
    if(vm.infoadmin.open==1){
      return true
    }
    else return false
  }
  vm.checkrole=()=>{
  return user.checkrole()
  }
  vm.checkuser=(idquestion,iduser)=>{
    if(idquestion==iduser){
      return 1
    }
    else return 0
  }
  vm.checkchutoa=(id)=>{
    if(id == vm.iduser){
      return 1
    }
    else return 0
  }
  vm.init = () => {
    vm.iduser=JSON.parse(localStorage.getItem('infouser')).id
    api.viewsec({ id: vm.id }).then(result => {

      vm.infoadmin=result.sec[0]
      vm.listsurvey=result.listS
      vm.listquestion = result.listQ
      vm.lengthlist=result.listQ.length
      vm.lengthsur=result.listS.length
      vm.name=vm.listquestion.name
      if(vm.checkopen()==false){
        factory.showError("Phiên đã đóng")
      }

    })
    
  }
  vm.khaosat=(id)=>{
    factory.khaosat(id).then(result=>{
      api.viewsurvey()
    })
  }
  vm.checkopensur=(id)=>{
    return id
  }
  vm.checkchutoa=(id)=>{
    vm.iduser=JSON.parse(localStorage.getItem('infouser')).id
    if(id==vm.iduser){
      return 1
    }
    else return 0
  }
  vm.mosur=(id)=>{
    factory.confirm().then(result=>{
      if(result.value==0){
        api.opensurvey({id:id}).then(result=>{
          vm.init()
        })
      }
    })
  }
  vm.dongsur=(id)=>{
    factory.confirm().then(result=>{
      if(result.value==0){
        api.closesurvey({id:id}).then(result=>{
          vm.init()
        })
      }
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