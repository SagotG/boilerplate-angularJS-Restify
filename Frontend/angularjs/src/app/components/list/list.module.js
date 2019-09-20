import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { ListComponent } from './list.component';

export const ListModule = angular
  .module('list', [ uiRouter ])
  .component('list', ListComponent)
  .config($stateProvider => {
    'ngInject';
    $stateProvider
      .state('list', {
        parent: 'app',
        url: '/list',
        views: { '@': 'list' },
      });
  })
  .name;
