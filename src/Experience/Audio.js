import * as THREE from "three";
import Experience from "./Experience";

export default class Audio {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setAudio();
  }

  setAudio() {
    this.listener = new THREE.AudioListener();

    this.scene.add(this.listener);

    this.sound = new THREE.Audio(this.listener);
    this.audioLoader = new THREE.AudioLoader();

    window.onload = () => {
      let context = new AudioContext();
      context.resume();
    };

    this.audioLoader.load("audio/ikson-christmas.ogg", (buffer) => {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(true);
      this.sound.setVolume(1);
      this.sound.play();
    });
  }
}
