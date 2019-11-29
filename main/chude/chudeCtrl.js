app.controller("chudeCtrl",function($stateParams,api,$scope,factory){
    var vm=this
    vm.chude=$stateParams.chudeId
    vm.listsection=()=>{
      api.listsection({topic_id:vm.chude}).then(result=>{
        vm.datas=result.sec
        if(result.sec.length>0){
          vm.topic=result.sec[0].topic
          vm.checktopicnull=()=>{
              return 1
          }
        }
        else {
          factory.showError("Chưa có phiên nào")
          vm.checktopicnull=()=>{
            return 0
          }
        }
        
    })
    }
  
    vm.init=()=> {
      api.listsection().then(result => {
        vm.countuser=result.countUser
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
})