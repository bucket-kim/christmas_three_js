import * as THREE from "three";
import Experience from "./Experience";
import normalizeWheel from "normalize-wheel";

export default class Navigation {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.time = this.experience.time;

    this.setView();
  }

  setView() {
    this.view = {};

    this.view.spherical = {};
    this.view.spherical.value = new THREE.Spherical(
      30,
      Math.PI * 0.35,
      -Math.PI * 0.25
    );
    this.view.spherical.smoothed = this.view.spherical.value.clone();
    this.view.spherical.smoothing = 0.005;
    this.view.spherical.limit = {};
    this.view.spherical.limit.radius = { min: 10, max: 50 };
    this.view.spherical.limit.phi = { min: 0.01, max: Math.PI * 0.5 };
    this.view.spherical.limit.theta = { min: -Math.PI, max: 0 };

    this.view.target = {};
    this.view.target.value = new THREE.Vector3(0, 2, 0);
    this.view.target.smoothed = this.view.target.value.clone();
    this.view.target.smoothing = 0.005;
    this.view.target.limit = {};
    this.view.target.limit.x = { min: -4, max: 4 };
    this.view.target.limit.y = { min: 1, max: 6 };
    this.view.target.limit.z = { min: -4, max: 4 };

    this.view.drag = {};
    this.view.drag.delta = {};
    this.view.drag.delta.x = 0;
    this.view.drag.delta.y = 0;
    this.view.drag.previous = {};
    this.view.drag.previous.x = 0;
    this.view.drag.previous.y = 0;
    this.view.drag.sensitivity = 1;
    this.view.drag.alternative = false;

    this.view.zoom = {};
    this.view.zoom.sensitivity = 0.01;
    this.view.zoom.delta = 0;

    this.view.down = (x, y) => {
      this.view.drag.previous.x = x;
      this.view.drag.previous.y = y;
    };

    this.view.move = (x, y) => {
      this.view.drag.delta.x += x - this.view.drag.previous.x;
      this.view.drag.delta.y += y - this.view.drag.previous.y;

      this.view.drag.previous.x = x;
      this.view.drag.previous.y = y;
    };

    this.view.up = () => {};

    this.view.zoomIn = (delta) => {
      this.view.zoom.delta += delta;
    };

    this.view.onMouseDown = (e) => {
      e.preventDefault();

      this.view.drag.alternative =
        e.button === 2 || e.button === 1 || e.ctrlKey || e.shiftKey;

      this.view.down(e.clientX, e.clientY);

      window.addEventListener("mouseup", this.view.onMouseUp);
      window.addEventListener("mousemove", this.view.onMouseMove);
    };

    this.view.onMouseMove = (e) => {
      e.preventDefault();

      this.view.move(e.clientX, e.clientY);
    };

    this.view.onMouseUp = (e) => {
      e.preventDefault();

      this.view.up();

      window.removeEventListener("mouseup", this.view.onMouseUp);
      window.removeEventListener("mousemove", this.view.onMouseMove);
    };

    this.view.onContextMenu = (e) => {
      e.preventDefault();
    };

    this.view.onWheel = (e) => {
      e.preventDefault();

      const normalized = normalizeWheel(e);
      this.view.zoomIn(normalized.pixelY);
    };

    window.addEventListener("mousewheel", this.view.onWheel, {
      passive: false,
    });
    window.addEventListener("wheel", this.view.onWheel, { passive: false });
  }

  update() {
    // zoom

    this.view.spherical.value.radius +=
      this.view.zoom.delta * this.view.zoom.sensitivity;

    this.view.spherical.value.radius = Math.min(
      Math.max(
        this.view.spherical.value.radius,
        this.view.spherical.limit.radius.min
      ),
      this.view.spherical.limit.radius.max
    );

    if (this.view.drag.alternative) {
      const up = new THREE.Vector3(0, 1, 0);
      const right = new THREE.Vector3(-1, 0, 0);

      up.applyQuaternion(this.camera.modes.default.instance.quaternion);
      right.applyQuaternion(this.camera.modes.default.instance.quaternion);

      up.multiplyScalar(this.view.drag.delta.y * 0.01);
      right.multiplyScalar(this.view.drag.delta.x * 0.01);

      this.view.target.value.add(up);
      this.view.target.value.add(right);

      // apply limit
      this.view.target.value.x = Math.min(
        Math.max(this.view.target.value.x, this.view.target.limit.x.min),
        this.view.target.limit.x.max
      );
      this.view.target.value.y = Math.min(
        Math.max(this.view.target.value.y, this.view.target.limit.y.min),
        this.view.target.limit.y.max
      );
      this.view.target.value.z = Math.min(
        Math.max(this.view.target.value.z, this.view.target.limit.z.min),
        this.view.target.limit.z.max
      );
    } else {
      this.view.spherical.value.theta -=
        this.view.drag.delta.x * this.view.drag.sensitivity;
      this.view.spherical.value.theta -=
        this.view.drag.delta.y * this.view.drag.sensitivity;

      // apply
      this.view.spherical.value.theta = Math.min(
        Math.max(
          this.view.spherical.value.theta,
          this.view.spherical.limit.theta.min
        ),
        this.view.spherical.limit.theta.max
      );
      this.view.spherical.value.phi = Math.min(
        Math.max(
          this.view.spherical.value.phi,
          this.view.spherical.limit.phi.min
        ),
        this.view.spherical.limit.phi.max
      );
    }

    this.view.drag.delta.x = 0;
    this.view.drag.delta.y = 0;
    this.view.zoom.delta = 0;

    // smoothing
    this.view.spherical.smoothed.radius +=
      (this.view.spherical.value.radius - this.view.spherical.smoothed.radius) *
      this.view.spherical.smoothing *
      this.time.delta;
    this.view.spherical.smoothed.phi +=
      (this.view.spherical.value.phi - this.view.spherical.smoothed.phi) *
      this.view.spherical.smoothing *
      this.time.delta;
    this.view.spherical.smoothed.theta +=
      (this.view.spherical.value.theta - this.view.spherical.smoothed.theta) *
      this.view.spherical.smoothing *
      this.time.delta;

    this.view.target.smoothed.x +=
      (this.view.target.value.x - this.view.target.smoothed.x) *
      this.view.target.smoothing *
      this.time.delta;
    this.view.target.smoothed.y +=
      (this.view.target.value.y - this.view.target.smoothed.y) *
      this.view.target.smoothing *
      this.time.delta;
    this.view.target.smoothed.z +=
      (this.view.target.value.z - this.view.target.smoothed.z) *
      this.view.target.smoothing *
      this.time.delta;

    const viewPosition = new THREE.Vector3();
    viewPosition.setFromSpherical(this.view.spherical.smoothed);
    viewPosition.add(this.view.target.smoothed);

    this.camera.modes.default.instance.position.copy(viewPosition);
    this.camera.modes.default.instance.lookAt(this.view.target.smoothed);
  }
}
