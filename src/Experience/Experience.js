import * as THREE from "three";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Resources from "./Utils/Resources.js";
import sources from "./sources.js";
import CandleLight from "./CandleLight.js";
import Navigation from "./Navigation.js";

let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }

    instance = this;

    // options
    window.experience = this;
    this.canvas = canvas;

    // setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    // this.candleLight = new CandleLight();
    // this.setNavitation();

    this.sizes.on("resize", () => {
      this.resize();
    });

    // time tick event
    this.time.on("tick", () => {
      this.update();
    });
  }

  // setNavitation() {
  //   this.navigation = new Navigation();
  // }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
    // if (this.navigation) {
    //   this.navigation.update();
    // }
    // this.candleLight.update();
    this.world.update();
  }
}
