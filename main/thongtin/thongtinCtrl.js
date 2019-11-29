app.controller("thongtinCtrl", function (api, user, factory,$state) {
    var vm = this
    // vm.infouser=user.getinfo()
    // vm.name=vm.infouser.name
    vm.init = () => {

        api.myauth().then(result=>{
            vm.listQ=result.listQ
            vm.lengthlist=result.listQ.length
            vm.lengthsur=result.listS.length
            vm.listS=result.listS
            vm.info=result.A[0]
        })
        vm.chucvu=()=>{
            return  user.checkrole()
        }
        vm.user = user.getinfouser()
        if (user.checkrole() == 1) {
            vm.admin = () => {
                return true
            }
        }
        else {
            vm.admin = () => {
                return false
            }
        }


    }
    vm.editpassword = (id) => {
        factory.editpassword().then(result => {
            api.editpassword({ id: id, oldpassword:result.oldpassword,password:result.password,confirmpassword:result.confirmpassword}).then(result => {
                factory.showSuccess(result.content)
                user.logout()
                $state.go('login')
            })
        })
    }
    vm.edit = () => {
        factory.editquestion().then(result => {

        })
    }
    vm.delete = () => {
        factory.confirmdelete().then(result => {

        })
    }
})