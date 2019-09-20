import '../assets/key.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/custom.css'
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
