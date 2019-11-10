app.controller("trangchu", function ( api,$scope, $http, factory, config,filterFilter,$rootScope) {

    console.log($rootScope.search)
    var vm = this
    api.question().then(result => {
        console.log(result)
        // $scope.a=result.id
    })
    // vm.datas=[]
    // $scope.currentPage = 1;
    // $scope.itemsPerPage = 6

    // $scope.pageChanged = function() {
    //   $log.log('Page changed to: ' + $scope.currentPage);
    // };
    // let args=''
    // vm.start=()=>{
    //     api.question().then(result=>{
    //         vm.datas=result
    //         $scope.totalItems = (result.length/6)*10;

    //     })
    // }
    // init = () => {
    //     vm.start()
    // }
    // init(); 

    $scope.result = [];
    $scope.datas = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 6;
    $scope.maxSize = 5;
    $scope.topic=[]
   function init() {
      api.listsection().then(result =>{
            $scope.result = result.Sections.reverse()
            localStorage.setItem("infophien",JSON.stringify($scope.result))
            console.log($scope.result)
        console.log(result)
        })
        api.listtopic().then(result=>{
            $scope.topic=result.list.reserver()
           
        })
    }
    vm.delete=(id)=>{
        factory.confirmdelete().then(result=>{
          if(result.value==true){
            api.deletesection({id:id}).then(result=>{
              $scope.result=result.listSec.splice(id,1)
              init()
            })
          }

        })

      }
      vm.edit=(id,title,content)=>{
        let data={
          id:id,
          title:title,
          content:content
        }
        let args=Object.assign({},data)
          factory.editsection(args).then(result=>{
            api.editsection(result).then(result=>{
              init()
            })
          })
      }
    init()
    $scope.$watch(updateFilteredItems)

    function updateFilteredItems() {

        var begin = (($scope.currentPage - 1) * $scope.numPerPage),
            end = begin + $scope.numPerPage;

        $scope.datas = $scope.result.slice(begin, end);
    }
})
app.filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});