import * as THREE from "three";
import Experience from "./Experience";

import vertexShader from "./Shaders/CandleLight/vertex.glsl";
import fragmentShader from "./Shaders/CandleLight/fragment.glsl";

export default class CandleLight {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.time = this.experience.time;

    this.setCandle();

    this.delta = 0;
    this.clock = new THREE.Clock().getDelta();

    this.delta += this.clock;
  }

  setCandle() {
    this.candleLight = new THREE.PointLight(0xffaa33, 50, 10, 2);
    this.candleLight.position.set(0, 1.5, 0);
    this.candleLight.castShadow = true;
    this.scene.add(this.candleLight);

    this.candleLight2 = new THREE.PointLight(0xffaa33, 100, 20, 2);
    this.candleLight2.position.set(0, 2.5, 0);
    this.candleLight2.castShadow = true;
    this.scene.add(this.candleLight2);

    const getFlameMaterial = (isFrontSide) => {
      let side = isFrontSide ? THREE.FrontSide : THREE.BackSide;

      return new THREE.ShaderMaterial({
        uniforms: {
          time: {
            value: 0,
          },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        side: side,
      });
    };

    this.flameMaterials = [];

    const flame = (isFrontSide) => {
      let flameGeo = new THREE.SphereBufferGeometry(0.15, 32, 32);
      flameGeo.translate(0, 0.385, 0);
      let flameMat = getFlameMaterial(true);
      this.flameMaterials.push(flameMat);
      let flame = new THREE.Mesh(flameGeo, flameMat);
      flame.position.set(0.0, 0, -0.0);
      flame.rotation.y = THREE.MathUtils.degToRad(-45);
      this.scene.add(flame);
    };

    flame(true);
    flame(false);
  }

  update() {
    this.flameMaterials[0].uniforms.time.value = this.time.elapsed * 0.001;
    this.flameMaterials[1].uniforms.time.value = this.time.elapsed * 0.001;

    this.candleLight2.position.x = Math.sin(this.time.elapsed * Math.PI) * 0.25;

    this.candleLight2.position.z =
      Math.cos(this.time.elapsed * Math.PI * 0.00035) * 0.25;

    this.candleLight.intensity =
      2 +
      Math.sin(this.time.elapsed * Math.PI * 0.001) *
        Math.cos(this.time.elapsed * Math.PI * 0.0005) *
        25;
  }
}
