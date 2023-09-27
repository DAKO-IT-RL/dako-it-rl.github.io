import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const loader = new GLTFLoader();
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls( camera, renderer.domElement );

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.set(30, 30, 30)
camera.lookAt(0, 30, 0)
controls.update();

// set up ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// load model
loader.load( './assets/free_tesla_tequila.glb', function ( gltf ) {
  gltf.scene.traverse( child => {
    if ( child.material ) child.material.metalness = 0.1;
  });
  gltf.scene.position.set(0, -15, 0)
	scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );


function animate() {
	requestAnimationFrame( animate );
  controls.update();
	renderer.render( scene, camera );
}

if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}