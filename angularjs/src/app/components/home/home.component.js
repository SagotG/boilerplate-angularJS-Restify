export const HomeComponent = {
  bindings: { props: "=" },
  controller: ($scope,$element,$timeout) => {
    $scope.$watch('inner', (newVal='') => $timeout( () => {
      alert();
    }));
  },
  template: `inner: <input ng-model="inner">`
};

// template: `
//   <section content="$ctrl.props.title">
//     <div class="keys">
//       <button data-key="sdcsd65" class="key" onclick="alert()" />
//         <kbd>A</kbd>
//       <h1>{{count}}</h1>
//       </button>
//     </div>
//   </section>
//   <script>
//   function callAlert() {
//     alert()
//   }
//   </script>`,
  
// controller: class HomeComponent {
//   constructor($state) {
//     'ngInject';
//     this.routes = $state.get().filter((item) => {
//       return !item.abstract && item.url;
//     });
//     ($scope, $element) => {
//       $scope.alert = 1;
//     }
//   }
// },