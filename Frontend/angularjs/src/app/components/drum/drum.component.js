const s81 = "../../../src/assets/sounds/boom.wav";
const s83 = "../../../src/assets/sounds/clap.wav"
const s68 = "../../../src/assets/sounds/hihat.wav"
const s70 = "../../../src/assets/sounds/kick.wav"
const s71 = "../../../src/assets/sounds/openhat.wav"
const s72 = "../../../src/assets/sounds/ride.wav"
const s74 = "../../../src/assets/sounds/snare.wav"
const s75 = "../../../src/assets/sounds/tink.wav"
const s76 = "../../../src/assets/sounds/tom.wav" 

export const DrumComponent = {
  bindings: { props: "=" },
  controller: ($scope) => {

    $scope.dataKeys = [
      {input: 'Q', key: 81, playing: false, sound: s81, name: "boom"},
      {input: 'S', key: 83, playing: false, sound: s83, name: "clap"},
      {input: 'D', key: 68, playing: false, sound: s68, name: "hihat"},
      {input: 'F', key: 70, playing: false, sound: s70, name: "kick"},
      {input: 'G', key: 71, playing: false, sound: s71, name: "openhat"},
      {input: 'H', key: 72, playing: false, sound: s72, name: "ride"},
      {input: 'J', key: 74, playing: false, sound: s74, name: "snare"},
      {input: 'K', key: 75, playing: false, sound: s75, name: "tink"},
      {input: 'L', key: 76, playing: false, sound: s76, name: "tom"}
    ];

    function updateInput(id) {
      $scope.dataKeys[id].playing = true;
      setTimeout(() => {
        $scope.$apply(() => {
          $scope.dataKeys[id].playing = false;
        });
      }, 100);
    }

    var playSound = function(file){
      var audioElement = document.createElement('audio');
      audioElement.setAttribute('src', file);
      audioElement.play();
    }

    angular.element(window).bind("keydown", keydown);
    function keydown(e) {
      $scope.eventKeydown = e.keyCode;
      switch($scope.eventKeydown) {
        case 81:
          playSound(s81, 81);
          updateInput(0);
          break;
        case 83:
          playSound(s83);
          updateInput(1);
          break;
        case 68:
          playSound(s68);
          updateInput(2);
          break;
        case 70:
          playSound(s70);
          updateInput(3);
          break;
        case 71:
          playSound(s71);
          updateInput(4);
          break;
        case 72:
          playSound(s72);
          updateInput(5);
          break;
        case 74:
          playSound(s74);
          updateInput(6);
          break;
        case 75:
          playSound(s75);
          updateInput(7);
          break;
        case 76:
          playSound(s76);
          updateInput(8);
          break;
        default:
          break;
        }
      $scope.$apply();
    }
  },
  template: `
      <div class="keys" ng-click="processForm($event)">
        <div class="key" ng-class="{'playing' : x.playing === true }" id={{x.key}} data-key={{x.key}} ng-repeat="x in dataKeys">
          <kbd>{{x.input}}</kbd>
          <span class="sound">{{x.name}}</span>
        </div>
      </div>`
};
