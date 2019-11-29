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
  api.viewquestion({id:vm.id}).then(result=>{
    vm.open=result.section.open
  })
}
  vm.checkuser=(iduser)=>{
    vm.iduser=JSON.parse(localStorage.getItem('infouser')).id
    if(iduser==vm.iduser){
      return 1
    }
    else return 0
  }
    vm.addComment = function () {
      api.createanswer({
        id:vm.id,
        content: vm.comment.text,
      }).then(result => {
        if(result.success==false){
          factory.showError(result.content)
        }
        else{
          console.log(result.a[result.a.length-1])
          vm.datas.push(result.a[result.a.length-1])
          vm.init()
        }
       
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
            vm.datas=vm.datas.splice(id,1)
           vm.init()
          })
        }
  
      })
    }

})