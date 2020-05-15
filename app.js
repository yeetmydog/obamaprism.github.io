// Variables
let container;
let camera;
let renderer;
let scene;
let model;

function init() {
  container = document.querySelector(".scene");

  // Create scene
  scene = new THREE.Scene();

  // Create camera (and camera setup)
  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;
  
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 6);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 100);
  
  scene.add(light);
  
  // Create renderer (and renderer setup)
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  // Create model loader (and model loader setup)
  let loader = new THREE.GLTFLoader();
  loader.load("./model/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    model = gltf.scene.children[2];
    startAnimation();
  });
}

function startAnimation() {
  requestAnimationFrame(startAnimation);
  model.rotation.y += 0.006;
  renderer.render(scene, camera);
}

init();

window.addEventListener("resize", function() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
});
