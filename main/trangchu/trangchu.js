app.controller("trangchu", function ( api,$scope, $http, factory, config,filterFilter) {
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

   function init() {
      api.question().then(result =>{
            $scope.result = result
            // $scope.totalItems=result.length
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