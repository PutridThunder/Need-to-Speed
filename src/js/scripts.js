import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    70,                                     // FOV
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1,                                    // close clipping distance
    1000                                    // far clipping distance
)

camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

const gridHelper = new THREE.GridHelper(30, 30);

const boxGeometry = new THREE.BoxGeometry(1,1,1); //width, height, depth (defaults are 1, so didnt really need to write 111)
const boxMaterial = new THREE.MeshBasicMaterial({color:'red'})

const box = new THREE.Mesh(boxGeometry, boxMaterial)

scene.add(box)
scene.add(gridHelper);

function spin(){
    box.rotateX(.1);
    box.rotateY(.05);
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(spin)