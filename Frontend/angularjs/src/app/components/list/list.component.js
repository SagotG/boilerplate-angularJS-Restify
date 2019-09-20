const API_ENDPOINT = process.env.API_ENDPOINT;
export const ListComponent = {
  bindings: { name: "<" },
  controller: ($http, $scope, $location) => {
    let lists = [];
    $scope.tasks = [];
    getTasks();

    function getTasks() {
      $http
        .get(API_ENDPOINT + "/todos")
        .then(response => {
          console.log(response.data);
          response.data.forEach(data => {
            lists.push({
              id: data._id,
              task: data.task,
              status: data.status
            });
          });
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          $scope.tasks = lists;
        });

      $scope.redirect = function(url, refresh) {
        $location.path(url);
        setTimeout(() => {
          $scope.$apply();
        }, 200);
      };
    }
    $scope.toDelete = function(id) {
      console.log(id);
      $http
        .delete(API_ENDPOINT + `/todos/${id}`)
        .then(response => {
          if (response.status === 204) {
            window.location.reload();
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    $scope.update = function(id) {
      $location.path("/task").search({ id: id });
      setTimeout(() => {
        $scope.$apply();
      }, 200);
    };
  },
  templateUrl: function($element, $attrs, $log) {
    if ($attrs.useTemplate) {
      return $attrs.useTemplate;
    }
    return "../../../src/app/views/list.html";
  }
};
