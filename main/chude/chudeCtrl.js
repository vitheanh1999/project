app.controller("chudeCtrl",function($stateParams,api){
    var vm=this
    vm.chude=$stateParams.chudeId
    api.listsection({topic_id:vm.chude}).then(result=>{
        vm.datas=result.sec
        vm.topic=result.sec[0].topic
    })
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
})