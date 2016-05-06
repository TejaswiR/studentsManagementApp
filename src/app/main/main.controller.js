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

     function resetAll(){
      // vm.klassResp={};
      vm.sectionResp=null;
      vm.studentResp=null;
      vm.studentDetailResp=null;
     }

    init();
  }
})();
