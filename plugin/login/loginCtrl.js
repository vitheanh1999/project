app.controller("loginCtrl",function($scope,$state,$http,api,factory){
    $scope.user={}
    // $http.get('profile.json').then(function(response){
    //     $scope.users=response.data
    // }).then(response=>{
    //     $scope.login=()=>{
    //         let data={
    //             email:$scope.username,
    //             pass:$scope.password
    //         }
    //         let temp={}
    //         console.log(data.email)
    //         temp.check=$scope.users.find(u => u.email == data.email && u.pass == data.pass)
    //         console.log(temp.check)
    //         if(temp.check){
    //             $state.go("root.trangchu")
    //         }
    //     }
    // })
    $scope.login=()=>{
                let data={
                    username:$scope.username,
                    password:$scope.password
                }
                api.login({data}).then(result=>{
                    let temp={}
                   if(result.success===true){
                    factory.showLoading(result.content)
                    console.log(result)
                    // localStorage.setItem("info",JSON.stringify(result.content))
                    localStorage.setItem("token",result.token)
                    // factory.showSuccess(result.content.message)
                    $state.go("root.trangchu")
                   }
                   else if(result.success===false){
                    factory.showError(result.content)
                   }
  
                })
            }
})