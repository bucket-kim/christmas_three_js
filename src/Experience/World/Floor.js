import * as THREE from "three";
import Experience from "../Experience";

export default class ChristmasModel {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // setup
    this.resource = this.resources.items.floorModel;
    this.map = this.resources.items.floorTexture;
    this.roughness = this.resources.items.floorRoughness;

    this.setModel();
  }

  setModel() {
    this.model = {};
    this.model.mesh = this.resources.items.floorModel.scene;
    this.model.mesh.position.set(0, -1, 0);

    this.model.texture = this.resources.items.floorTexture;
    this.model.texture.encoding = THREE.sRGBEncoding;
    this.model.texture.flipY = false;

    this.model.material = new THREE.MeshStandardMaterial({
      map: this.model.texture,
      // roughnessMap: this.roughness,
    });

    this.model.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = this.model.material;
      }
    });

    this.scene.add(this.model.mesh);
  }
}
