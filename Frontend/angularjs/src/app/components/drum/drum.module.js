import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { DrumComponent } from './drum.component';

export const DrumModule = angular
  .module('drum', [ uiRouter ])
  .component('drum', DrumComponent)
  .config($stateProvider => {
    'ngInject';
    $stateProvider
      .state('Drum', {
        parent: 'app',
        url: '/drum',
        views: { '@': 'drum' },
      });
  })
  .name;
