import * as THREE from "three";

export default (theElement) => {
  const renderer = new THREE.WebGLRenderer({
    canvas: theElement,
  })

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
  const cubeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
  scene.add(cube);

  camera.position.z = 5;

  const animate = () => {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }
  animate();
};
