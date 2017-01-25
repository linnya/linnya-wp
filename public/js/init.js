  (function() {
    'use strict';

  window.linnya = {

    init: function (config) {

      var div = document.createElement("linnya");
      div.setAttribute("accid", config.accid);
      document.body.appendChild(div);

      var checkAngular = setInterval(function() {
        if(window.angular && window.firebase){
          clearInterval(checkAngular);
          loadAngularLibrarys();
        }
      }, 100);

      }
    };

    function loadAngularLibrarys (){
      setTimeout(function() {
        createModule();
        bootstrap()
      }, 1000);
    }

    function createModule (){
      angular
        // .module('linnyaChat', ["firebase", 'ngFileUpload', 'ngSanitize'])
        .module('linnyaChat', ["firebase", 'editable', 'scroll', 'angular-svg-round-progressbar', 'ngSanitize', 'linnyaMsgs', 'directives', 'controllers'])
        .config(chatConfig);
        
      console.log('Create Module');

    };

    function chatConfig($sceDelegateProvider) {
      $sceDelegateProvider.resourceUrlWhitelist(['self','http://*.linnya.com/**']);
    };

    chatConfig.$inject = ['$sceDelegateProvider'];

    function bootstrap() {
      // Initialize Angular
      angular.element(document).ready(function() {
        var domElement = document.getElementsByTagName("linnya");
        angular.bootstrap(domElement, ["linnyaChat"]);
      });
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyBWRQNO4iBKBxBCJySq4BWd15weM_pU9ks",
        authDomain: "linnya.firebaseapp.com",
        databaseURL: "https://linnya.firebaseio.com",
        storageBucket: "project-5810392278591381337.appspot.com",
      };
      firebase.initializeApp(config);
      console.log('bootstrap');
    };
})();
