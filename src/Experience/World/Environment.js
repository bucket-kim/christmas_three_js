import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
  constructor() {
    // setup
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // light setup
    // this.setEnvironmentLight();
    this.setAreaLight();
  }

  setEnvironmentLight() {
    this.environmentMap = {};
    this.environmentMap.intensity = 1.0;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.encoding = THREE.sRGBEncoding;
    this.environmentMap.castShadow = true;

    // this.scene.environment = this.environmentMap.texture;
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
    this.areaLight = new THREE.RectAreaLight("#ffffff", 4, 15, 15);
    this.areaLight.rotation.z = Math.PI * 0.5;
    // this.areaLight.rotation.x = -0.5;
    this.areaLight.rotation.y = -0.2;
    this.areaLight.position.set(0, 7, 15);

    // this.scene.add(this.areaLight);

    this.directionalLight = new THREE.DirectionalLight("#ffffff", 1.5);
    this.directionalLight.position.set(10, 10, 10);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.radius = 20;
    this.directionalLight.shadow.mapSize.set(1024, 1024);
    // this.scene.add(this.directionalLight);

    this.pointLight = new THREE.PointLight("#ffd28e", 17);
    this.pointLight.position.set(1, 1, 2);
    // this.pointLight.castShadow = true;
    // this.pointLight.shadow.radius = 20;
    this.pointLight.shadow.mapSize.set(1024, 1024);

    this.lightHelper = new THREE.PointLightHelper(this.pointLight, 1);

    // this.scene.add(this.lightHelper);
    this.scene.add(this.pointLight);
  }
}
