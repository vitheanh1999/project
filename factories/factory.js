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
    methods.newquestion=function(){
        var defer = $q.defer();
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
              templateUrl: "modal/newquestion/newquestion.html",
              controller: "newquestion",
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
    return methods
}])