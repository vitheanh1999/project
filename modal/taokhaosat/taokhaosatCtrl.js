app.controller("taokhaosatCtrl", function ($scope, api,$stateParams,$state) {
  var vm = this
  vm.answer = {}

  $scope.options = [{
    title: 1,
    question: vm.question,
    data: [
      {
        answer: [
          {
            id: 1,
            title: "Câu 1",
            content: vm.content
          },
        ]
      }
    ],
    style: [
      {
        content: "Nhiều đáp án",
        check: "1",
      },
      {
        content: "1 đáp án",
        check: "2",
      },
      {
        content:"Text",
        check:"3"
      }
    ]
  }];
  $scope.options = [{
    title: 1,
    question: vm.question,
    data: [
      {

        answer: [
          {
            id: 1,
            title: "Câu 1",
            content: vm.content
          },
        ],
        answer1: [
          {
            id: 1,
            title: "Câu 1",
            content: vm.content
          },
        ],
      }
    ],
    style: [
      {
        content: "Nhiều đáp án",
        check: "1",
      },
      {
        content: "1 đáp án",
        check: "2",
      },
      {
        content:"Text",
        check:"3"
      }
    ]
  }];
  vm.addanswer = () => {
    vm.arr = $scope.options[$scope.options.length - 1].data[$scope.options[$scope.options.length - 1].data.length - 1].answer
    vm.id = vm.arr.length + 1
    vm.arr.push({
      id: vm.id,
      title: "Câu " + vm.id,
      content: vm.content
    })
    console.log($scope.options[$scope.options.length - 1].data[$scope.options[$scope.options.length - 1].data.length - 1].answer[$scope.options[$scope.options.length - 1].data[$scope.options[$scope.options.length - 1].data.length - 1].answer.length - 1].title)

  }
  vm.addanswer1 = () => {

    vm.arr = $scope.options[$scope.options.length - 1].data[$scope.options[$scope.options.length - 1].data.length - 1].answer1
    vm.id = vm.arr.length + 1
    vm.arr.push({
      id: vm.id,
      title: "Câu " + vm.id,
      content: vm.content
    })
 

  }

  vm.deleteanswer = (id) => {
    vm.arr = $scope.options[$scope.options.length - 1].data[$scope.options[$scope.options.length - 1].data.length - 1].answer
    vm.arr.splice(vm.arr.length - 1, 1)
  }
  vm.deleteanswer1 = (id) => {
    vm.arr = $scope.options[$scope.options.length - 1].data[$scope.options[$scope.options.length - 1].data.length - 1].answer1
    vm.arr.splice(vm.arr.length - 1, 1)
  }

vm.checkshow=(index)=>{
  console.log(index)
  if(index==$scope.options.length-1){
    return true
  }
  else return false
}
  vm.addquestion = () => {
    $scope.options.push({
      title: $scope.options.length + 1,
      question: vm.question,
      style: [
        {
          content: "Nhiều đáp án",
          check: "1",
        },
        {
          content: "1 đáp án",
          check: "2",
        },
        {
          content:"Text",
          check:"3",
        }
      ],
      data: [
        {
          answer: [
            {
              id: 1,
              title: "Câu 1",
              content: vm.content
            },
          ],
          answer1: [
            {
              id: 1,
              title: "Câu 1",
              content: vm.content
            },
          ]
        }
      ],
    })
  }

  vm.checkinput=()=>{
    
  }
  vm.deletequestion = (index) => {
    vm.arr = $scope.options
    vm.arr.splice(vm.arr.length - 1, 1)
  }
  vm.data = {

    id: $stateParams.surveyId,
    title: vm.titlekhaosat,
    description: vm.deskhaosat,
    content: $scope.options
  }
  vm.s = {}

  vm.createkhaosat = (data) => {
    data.content.forEach(element => {
      delete element.title
      if (element.style == 1) {
        element.style=1
        console.log(element.style)
        delete element.data[0].answer1
        delete element.data[0].answer2
        delete element.data[0].question
      }
      else if (element.style == 2) {
        element.style=2
        delete element.data[0].answer
        delete element.data[0].answer2
        delete element.data[0].question
      }
      else if (element.style==3){
        element.style=3
        delete element.data

      }

    });

    vm.title = data.title
    vm.description = data.description
    vm.cauhoi = []
    vm.cauhoi = data.content
    vm.checkstyle = (type) => {
      if (type == 1) {
        return 1
      }
      if(type==2){
        return 2
      }
      if(type==3){
        return 3
      }
    }
  }
  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  }

  
vm.id=$stateParams.surveyId
  vm.save = (data) => {
    console.log(data)
    api.createsurvey(data).then(result => {
      console.log(data)
      $state.go('root.listcauhoi', {listsectionId: vm.id});
    })
    // let data = Object.assign({}, vm.newquestion)
  }
})