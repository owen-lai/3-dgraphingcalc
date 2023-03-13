const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

//update mesh using changed min/max/delta values when we zoom in/out
//probably check for updates in RenderLoop?
const deltax = 0.3;
const deltaz = 0.3; 
const zmax = 10;
const xmax = 10;

const createScene = function() {
    const scene = new BABYLON.Scene(engine);

    //Custom Camera or switch back and forth between Universal and ArcRotate
    //const camera = new BABYLON.UniversalCamera('camera1', new BABYLON.Vector3(5, 5, 5), scene);
    let camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(65), 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    //Refer to https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs for customized camera input
    
    //const light = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(-1, -1, -2));
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(-1,-1, -2)); //this light looks better?
    light.intensity = 1;

    const paths = [];
    let expressions = "x * x + z * x";                 // get user input from html element and turn it into latex expressions?
    for (let currentZ = -1 * zmax; currentZ < zmax; currentZ = currentZ + deltaz) {
        const path = [];
        for (let currentX = -1 * xmax; currentX < xmax; currentX = currentX + deltax) {
            let scope = {
                x: currentX,
                z: currentZ
            }
            let y = math.evaluate(expressions, scope);
            path.push(new BABYLON.Vector3(currentX, y, currentZ))
        }
        //const line = BABYLON.MeshBuilder.CreateLines('line', {points:path}, scene); //uncomment this line if you want to see the lines of ribbon
        paths.push(path);
    }

    //Options for graph
    let graphOptions = {
        pathArray: paths,
        updatable: true,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }

    let ribbon = BABYLON.MeshBuilder.CreateRibbon("ribbon", graphOptions, scene);
    
    const axes = new BABYLON.AxesViewer(scene, 10); //customize axes directions for x,y,z and add axis label?
    return scene;
}

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function() {
    engine.resize();
});