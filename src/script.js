import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

THREE.ColorManagement.enabled = false;

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Axis Helper
const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture1 = textureLoader.load("/textures/matcaps/1.png");
const matcapTexture2 = textureLoader.load("/textures/matcaps/2.png");
const matcapTexture3 = textureLoader.load("/textures/matcaps/3.png");
const matcapTexture4 = textureLoader.load("/textures/matcaps/4.png");
const matcapTexture5 = textureLoader.load("/textures/matcaps/5.png");
const matcapTexture6 = textureLoader.load("/textures/matcaps/6.png");
const matcapTexture7 = textureLoader.load("/textures/matcaps/7.png");
const matcapTexture8 = textureLoader.load("/textures/matcaps/8.png");

const obj = {
  1: matcapTexture1,
  2: matcapTexture2,
  3: matcapTexture3,
  4: matcapTexture4,
  5: matcapTexture5,
  6: matcapTexture6,
  7: matcapTexture7,
  8: matcapTexture8,
};

// Fonts

const fontloader = new FontLoader();
fontloader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Ayush Agarwal", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  textGeometry.center();

  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture4 });
  //   textMaterial.wireframe = true;
  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);

  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 20);
  let num = 1;

  for (let i = 0; i < 100; i++) {
    const donut = new THREE.Mesh(donutGeometry, material);

    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = (Math.random() - 0.5) * 10;

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.z = Math.random() * Math.PI;

    const scale = Math.random();
    donut.scale.set(scale, scale, scale);
    scene.add(donut);
  }

    setInterval(() => {
      material.matcap = obj[num];
      num++;
      if (num == 9) num = 1;
    }, 1000);
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
