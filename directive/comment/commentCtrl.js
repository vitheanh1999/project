app.controller("commentCtrl", function ($scope, $timeout, $stateParams, api) {
  var vm = this;
  // Current comment.
  vm.comment = {};
  console.log(vm.comment)
  // Array where comments will be.
  vm.comments = [];
  vm.id = $stateParams.contactId

  api.viewquestion({ id: vm.id }).then(result => {
    vm.comments = result.a
    vm.start = () => {
      vm.datas = vm.comments
    }
    // Fires when form is submited.
    vm.addComment = function () {
      // vm.evaluateChange=function(obj,$event){
      //   var currentElement = $event.target;
      //   console.log(currentElement.value);
      // }
      api.creareanwer({
        content: vm.comment.text,
        idQuestion: vm.id
      }).then(result => {
        vm.datas.push(result[result.length-1])
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