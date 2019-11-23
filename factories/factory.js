app.factory('factory',['$uibModal', '$q',function($uibModal,$q){
    var methods = {}
    var vm=this

    let options = {
        animation: true,
        size: 'lg'
    }
    vm.setOptions = function() {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-left",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }
            // toastr.info(message); using 1 in 5
            // toastr.info()
            // toastr.success()
            // toastr.error()
            // toastr.warning()

    };
    vm.setOptions();

    methods.showError = (message) => {
        toastr.error(message)
    };
    methods.showSuccess = (message) => {
        toastr.success(message)
    };
    methods.showWarning = (message) => {
        toastr.warning(message)
    };
    methods.taophien=function(){
        var defer = $q.defer();
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
              templateUrl: "modal/taophien/taophien.html",
              controller: "taophienCtrl",
              controllerAs:'vm',     
              size: 'md',
          });
          modalInstance.result.then(function (data) {
            defer.resolve(data)//da giai quyet
        }, function (dismiss) {
            defer.reject()//tu choi
        })
        return defer.promise
    }
    methods.taocauhoi=function(){
        var defer = $q.defer();
        var modalInstance = $uibModal.open({
            // ariaLabelledBy: 'modal-title',
            // ariaDescribedBy: 'modal-body',
              templateUrl: "modal/taocauhoi/taocauhoi.html",
              controller: "taocauhoiCtrl",
              controllerAs:'vm',     
              size: 'md',
          });
          modalInstance.result.then(function (data) {
            defer.resolve(data)//da giai quyet
        }, function (dismiss) {
            defer.reject()//tu choi 
        })
        return defer.promise
    }
    // methods.taokhaosat=function(){
    //     var defer = $q.defer();
    //     var modalInstance = $uibModal.open({
    //         ariaLabelledBy: 'modal-title',
    //         ariaDescribedBy: 'modal-body',
    //           templateUrl: "modal/taokhaosat/taokhaosat.html",
    //           controller: "taokhaosatCtrl",
    //           controllerAs:'vm',     
    //           size: 'lg',
    //       });
    //       modalInstance.result.then(function (data) {
    //         defer.resolve(data)//da giai quyet
    //     }, function (dismiss) {
    //         defer.reject()//tu choi
    //     })
    //     return defer.promise
    // }
    methods.khaosat=function(args){
        var defer = $q.defer();
    var modalInstance=$uibModal.open({

        templateUrl:"modal/khaosat/khaosat.html",
        controller:"khaosatCtrl",
        controllerAs:"vm",
        size:"lg",
        resolve: {
            args: function() {
                return args;
            }
        }
    })
    modalInstance.result.then(function (data) {
        defer.resolve(data)//da giai quyet
    }, function (dismiss) {
        defer.reject()//tu choi
    })
    return defer.promise
    }
    methods.editsection=function(args){
        var defer = $q.defer();
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
              templateUrl: "modal/editsection/editsection.html",
              controller: "editsectionCtrl",
              controllerAs:'vm',     
              size: 'md',
              resolve: {
                args: function() {
                    return args;
                }
            }
          });
          modalInstance.result.then(function (data) {
            defer.resolve(data)//da giai quyet
        }, function (dismiss) {
            defer.reject()//tu choi
        })
        return defer.promise
    }
    methods.editquestion=function(args){
        var defer = $q.defer();
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
              templateUrl: "modal/editquestion/editquestion.html",
              controller: "editquestionCtrl",
              controllerAs:'vm',     
              size: 'md',
              resolve: {
                args: function() {
                    return args;
                }
            }
          });
          modalInstance.result.then(function (data) {
            defer.resolve(data)//da giai quyet
        }, function (dismiss) {
            defer.reject()//tu choi
        })
        return defer.promise
    }
    methods.confirm = function (title) {
        var defer = $q.defer();
        const toast = swal({
            title: 'You are sure?',
            width: 400,
            padding: '3em',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://sweetalert2.github.io/images/nyan-cat.gif")
              center left
              no-repeat
            `
        }).then(result=>{
            if(result.value){
                defer.resolve({
                    value: 0,
                })
            }
            else {
                defer.resolve({
                    value: 1,
                })
            }
        })
        return defer.promise
    }
    methods.confirmdelete= function(){
        var defer = $q.defer();
        Swal.fire({
            title: 'Bạn có muốn xóa câu hỏi?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có'
          }).then((result) => {
            if (result.value) {
                defer.resolve({
                    value: true,
                })
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
            else{
                defer.resolve({
                    value: false,
                })
            }
          })
          return defer.promise
    }
    methods.closesec=function(){
        var defer=$q.defer()
        Swal.fire({
            title: 'Bạn muốn đóng phiên',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có!'
          }).then((result) => {
            if (result.value) {
                defer.resolve({
                    value:true
                })
              Swal.fire(
                'Đã đóng!',
                'success'
              )
            }
            else{
                defer.resolve({
                    value:false
                })
            }
          })
          return defer.promise
    }
    methods.opensec=function(){
        var defer=$q.defer()
        Swal.fire({
            title: 'Bạn muốn mở phiên',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có!'
          }).then((result) => {
            if (result.value) {
                defer.resolve({
                    value:true
                })
              Swal.fire(
                'Đã đóng!',
                'success'
              )
            }
            else{
                defer.resolve({
                    value:false
                })
            }
          })
          return defer.promise
    }
    methods.showLoading = function(content) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          })
          
          Toast.fire({
            type: 'success',
            title: 'Signed in successfully'
          })
    }
    return methods
}])