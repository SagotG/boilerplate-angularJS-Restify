import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { TaskComponent } from './task.component';

export const TaskModule = angular
  .module('task', [ uiRouter ])
  .component('task', TaskComponent)
  .config($stateProvider => {
    'ngInject';
    $stateProvider
      .state('Tasks', {
        parent: 'app',
        url: '/task',
        views: { '@': 'task' },
      });
  })
  .name;
