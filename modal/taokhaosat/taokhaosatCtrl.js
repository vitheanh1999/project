app.controller("taokhaosatCtrl", function ($scope) {
  var vm = this
  vm.answer = {}

  $scope.options = [{
    title: 1,
    data: [
      {
        question: vm.question,
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
        check: 1,
      },
      {
        content: "1 đáp án",
        check: 2,
      }
    ]
  }];
  $scope.options = [{
    title: 1,
    data: [
      {
        question: vm.question,
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
    style: [
      {
        content: "Nhiều đáp án",
        check: "1",
      },
      {
        content: "1 đáp án",
        check: "2",
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
    console.log($scope.options[$scope.options.length - 1].data[$scope.options[$scope.options.length - 1].data.length - 1].answer[$scope.options[$scope.options.length - 1].data[$scope.options[$scope.options.length - 1].data.length - 1].answer.length - 1].title)

  }
  vm.deleteanswer = (id) => {
    vm.arr = $scope.options[$scope.options.length - 1].data[$scope.options[$scope.options.length - 1].data.length - 1].answer
    vm.arr.splice(vm.arr.length-1, 1)
  }
  vm.deleteanswer1 = (id) => {
    vm.arr = $scope.options[$scope.options.length - 1].data[$scope.options[$scope.options.length - 1].data.length - 1].answer1
    vm.arr.splice(vm.arr.length-1, 1)
  }
  vm.addquestion = () => {
    $scope.options.push({
      title: $scope.options.length + 1,
      style: [
        {
          content: "Nhiều đáp án",
          check: 1,
        },
        {
          content: "1 đáp án",
          check: 2,
        }
      ],
      data: [
        {
          question: vm.question,
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

  vm.deletequestion=(index)=>{
    vm.arr=$scope.options
    vm.arr.splice(vm.arr.length-1,1)
  }
  vm.data = {
    titlekhaosat: vm.titlekhaosat,
    deskhaosat: vm.deskhaosat,
    content: $scope.options
  }
  vm.s={}

  vm.createkhaosat = (data) => {
    data.content.forEach(element => {
      delete element.title
      element.style.splice(0,2)
      if(element.style.check==1){

        delete element.data[0].answer1
        delete element.data[0].question
      }
       else if(element.style.check==2){
        delete element.data[0].answer
        delete element.data[0].question
       }
    });
    console.log(data)

      vm.title=data.titlekhaosat
      vm.deskhaosat=data.deskhaosat
      vm.cauhoi=[]
      vm.cauhoi=data.content
      console.log(vm.cauhoi)
      vm.checkstyle=(type)=>{
        if(type==1){
          return true
        }
        else return false
      }
  }
  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  }
 


  vm.save = () => {
  
    let data = Object.assign({}, vm.newquestion)
    $uibModalInstance.close(data);
  }
})