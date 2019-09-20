import angular from 'angular';
import { HomeModule } from './home/home.module';
import { DrumModule } from './drum/drum.module';
import { TaskModule } from './task/task.module';
import { ListModule } from './list/list.module';
export const ComponentsModule = angular
  .module('drum-kit.components', [
    HomeModule,
    DrumModule,
    TaskModule,
    ListModule
  ])
  .name;
