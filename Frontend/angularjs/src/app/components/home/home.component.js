export const HomeComponent = {
  bindings: { props: "=" },
  templateUrl: function($element, $attrs, $log) {
    if ($attrs.useTemplate) {
      return $attrs.useTemplate;
    }
    return "../../../src/app/views/index.html";
  },
  controller: ($scope, $location) => {
  
    $scope.redirect = function(url, refresh) {
      $location.path(url);
      setTimeout(() => {
        $scope.$apply();
      }, 200);
    };
  }
};
