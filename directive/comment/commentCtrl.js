app.controller("commentCtrl", function ($scope, $timeout, $stateParams, api,factory) {
  var vm = this;
  vm.comment = {};
  console.log(vm.comment)
  vm.comments = [];
  vm.id = $stateParams.cauhoiId
  $scope.checklike=true

vm.init=()=>{
  api.viewquestion({id:vm.id}).then(result => {
    vm.content=result.Q[0]
    vm.datas= result.listA
  })
}
 
    vm.addComment = function () {
      api.createanswer({
        id:vm.id,
        content: vm.comment.text,
      }).then(result => {
        console.log(result.a[result.a.length-1])
        vm.datas.push(result.a[result.a.length-1])
      })
 
      vm.comment = {};
      console.log(vm.datas)
    }
    vm.edit=(ct,id)=>{
      let data1 = {
        content: ct
      }
      let args = Object.assign({}, data1)
      factory.editquestion(args).then(result=>{
        let data = {
          id: id,
          content: result.content
        }
        api.editanswer(data).then(result=>{
        vm.init()
        })
      })
    }
    vm.delete=(id)=>{
      factory.confirmdelete().then(result => {
        if (result.value == true) {
          api.deleteanswer({ id: id }).then(result => {
           vm.init()
          })
        }
  
      })
    }

})