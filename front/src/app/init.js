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
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  cube.position.y = 1;
  scene.add(cube);

  camera.position.z = 5;

  const controls = new MapControls(camera, renderer.domElement);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  const planeGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    // side: THREE.DoubleSide,
  });
  // const planeMaterial = new THREE.MeshBasicMaterial({color: 0xAAAAAA})
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotateX((-Math.PI / 180) * 90);
  scene.add(plane);

  const light = new THREE.DirectionalLight(0xffffff);
  light.position.x = 30;
  light.position.y = 25;
  light.position.z = -50;
  const helper = new THREE.DirectionalLightHelper(light, 5);
  // scene.add(light);
  // scene.add(helper);

  const spotLight = new THREE.SpotLight(0xffffff, 1, 100, (Math.PI / 180) * 30);
  spotLight.castShadow = true;
  spotLight.position.set(2, 2, 2);
  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLight);
  // scene.add(spotLightHelper)

  renderer.shadowMap.enabled = true;
  light.castShadow = true;

  const greedHelper = new THREE.GridHelper(10, 20);
  scene.add(greedHelper);

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
