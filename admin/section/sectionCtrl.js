app.controller("sectionCtrl",function(api,factory,user){
        var vm=this
        vm.init=()=>{
            api.listall().then(result=>{
                vm.answers=result.listAnw
                vm.listQ=result.listQ
                vm.listS=result.listS
                vm.listSurvey=result.listSur
            })
        }
        vm.deletequestion = (id) => {
          factory.confirmdelete().then(result => {
            if (result.value = true) {
              api.deletequestion({ id: id }).then(result => {
                vm.init()
              })
            }
      
          })
      
        }
        vm.deleteanswer=(id)=>{
          factory.confirmdelete().then(result => {
            if (result.value == true) {
              api.deleteanswer({ id: id }).then(result => {
               vm.init()
              })
            }
      
          })
        }
        
        vm.deletesec = (id) => {
            factory.confirmdelete().then(result => {
              if (result.value == 1) {
                api.deletesection({ id: id }).then(result => {
                  vm.init()
                })
              }
        
            })
          }
          
          vm.closesec=(id)=>{
            factory.confirm().then(result=>{
              if(result.value==0){
                api.closesec({id:id}).then(result=>{
                  vm.init()
                })
              }
            })
          }
          vm.opensec=(id)=>{
            factory.confirm().then(result=>{
              if(result.value==0){
                api.opensec({id:id}).then(result=>{
                  vm.init()
                })
              }
            })
          }

          vm.deletesur = (id) => {
            factory.confirmdelete().then(result => {
              if (result.value == 1) {
                api.deletesurvey({ id: id }).then(result => {
                  vm.init()
                })
              }
            })
          }
          vm.closesur=(id)=>{
            factory.confirm().then(result=>{
              if(result.value==0){
                api.closesurvey({id:id}).then(result=>{
                  vm.init()
                })
              }
            })
          }
          vm.opensur=(id)=>{
            factory.confirm().then(result=>{
              if(result.value==0){
                api.opensurvey({id:id}).then(result=>{
                  vm.init()
                })
              }
            })
          }
})