let scene, camera, renderer;

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(000);
  camera = new THREE.PerspectiveCamera(
    17,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  // camera.rotation.y = (45 / 180) * Math.PI;
  camera.position.x = 47;
  camera.position.y = 12;
  camera.position.z = 100;
  console.log(camera.x);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", renderer);

  hlight = new THREE.AmbientLight(0x404040, 10);
  scene.add(hlight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  // scene.add(directionalLight);
  light = new THREE.PointLight(0xc4c4c4, 1);
  light.position.set(0, 300, 500);
  // scene.add(light);
  light2 = new THREE.PointLight(0xc4c4c4, 3);
  light2.position.set(9, 9, 0);
  scene.add(light2);
  light3 = new THREE.PointLight(0xc4c4c4, 1);
  light3.position.set(0, 100, -500);
  // scene.add(light3);
  light4 = new THREE.PointLight(0xc4c4c4, 1);
  light4.position.set(-500, 300, 500);
  // scene.add(light4);

  let loader = new THREE.GLTFLoader();
  loader.load("./scene.gltf", function (gltf) {
    car = gltf.scene.children[0];
    car.scale.set(10, 10, 10);
    car.position.setY(-13);
    car.position.setX(19);
    scene.add(gltf.scene);
    animate();
  });
}
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
init();
