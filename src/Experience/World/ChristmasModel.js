import * as THREE from "three";
import Experience from "../Experience";

export default class ChristmasModel {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // setup
    this.resource = this.resources.items.christmasModel;

    this.setModel();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(1.0, 1.0, 1.0);
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow.true;
      }
    });
  }
}
