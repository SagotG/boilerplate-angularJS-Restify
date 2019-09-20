import ServiceWorker from "../../serviceWorker/serviceWorker";
import { $q } from "@uirouter/core";
import axios from "axios";

const API_ENDPOINT = process.env.API_ENDPOINT;

export const TaskComponent = {
  bindings: { props: "=" },
  controller: ($scope, $timeout, $location, $http) => {
    $scope.task = '';
    $scope.status = '';
    $scope.edit = false;
    $scope.isCreate = false;

    var paramValue = $location.search().id;

    if (paramValue!== '') {
      $scope.edit = true;
      $http.get(API_ENDPOINT + `/todos/${paramValue}`).then(response => {
        console.log(response.data)
        $scope.task = response.data.task;
        $scope.status = response.data.status;
        $scope.$apply();
      });

    }
      $scope.$watch(("task", "status"), () =>
        $timeout(() => {
          console.log($scope.task + "\n" + $scope.status);
        })
      );
      $scope.submitForm = function() {
        if ($scope.task === "" || $scope.status === "") {
          alert("Fileds are empty");
          return;
        }
        $q.when(
          axios.post(API_ENDPOINT + "/todos", {
            task: $scope.task,
            status: $scope.status
          })
        )
          .then(response => {
            if (response.status === 201) {
              $scope.isCreate = true;
              $scope.task = "";
              $scope.status = "";
              $scope.$apply();
              setTimeout(() => {
                $scope.isCreate = false;
                $scope.$apply();
              }, 3000);
            }
            console.log(response);
          })
          .catch(err => {
            console.log(err);
          });
      };
    
    $scope.redirect = function(url, refresh) {
      // $location.search('id', null)
      setTimeout(() => {
        $location.path(url);
        $scope.$apply();
      }, 200);
    };
  },
  templateUrl: function($element, $attrs, $log) {
    if ($attrs.useTemplate) {
      return $attrs.useTemplate;
    }
    return "../../../src/app/views/task.create.html";
  }
};
