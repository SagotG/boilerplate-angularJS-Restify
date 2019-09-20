import React, { Component } from "react";
import Sound from "react-sound";
import "../../assets/css/key.css";

const s83 = "~/src/assets/sounds/clap.wav";
const s81 = "~/src/assets/sounds/boom.wav";
const s68 = "~/src/assets/sounds/hihat.wav";
const s70 = "~/src/assets/sounds/kick.wav";
const s71 = "~/src/assets/sounds/openhat.wav";
const s72 = "~/src/assets/sounds/ride.wav";
const s74 = "~/src/assets/sounds/snare.wav";
const s75 = "~/src/assets/sounds/tink.wav";
const s76 = "~/src/assets/sounds/tom.wav";

const dataKeys = [
  { input: "Q", key: 81, playing: false, sound: s81, name: "boom" },
  { input: "S", key: 83, playing: false, sound: s83, name: "clap" },
  { input: "D", key: 68, playing: false, sound: s68, name: "hihat" },
  { input: "F", key: 70, playing: false, sound: s70, name: "kick" },
  { input: "G", key: 71, playing: false, sound: s71, name: "openhat" },
  { input: "H", key: 72, playing: false, sound: s72, name: "ride" },
  { input: "J", key: 74, playing: false, sound: s74, name: "snare" },
  { input: "K", key: 75, playing: false, sound: s75, name: "tink" },
  { input: "L", key: 76, playing: false, sound: s76, name: "tom" }
];

class DrumComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener("keydown", this._handleKeyDown);
  }

  updateInput = id => {
    dataKeys[id].playing = true;
    setTimeout(() => {
      dataKeys[id].playing = false;
    }, 100);
  };

  playSound(file, input) {
    let audio = new Audio(file);
    console.log(file, input);
    return <audio src={file} autoPlay />;
  }

  _handleKeyDown = event => {
    switch (event.keyCode) {
      case 81:
        this.playSound(s81, 81);
        this.updateInput(0);
        break;
      case 83:
        this.playSound(s83);
        this.updateInput(1);
        break;
      case 68:
        this.playSound(s68);
        this.updateInput(2);
        break;
      case 70:
        this.playSound(s70);
        this.updateInput(3);
        break;
      case 71:
        this.playSound(s71);
        this.updateInput(4);
        break;
      case 72:
        this.playSound(s72);
        this.updateInput(5);
        break;
      case 74:
        this.playSound(s74);
        this.updateInput(6);
        break;
      case 75:
        this.playSound(s75);
        this.updateInput(7);
        break;
      case 76:
        this.playSound(s76);
        this.updateInput(8);
        break;
      default:
        break;
    }
  };

  render() {
    const drum = dataKeys.map(x => (
      <div
        key={x.key}
        className={x.playing ? "key playing" : "key"}
        id={x.key}
        data-key={x.key}
      >
        <kbd>{x.input}</kbd>
        <span className="sound">{x.name}</span>
      </div>
    ));
    return (
      <>
        <h1>Drum</h1>
        <Sound
          url={s83}
          playStatus={Sound.status.PLAYING}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
        />
        <div className="keys">{drum}</div>
      </>
    );
  }
}

export default DrumComponent;
