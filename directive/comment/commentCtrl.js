app.controller("commentCtrl", function ($scope, $timeout, $stateParams, api) {
  var vm = this;
  vm.comment = {};
  console.log(vm.comment)
  vm.comments = [];
  vm.id = $stateParams.cauhoiId
  $scope.checklike=true
  // vm.nolike=function(){
  //   $scope.checklike=false
  //   vm.count_like++
  // }
  // vm.like=function(){
  //     $scope.checklike=true
  //     vm.count_like--

  // }

  api.viewquestion({id:vm.id}).then(result => {
    vm.comments = result.a
    // vm.count_like=result.q.count_like
    vm.start = () => {
      vm.datas = vm.comments
      // vm.count_like=result.q.count_like
    }
    // Fires when form is submited.
    vm.addComment = function () {
      api.createanswer({
        id:vm.id,
        content: vm.comment.text,
      }).then(result => {
        console.log(result.a[result.a.length-1])
        vm.datas.push(result.a[result.a.length-1])
      })
      // Add current date to the comment.
      // vm.comment.date = Date.now();
      // vm.datas.push(vm.comment.date);
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