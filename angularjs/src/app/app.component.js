import '../assets/key.css';

export const AppComponent = {
  template: `
    <main ui-view props="$ctrl.props"></main>
  `,
  controller: class AppComponent {
    constructor() {
      'ngInject';
    }
  },
};
