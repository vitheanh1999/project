app.controller("trangchu", function (api, $scope, $http, factory, config, filterFilter, $rootScope,user) {

  var vm = this
  api.question().then(result => {
    console.log(result)
    // $scope.a=result.id
  })
  vm.phienhoatdong=[]
  vm.phiendong=[]
  // vm.phienhoatdong=[]
  $scope.result = [];
  $scope.datas = [];
  $scope.currentPage = 1;
  $scope.numPerPage = 6;
  $scope.maxSize = 5;
  $scope.topic = []
  function init() {
    api.listsection().then(result => {
      vm.iduser=JSON.parse(localStorage.getItem('infouser')).id
      vm.sumphien=result.sec.length
      $scope.result = result.sec
      for(var i=0;$scope.result[i];i++){  
         if( $scope.result[i].open==true){
          vm.phienhoatdong.push($scope.result[i])
         }
         if($scope.result[i].open==false){
          vm.phiendong.push($scope.result[i])
         }
        }
      localStorage.setItem("infophien", JSON.stringify($scope.result))
      vm.phienhoatdong
      vm.phiendong
    })
    api.listtopic().then(result => {
      $scope.topic = result.list
    })
  }
  vm.checkuser=(id,iduser)=>{
    if(user.checkrole()==1){ 
      return true
    }
    else return false
  }
  vm.delete = (id) => {
    factory.confirmdelete().then(result => {
      if (result.value == true) {
        api.deletesection({ id: id }).then(result => {
          vm.phienhoatdong = vm.phienhoatdong.splice(id, 1)
          vm.phienhoatdong=vm.phienhoatdong.splice(id)
          init()
        })
      }

    })
  }
  vm.closesec=(id)=>{
    factory.closesec().then(result=>{
      if(result.value==true){
        api.closesec({id:id}).then(result=>{

          vm.phienhoatdong=vm.phienhoatdong.splice(id,1)
          vm.phiendong=vm.phiendong.splice(id)
          init()
        })
      }
    })
  }
  vm.opensec=(id)=>{
    factory.opensec().then(result=>{
      if(result.value==true){
        api.opensec({id:id}).then(result=>{
          vm.phiendong=vm.phiendong.splice(id,1)
          vm.phienhoatdong=vm.phienhoatdong.splice(id)
          init()
        })
      }
    })
  }
  vm.edit = (id, title, content) => {
    let data = {
      id: id,
      title: title,
      content: content
    }
    let args = Object.assign({}, data)
    factory.editsection(args).then(result => {
      api.editsection(result).then(result => {
        vm.phienhoatdong=vm.phienhoatdong.splice(id)
        init()
      })
    })
  }
  vm.listquestion=()=>{
    api.listquestion().then(result=>{
      vm.sumques=result.listQuestion.length
      vm.listquestion=result.listQuestion
    })
  }
 
  init()
  $scope.$watch(updateFilteredItems)

  function updateFilteredItems() {

    var begin = (($scope.currentPage - 1) * $scope.numPerPage),
      end = begin + $scope.numPerPage;

    $scope.datas = $scope.result.slice(begin, end);
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