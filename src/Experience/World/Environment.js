import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
  constructor() {
    // setup
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // light setup
    this.setEnvironmentLight();
    this.setAreaLight();
  }

  setEnvironmentLight() {
    this.environmentMap = {};
    this.environmentMap.intensity = 2.0;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.encoding = THREE.sRGBEncoding;
    this.environmentMap.castShadow = true;

    this.scene.environment = this.environmentMap.texture;
    // this.scene.background = this.environmentMap.texture;

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.castShadow = true;
          child.material.needsUpdate = true;
        }
      });
    };
    this.environmentMap.updateMaterials();
  }

  setAreaLight() {
    this.areaLight = new THREE.RectAreaLight("#ffffff", 10, 20, 10);
    this.areaLight.rotation.y = -Math.PI * 0.5;
    this.areaLight.position.set(-12, 5, 0);
    this.scene.add(this.areaLight);

    this.directionalLight = new THREE.DirectionalLight("#ffffff", 1);
    this.directionalLight.position.set(0, 3, 4);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.radius = 5;
    this.directionalLight.shadow.mapSize.set(1024, 1024);
    // this.scene.add(this.directionalLight);

    this.pointLight = new THREE.PointLight("#ffffff", 10);
    this.pointLight.position.set(-1, 2, 0);
    this.pointLight.castShadow = true;
    this.pointLight.shadow.radius = 5;
    this.pointLight.shadow.mapSize.set(1024, 1024);

    // this.scene.add(this.pointLight);
  }
}
