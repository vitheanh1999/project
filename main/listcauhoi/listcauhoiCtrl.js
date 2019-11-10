app.controller("listcauhoiCtrl",function(api,$scope,factory,$stateParams){
    var vm=this
    vm.listquestion=[]
    vm.id=$stateParams.listsectionId
    $scope.searchclick = function () {

        if ($scope.count % 2 != 0) {
          $scope.a = "active"
        }
        else {
          $scope.a = ""
        }
      }
      vm.taocauhoi=()=>{
        factory.taocauhoi().then(result=>{
          api.createquestion({content:result,id:vm.id}).then(result=>{
            vm.listquestion.push(result)
            vm.init()
          })
        })
      }
      vm.delete=(id)=>{
        factory.confirmdelete().then(result=>{
          if(result.value=true){
            api.deletequestion({id:id}).then(result=>{
              $scope.listquestion=result.listQuestion.splice(id,1)
              vm.init()
            })
          }

        })

      }
      vm.edit=(content,id)=>{
        let data={
          content:content
        }
        let args=Object.assign({},data)
          factory.editquestion(args).then(result=>{
            let data={
              idQuestion:id,
              content:result.content
            }
            api.editquestion(data).then(result=>{
              vm.init()
            })
          })
      }
      vm.init=()=>{
        api.viewsec({id:vm.id}).then(result=>{
          vm.listquestion=result.q.reverse()
        })
      }

      vm.taokhaosat=()=>{
        factory.taokhaosat().then(result=>{

        })
      }

})