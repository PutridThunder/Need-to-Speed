import * as THREE from 'three';

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(
    70,                                     // FOV
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1,                                    // close clipping distance
    1000                                    // far clipping distance
)

camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// helpers
const gridHelper = new THREE.GridHelper(30, 30);

// scene items

// car
const boxGeometry = new THREE.BoxGeometry(1,1,2); //width, height, depth (defaults are 1, so didnt really need to write 111)
const boxMaterial = new THREE.MeshBasicMaterial({color:'red', wireframe: true});
const box = new THREE.Mesh(boxGeometry, boxMaterial);

// floor

const floorGeometry = new THREE.PlaneGeometry(5,9);
const floorMaterial = new THREE.MeshBasicMaterial({color:'grey'});
const floor = new THREE.Mesh(floorGeometry,floorMaterial);


// add helpers
scene.add(gridHelper);

// lighting

// add lights

// add objects

scene.add(box)
scene.add(floor)
box.add(camera)
// scene object translations
floor.rotateX(-Math.PI / 2);
floor.translateZ(-0.5)


// functions and listeners
const controls ={
    w: false, // is the w key pressed/ held
    a: false,
    s: false,
    d: false,
}

// is key pressed down
window.addEventListener('keydown',function(event){
    if (event.repeat) return;

    const key = event.key.toLocaleLowerCase();
    if(key in controls){
        controls[key] = true;
    }
});

// is key unpressed
window.addEventListener('keyup',function(event){
    if (event.repeat) return;

    const key = event.key.toLocaleLowerCase();
    if(key in controls){
        controls[key] = false;
    }
});

const moveSpeed = 1
const rotateSpeed = 0.2

function animate(){
    if (controls.w) box.translateZ(-moveSpeed);
    if (controls.s) box.translateZ(moveSpeed);
    if (controls.a) box.rotateY(rotateSpeed);
    if (controls.d) box.rotateY(-rotateSpeed);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate)