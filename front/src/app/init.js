import * as THREE from "three";
import { MapControls } from "three/addons/controls/MapControls.js";

export default (theElement) => {
  const renderer = new THREE.WebGLRenderer({
    canvas: theElement,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  scene.add(cube);

  camera.position.z = 5;

  const controls = new MapControls(camera, renderer.domElement);

  const animate = () => {
    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    // controls.update();

    renderer.render(scene, camera);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  };
  animate();
};
