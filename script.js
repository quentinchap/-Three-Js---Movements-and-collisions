
window.addEventListener("resize", handleWindowResize, false);

var WIDTH, HEIGHT, scene, camera, renderer, container, cube, shadowLight, tween;

window.onload = function () {

    var gui = new dat.GUI();

    var MovingObjectMenu = gui.addFolder('Moving object');

    var f1 = MovingObjectMenu.addFolder('Object position');
    f1.add(cube.position, 'x', -35, 35).listen();
    f1.add(cube.position, 'y', -35, 35).listen();
    f1.add(cube.position, 'z', -15, 15).listen();
    f1.open();

    var f2 = MovingObjectMenu.addFolder('Object rotation');
    f2.add(cube.rotation, 'x', -Math.PI, Math.PI).listen();
    f2.add(cube.rotation, 'y', -Math.PI, Math.PI).listen();
    f2.add(cube.rotation, 'z', -Math.PI, Math.PI).listen();
    f2.open();

    var cameraMenu = gui.addFolder('Camera');

    var f3 = cameraMenu.addFolder('Camera position');
    f3.add(camera.position, 'x', -300, 300).listen();
    f3.add(camera.position, 'y', -300, 300).listen();
    f3.add(camera.position, 'z', -300, 300).listen();
    f3.open();

    var f4 = cameraMenu.addFolder('Camera rotation');
    f4.add(camera.rotation, 'x', -Math.PI, Math.PI).listen();
    f4.add(camera.rotation, 'y', -Math.PI, Math.PI).listen();
    f4.add(camera.rotation, 'z', -Math.PI, Math.PI).listen();
    f4.open();

};

function handleWindowResize() {

    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

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
    TWEEN.update();
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
    var delta = 5;
    event = event || window.event;
    var keycode = event.keyCode;
    var initPos = cube.position.clone();
    var target = cube.position.clone();

    console.log(keycode);

    switch (keycode) {
        case 81: //left arrow
        case 37:
            target.x -= delta;
            break;

        case 90: // up arrow 
        case 38:
            target.y += delta;
            break;

        case 68: // right arrow 
        case 39:
            target.x += delta;
            break;

        case 83: //down arrow
        case 40:
            target.y -= delta;
            break;
    }

    tween = new TWEEN.Tween(initPos).to(target, 100);
    tween.onUpdate(function () {
        cube.position.x = this.x;
        cube.position.y = this.y;
    }).start();

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