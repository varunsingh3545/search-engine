import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { FontLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/geometries/TextGeometry.js';

let scene, camera, renderer, crystal, ring, logoText;
let frame = 0;
let hasFaded = false;

function init() {
  const container = document.getElementById('three-container');
  if (!container) return;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0x99ccff, 1.5));
  const pointLight = new THREE.PointLight(0xffffff, 1.2);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  const crystalGeo = new THREE.IcosahedronGeometry(1.3, 1);
  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0x9DDCFF,
    roughness: 0,
    transmission: 1,
    thickness: 2,
    clearcoat: 1,
    reflectivity: 1
  });
  crystal = new THREE.Mesh(crystalGeo, crystalMat);
  scene.add(crystal);

  const ringGeo = new THREE.RingGeometry(1.6, 1.8, 64);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x6FD4FF, side: THREE.DoubleSide });
  ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  scene.add(ring);

  const loader = new FontLoader();
  loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeo = new TextGeometry('ZYTHERION BIOVANCE', {
      font,
      size: 0.25,
      height: 0.05,
    });
    const textMat = new THREE.MeshBasicMaterial({ color: 0xE6F0FF });
    logoText = new THREE.Mesh(textGeo, textMat);
    logoText.position.set(-2.8, -2.2, 0);
    scene.add(logoText);
  });

  window.addEventListener('resize', onWindowResize);
}

function animate() {
  requestAnimationFrame(animate);
  frame++;

  if (crystal) crystal.rotation.y += 0.005;
  if (ring) {
    ring.rotation.z += 0.002;
    ring.scale.setScalar(1 + Math.sin(frame * 0.02) * 0.05);
  }

  if (frame < 120) {
    camera.position.z += 0.02;
  }

  if (frame === 140 && !hasFaded) {
    hasFaded = true;
    const canvas = renderer.domElement;
    canvas.style.transition = 'opacity 1.5s ease';
    canvas.style.opacity = '0';

    setTimeout(() => {
      document.querySelector('.hero-content')?.classList.add('show');
    }, 1500);
  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function start(){
  init();
  animate();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
