import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import Experience from "../Experience";
import { RoughnessMipmapper } from "three/examples/jsm/utils/RoughnessMipmapper";

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
    new RGBELoader().load(
      "textures/environmentMap/studio_country_hall_1k.hdr",
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        // this.scene.background = texture;
        this.scene.environment = texture;

        const roughnessMipmapper = new RoughnessMipmapper(
          new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
          })
        );

        this.model = {};
        this.model.mesh = this.resources.items.floorModel.scene;
        this.model.mesh.position.set(0, -1.5, 0);
        this.model.mesh.rotation.y = Math.PI * 0.5;
        this.model.mesh.scale.set(1, 1, 1);

        this.model.texture = this.map;
        this.model.texture.encoding = THREE.sRGBEncoding;
        this.model.texture.flipY = false;
        this.roughness.flipY = false;

        this.model.material = new THREE.MeshStandardMaterial({
          map: this.model.texture,
          roughnessMap: this.roughness,
        });

        this.model.mesh.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = this.model.material;
            child.castShadow = true;
            child.receiveShadow = true;
            roughnessMipmapper.generateMipmaps(child.material);
          }
        });

        this.scene.add(this.model.mesh);
      }
    );
  }
}
