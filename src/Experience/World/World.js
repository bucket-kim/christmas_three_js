import * as THREE from "three";
import Experience from "../Experience";
import ChristmasModel from "./ChristmasModel";
import Floor from "./Floor.js";
import Environment from "./Environment";

export default class World {
  constructor() {
    // setup
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // test mesh
    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({})
    );

    // this.scene.add(testMesh);

    // wait for resources
    this.resources.on("ready", () => {
      this.floorModel = new Floor();
      this.christmasModel = new ChristmasModel();
      this.environment = new Environment();
    });
  }
}
