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

// scene items

// car
const boxGeometry = new THREE.BoxGeometry(1,1,2); //width, height, depth (defaults are 1, so didnt really need to write 111)
const boxMaterial = new THREE.MeshBasicMaterial({color:'red', wireframe: true});
const box = new THREE.Mesh(boxGeometry, boxMaterial);

// floor

const floorGeometry = new THREE.PlaneGeometry(5,9);
const floorMaterial = new THREE.MeshBasicMaterial({color:'grey'});
const floor = new THREE.Mesh(floorGeometry,floorMaterial);

// helpers
const gridHelper = new THREE.GridHelper(100, 30);

const directionArrow = new THREE.ArrowHelper(
    new THREE.Vector3(0,0,-1),  //local -z forward
    new THREE.Vector3(0,0,0),   //center of box
    2,                          //length
    'green',                    //color
    
);

const velocityArrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, 0, -1),
    box.position,
    0,
    'blue',
    2,3
);


// add helpers
scene.add(gridHelper);

// lighting

// add lights

// add objects

scene.add(box);
scene.add(floor);

box.add(camera);
box.add(directionArrow);
box.add(velocityArrow);

// scene object translations
floor.rotateX(-Math.PI / 2);
floor.translateZ(-0.5)

// keybinds
const controls ={
    w: false, // is the w key pressed/ held
    a: false,
    s: false,
    d: false,
}

// variables

const timer = new THREE.Timer();

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

const acceleration = 20;
const dampening = 1;        // slows acceleration when approaching max
const maxSpeed = 100;

const rotateSpeed = 2;    // rad/sec

// event listeners 

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

// functions

function movementLogic(){
    timer.update();
    const deltaTime = timer.getDelta();

    direction.set(0, 0, -1).applyQuaternion(box.quaternion); // updates forward vector to match box's rotation

    if (controls.w){
        velocity.addScaledVector(direction, acceleration * deltaTime);
    };
    if (controls.s){
        velocity.addScaledVector(direction, -acceleration * deltaTime);
    };

    if (controls.a) box.rotateY(rotateSpeed * deltaTime);
    if (controls.d) box.rotateY(-rotateSpeed * deltaTime);

    velocity.multiplyScalar(Math.exp(-dampening * deltaTime));
    velocity.clampLength(0,maxSpeed);

    box.position.addScaledVector(velocity,deltaTime);

    const speed = velocity.length();

    if (speed > 0.01){
        velocityArrow.setDirection(velocity.clone().normalize());
        velocityArrow.setLength(speed * 0.5)
    }else{
        velocityArrow.setLength(0);
    }
}

function animate(){
    
    movementLogic();


    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate)