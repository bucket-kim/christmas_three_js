import * as THREE from "three";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  constructor() {
    // setup
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.mode = "default";

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );
    this.instance.position.set(6, 1, 0);
    this.instance.rotation.reorder("YXZ");

    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    this.controls.minPolarAngle = Math.PI * 0.25;
    this.controls.maxPolarAngle = Math.PI * 0.5;
    this.controls.minAzimuthAngle = Math.PI * 0.45;
    this.controls.maxAzimuthAngle = Math.PI * 0.55;
    this.controls.enableZoom = true;
    this.controls.screenSpacePanning = true;
    this.controls.enableKeys = false;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 10;
    this.controls.zoomSpeed = 0.25;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
