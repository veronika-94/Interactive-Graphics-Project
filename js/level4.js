// Canvas
var canvas = document.getElementById('renderCanvas');
// 3D Engine
var engine = new BABYLON.Engine(canvas, true);

var camera;

//Time to try to implement gravity and run
var timeWalk = 0;
var timeJump = 0;
var timeSlide = 0;

// Set gravity
var gravity = -0.1;



var checkpoint = new BABYLON.Vector3(0, 10, 0);

var platformHeight = 2;
var knight;
var helmet;

// List of objects that are considered ground
var groundObjects = [];

var createScene = function() {
    // Scene
    var scene = new BABYLON.Scene(engine);
    scene.collisionsEnabled = true;

    //Set platforms materials
    var ice = new BABYLON.StandardMaterial("ice", scene);
    ice.diffuseColor = new BABYLON.Color3(0, 1, 1);
    ice.diffuseTexture = new BABYLON.Texture("../Textures/ice.png", scene)

    var ground = new BABYLON.StandardMaterial("ground", scene);
    ground.diffuseColor = new BABYLON.Color3(1, 1, 1);


    // Camera
    camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(0, 0, 0), scene);
    camera.radius = 40;
    camera.heightOffset = 10;
    camera.rotationOffset = 180;
    camera.attachControl(canvas, true);

    // Light
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

    // Platform 1
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform1', {width:50, height:platformHeight, depth:10}, scene);
    platform1.checkCollisions = true;
    platform1.material = ground;
    groundObjects.push(platform1);

    // Platform 2
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:20, height:platformHeight, depth:10}, scene);
    platform2.position = new BABYLON.Vector3(23, -10, 0)
    platform2.checkCollisions = true;
    platform2.material = ice;
    groundObjects.push(platform2);

    // Platform 3
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:200, height:platformHeight, depth:10}, scene);
    platform3.position = new BABYLON.Vector3(-80, -20, 0)
    platform3.material = ice;
    platform3.checkCollisions = true;
    groundObjects.push(platform3);

    //music
    var musicl4 = new BABYLON.Sound("musicl2", "../sounds/songs/dance with the trees.mp3", scene, soundReady, {loop:true, volume:0.5, useCustomAttenuation:false});

    function soundReady(){
        musicl4.play();
    }

    // Player
    player.mesh = new BABYLON.MeshBuilder.CreateSphere("player", {diameterX: player.width, diameterY:player.height, diameterZ:player.depth}, scene);
    player.mesh.visibility = 0;
    player.mesh.position.y = (player.height + platformHeight)/2.0;
    player.mesh.ellipsoid = new BABYLON.Vector3(player.width/2, player.height/2, player.depth/2);
    player.mesh.checkCollisions = true;
    camera.lockedTarget = player.mesh;
    
    BABYLON.SceneLoader.ImportMesh("", "../models/", "knight.gltf", scene, function(newMeshes) {
        player.initializeRoot(newMeshes[0]);
        player.initializeBody();
        player.initializeAnimations();
        player.loadingComplete = true;
    });

    return scene;
}

var scene = createScene();