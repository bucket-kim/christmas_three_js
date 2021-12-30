import * as THREE from "three";
import Experience from "./Experience";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";

export default class Loading {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setLoading();
  }

  setLoading() {
    this.overlayGeo = new THREE.PlaneGeometry(2, 2, 1, 1);
    this.overlayMat = new THREE.ShaderMaterial({
      uniforms: {
        uAlpha: {
          value: 1,
        },
      },
      vertexShader: `
        void main()
          {
              gl_Position = vec4(position, 1.0);
          }
      `,
      fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
      `,
      transparent: true,
    });

    this.overlay = new THREE.Mesh(this.overlayGeo, this.overlayMat);

    this.loadingManager = new THREE.LoadingManager(
      gsap.to(this.overlayMat.uniforms.uAlpha, {
        delay: 1,
        duration: 2,
        value: 0,
      })
    );
    this.gltfLoader = new GLTFLoader(this.loadingManager);
    this.cubeTextureLoader = new THREE.CubeTextureLoader(this.loadingManager);

    this.scene.add(this.overlay);
  }
}
