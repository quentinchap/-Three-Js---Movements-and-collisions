
window.addEventListener("resize", handleWindowResize, false);

function handleWindowResize() {

    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

var WIDTH, HEIGHT, scene, camera, renderer, container, cube, shadowLight;

function initScene() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0x404040));
}

function initCamera() {


    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 20;
    camera.position.y = -40;
    camera.rotation.x = Math.PI / 4;

    scene.add(camera);
}

function initContainer(item) {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.soft = true;


    container = document.getElementById('container');
    container.appendChild(renderer.domElement);
}


function createCube() {
    var geometry = new THREE.BoxGeometry(10, 10, 10);
    var material = new THREE.MeshLambertMaterial({ color: 0xf2f2d5, shading: THREE.FlatShading });
    cube = new THREE.Mesh(geometry, material);
    //cube.rotation.y += Math.PI /4;
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

}


function wall1() {
    var geometry = new THREE.BoxGeometry(2, 30, 20);
    var material = new THREE.MeshLambertMaterial({ color: 0x4286f4 });
    var w1 = new THREE.Mesh(geometry, material);
    //cube.rotation.y += Math.PI /4;
    w1.castShadow = true;
    w1.receiveShadow = true;
    w1.position.x = 25;
    w1.position.z -= 10;
    scene.add(w1);
}

function wall2() {
    var geometry = new THREE.BoxGeometry(2, 30, 30);
    var material = new THREE.MeshLambertMaterial({ color: 0x4286f4 });
    var w2 = new THREE.Mesh(geometry, material);
    //cube.rotation.y += Math.PI /4;
    w2.castShadow = true;
    w2.receiveShadow = true;
    w2.position.x = -25;
    w2.position.z -= 10;
    scene.add(w2);
}

function loop() {
    requestAnimationFrame(loop);

    renderer.render(scene, camera);
}


function createLights() {


    shadowLight = new THREE.DirectionalLight(0xffffff);
    shadowLight.position.set(15, -20, 40);
    shadowLight.target.position.set(20, 20, 20);

    shadowLight.castShadow = true;
    shadowLight.shadow.camera.visible = true;

    shadowLight.shadow.camera.near = 3;
    shadowLight.shadow.camera.far = camera.far;

    shadowLight.shadow.camera.right = 50;
    shadowLight.shadow.camera.left = -50;
    shadowLight.shadow.camera.top = 50;
    shadowLight.shadow.camera.bottom = -50;


    scene.add(shadowLight);


    scene.add(new THREE.CameraHelper(shadowLight.shadow.camera));
    //scene.add(new THREE.AmbientLight(0xffffff));
}




document.addEventListener('keydown', onDocumentKeyDown, false);

function onDocumentKeyDown(event) {
    var delta = 1;
    event = event || window.event;
    var keycode = event.keyCode;

    console.log(keycode);

    switch (keycode) {
        case 81: //left arrow
            cube.position.x -= delta;
            break;

        case 90: // up arrow 
            cube.position.y += delta;
            break;

        case 68: // right arrow 
            cube.position.x += delta;
            break;

        case 83: //down arrow
            cube.position.y -= delta;
            break;
    }

}

initScene();
initContainer('container');
initCamera();
createLights();


createCube();
wall1();
wall2();

var groundMaterial = new THREE.MeshLambertMaterial({ color: 0x428000, shading: THREE.FlatShading });
plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), groundMaterial);
plane.position.z -= 20;
plane.receiveShadow = true;

scene.add(plane);


loop();