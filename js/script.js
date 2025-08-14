import * as THREE from "https://cdn.skypack.dev/three@0.132.2/build/three.module.js";
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';
import * as TWEEN from 'https://cdn.skypack.dev/@tweenjs/tween.js';

window.onload = function() {

//const monkeyUrl = new URL("../obj/new.glb", import.meta.url);

  const container = document.getElementById('mainobject');
  var h=container.clientHeight;
  var w=container.clientWidth;
 

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( w, h);
  container.appendChild(renderer.domElement);

  

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    w / h,
    0.1,
    1000
  );

//------------------------Resize with the window------------------------------------------

  window.addEventListener("resize", function () {
    
    

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
   

    if(w<=912){
      camera.position.set(0.0001, 0.2453, -0.6945);
      orbit.maxDistance = 1.2;
    }
    

  });



//-------------------------Orbit Limitations------------------------------------------
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0.0001, 0.1998, -0.5657);
orbit.update();
// orbit.maxDistance = 1;
// orbit.minDistance = 0.57;
orbit.enableDamping = true;
orbit.dampingFactor = 0.2;
orbit.minPolarAngle = Math.PI / 4;
orbit.maxPolarAngle = Math.PI / 2.3;
orbit.enablePan = false;
orbit.enableZoom = false;
//-------------------------Lights------------------------------------------

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(0.003, 0.8, -2.4);
scene.add(directionalLight);

const assetLoader = new GLTFLoader();
let mixer;

//----------------------Camera Animation---------------------------------------------


// const toPosition = new THREE.Vector3(0.003, 0.313, -0.626);

// const cameraAnimation = new TWEEN.Tween(camera.position)
//   .to(toPosition, 500)
//   .easing(TWEEN.Easing.Quadratic.InOut);
 


//   cameraAnimation.start();




//-----------------Raycaster(Object Selection)---------------------------------

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onKeyPress(event) {
  mouse.x = (event.offsetX / w) * 2 - 1;
  mouse.y = -(event.offsetY / h) * 2 + 1;


  raycaster.setFromCamera(mouse, camera);

  scene.traverse(function (object) {
    if (object.isMesh) {
      object.material.opacity = 1;
      object.material.transparent = true;
    }
  });

  const intersects = raycaster.intersectObjects(scene.children, true);

  let closestDistance = Infinity;
  let closestObject = null;

  intersects.forEach(function (intersect) {
    if (intersect.object.isMesh) {
      // Calculate the distance between the camera and the intersected object
      const distance = camera.position.distanceTo(intersect.object.position);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestObject = intersect.object;
      }
    }
  });

  if (closestObject !== null) {
    const intersectedKeyID = closestObject.userData.keyID;

    for (var i = 1; i < 100; i++) {
      if (intersectedKeyID == i) {
        const originalPosition = closestObject.position.clone();
        closestObject.position.y -= 0.002;

       

        var sound = document.getElementById("sound");
        sound.play();

        const tween = new TWEEN.Tween(closestObject.position)
          .to(originalPosition, 200)
          .easing(TWEEN.Easing.Exponential.Out)
          .start();

        break;
      }
    }
  }
}

// Add event listener to the document
document.addEventListener("mousedown", onKeyPress, false);


//--------------------------------------------------

assetLoader.load(
  "./js/assets/new.glb",
  function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;

    clips.forEach(function (clip) {
      const action = mixer.clipAction(clip);
      action.play();
    });
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const clock = new THREE.Clock();
function animate() {
  if (mixer) mixer.update(clock.getDelta());
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  TWEEN.update();
}

animate();



//----------------Camera Position Finder---------------------------------------
orbit.addEventListener("change", function () {
  console.log(camera.position);
});

};