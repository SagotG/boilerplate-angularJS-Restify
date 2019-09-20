
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';

export const AppModule = angular
  .module('drum-kit', [
    uiRouter,
    ComponentsModule,
  ])
  .component('app', AppComponent)
  .config($locationProvider => {
    'ngInject';
    $locationProvider.html5Mode({ enabled: true, requireBase: false });
  })
  .config(($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) => {
    'ngInject';
    $urlMatcherFactoryProvider.strictMode(false);
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('app', {
      abstract: true,
      resolvePolicy: {
        async: 'NOWAIT',
        when: 'EAGER',
      },
    });
  })
  .name;
