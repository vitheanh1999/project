app.controller("commentCtrl", function ($scope, $timeout, $stateParams, api) {
  var vm = this;
  vm.comment = {};
  console.log(vm.comment)
  vm.comments = [];
  vm.id = $stateParams.cauhoiId
  $scope.checklike=true


  api.viewquestion({id:vm.id}).then(result => {
    vm.content=result.Q[0]
    vm.comments = result.listA

    vm.start = () => {
      vm.datas = vm.comments
     
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

      // Reset clases of the form after submit.
      // $scope.form.$setPristine();
      console.log(vm.datas)
    }
    init = () => {
      vm.start()
    }
    init();
  })



})