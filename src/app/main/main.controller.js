(function() {
  'use strict';

  angular
    .module('studentsManagementApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($resource) {
    var vm = this;

    function init(){
      vm.klassList = [];
      loadAllKlasses();
      
    }
   
    function loadAllKlasses(){
      var resourceObj = $resource('http://pure-retreat-73401.herokuapp.com/api/v1/klasses.json',{
        access_token:'TLVMLZCHEBSBAVTQJDV5LVTB7E8S74Q4'
      });
      vm.klassResp = resourceObj.get();
    }
     vm.showSections = function(klassId){
      vm.sectionResp=null;
      vm.studentResp=null;
      vm.studentDetailResp=null;
      vm.currentClassId = klassId;
      var resourceObj = $resource('http://pure-retreat-73401.herokuapp.com/api/v1/klasses/'+klassId+'/sections.json',{
        access_token:'TLVMLZCHEBSBAVTQJDV5LVTB7E8S74Q4'
      });
      vm.sectionResp = resourceObj.get();
     }

     vm.showStudents = function(sectionId){
      vm.studentResp=null;
      vm.studentDetailResp=null;
      vm.currentSectionId = sectionId;
      var resourceObj = $resource('http://pure-retreat-73401.herokuapp.com/api/v1/klasses/'+vm.currentClassId+'/sections/'+sectionId+'/students.json',{
        access_token:'TLVMLZCHEBSBAVTQJDV5LVTB7E8S74Q4'
      });
      vm.studentResp = resourceObj.get();
     }

     vm.showStudentDetails = function(studentId){
      vm.currentStudentId = studentId;
      var resourceObj = $resource('http://pure-retreat-73401.herokuapp.com/api/v1/klasses/'+vm.currentClassId+'/sections/'+vm.currentSectionId+'/students/'+studentId,{
        access_token:'TLVMLZCHEBSBAVTQJDV5LVTB7E8S74Q4'
      });
      vm.studentDetailResp = resourceObj.get();
      console.log(vm.studentDetailResp);
     }

     vm.addKlass = function(){
      console.log("Add Klass called");
      var resourceObj = $resource('http://pure-retreat-73401.herokuapp.com/api/v1/klasses.json',{
        access_token:'TLVMLZCHEBSBAVTQJDV5LVTB7E8S74Q4'
      });
      var resp = resourceObj.save({name:vm.newKlassName});
      resp.$promise.then(function(resData){
        console.log('Klass added');
        console.log(resData);
        vm.klassResp = resourceObj.get();
      },function(){
        console.log('Unable to add Class');
      })
     }

     vm.deleteKlass = function(klassObj){
      var resourceObj = $resource('http://pure-retreat-73401.herokuapp.com/api/v1/klasses/'+klassObj.id,{
        access_token:'TLVMLZCHEBSBAVTQJDV5LVTB7E8S74Q4'
      });
      var resp = resourceObj.delete({name:klassObj.name});
      resp.$promise.then(function(resData){
        console.log('Klass deleted');
        console.log(resData);
        loadAllKlasses();
      },function(){
        console.log('Unable to delete Class');
      })
     }

     vm.addSection = function(){
      var resourceObj = $resource('http://pure-retreat-73401.herokuapp.com/api/v1/klasses/'+vm.currentClassId+'/sections.json',{
        access_token:'TLVMLZCHEBSBAVTQJDV5LVTB7E8S74Q4'
      });
      var resp = resourceObj.save({name:vm.newSectionName});
      resp.$promise.then(function(resData){
            console.log('Section added');
            console.log(resData);
            vm.sectionResp = resourceObj.get();
          },function(){
            console.log('Unable to add Section');
          });   
     }

     vm.addStudent = function(){
      var resourceObj = $resource()
     }


    init();
  }
})();
