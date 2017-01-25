(function() {
    'use strict';

 angular
    .module('directives', [])
      .directive('linnya', chatDirective);

  function chatDirective($templateRequest, $compile) {
      console.log('load directive');

      var directive = {
        link: link,
        restrict: 'E',
        controller: 'chatCtrl',
        controllerAs: 'vm',
        transclude: true,
        scope: {
          accid: '@'
        }
      };
      return directive;

      function link(scope, element, attrs) {
        $templateRequest("http://client.linnya.com/template/v1.html").then(function(html){
          var template = angular.element(html);
          element.append(template);
          $compile(template)(scope);
        });
      }
  }

  chatDirective.$inject = ['$templateRequest', '$compile'];

})();