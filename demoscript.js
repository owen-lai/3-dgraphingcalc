const canvas = document.getElementById('renderCanvas');
const textInput1 = document.getElementById('input1');
const textInput2 = document.getElementById('input2');
const button = document.getElementById('button');
const engine = new BABYLON.Engine(canvas, true);

let lastRadius = 20;
let numMesh = 2;

let currentCameraState = 'universal';
let ArcRotateCamera;
let UniversalCamera; 
let camera;

button.onclick = () => {
    toggleCamera();
}

const toggleCamera = () => {
    let myCanvas = myScene.getEngine().getRenderingCanvas();
    let previousCamera = myScene.activeCamera;
    myScene.activeCamera.detachControl();
    if (currentCameraState === 'arcRotate') {
        myScene.activeCamera = UniversalCamera; 
        //need to figure out a way to change z and y axis... this works weirdly as of now.
        let y = previousCamera.radius * Math.cos(previousCamera.beta);
        let r = Math.abs(previousCamera.radius * Math.sin(previousCamera.beta));
        let x = r * Math.cos(previousCamera.alpha);
        let z = r * Math.sin(previousCamera.alpha);
        UniversalCamera.position = new BABYLON.Vector3(x, y, z);
        UniversalCamera.target = new BABYLON.Vector3(0,0,0);
        currentCameraState = 'universal';
    }
    else {
        myScene.activeCamera = ArcRotateCamera;
        ArcRotateCamera.position = UniversalCamera.position;
        currentCameraState = 'arcRotate';
    }
    myScene.activeCamera.attachControl(myCanvas);
}

const createScene = function() {
    let scene = new BABYLON.Scene(engine);

    //Custom Camera or switch back and forth between Universal and ArcRotate
    //const camera = new BABYLON.UniversalCamera('camera1', new BABYLON.Vector3(5, 5, 5), scene);
    
    UniversalCamera = new BABYLON.UniversalCamera('universalCamera', new BABYLON.Vector3(5, 5, 5), scene);
    ArcRotateCamera = new BABYLON.ArcRotateCamera('arcRotateCamera', BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(65), 10, BABYLON.Vector3.Zero(), scene);
    camera = UniversalCamera;
    //Refer to https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs for customized camera input
    
    //const light = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(-1, -1, -2));
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(-1,-1, -2)); //this light looks better?
    light.intensity = 1;

    const axes = new BABYLON.AxesViewer(scene, 10); //customize axes directions for x,y,z and add axis label?
    return scene;
}

const myScene = createScene();
toggleCamera();

//id assigning system and storing textInput objects are to be dealt with while merging with vishwa's 
textInput1.oninput = () => recreateMesh(textInput1.value, 1);
textInput2.oninput = () => recreateMesh(textInput2.value, 2);
let textInputs = [textInput1, textInput2];



//removes currently old graph and creates a new graph based on new informations
const recreateMesh = (expression, id) => {
    let currentGraph = myScene.getMeshByName("graph" + id); 
    if(currentGraph != null) {
        currentGraph.dispose();
    }
    try {
        if (expression !== "") {
            generateMeshFromFunction(expression, id);
        }
    }    

    catch(error) {
        //error statement if needed. display something to let user know of what to do?
    }
}

//parameter - radius of camera
//return value - [range, step] for sampling of the mesh
const getSamplingParameters = () => {
    let absoluteRadius = Math.abs(5); //resolves issues with negative radius
    return [absoluteRadius * 3, absoluteRadius * 0.02];
    //modify these values (maybe nonlinear function could do) to make the graph look nicer
}

/* FUTURE SPRINT PLANS FOR IMPLICIT FUNCTION MESH GENERATION
    Nerdamer - Library that can handle implicit function solving
    Marching Cubes Algiorhtm OR add distinct surface detecting algorithm on current method
*/
// ID:Integer code corresponding to expression



let yLimit = 15; //figure out the algorithm for determining min/max cutoff values
const noOverLap = 1;

const generateMeshFromFunction = (expression, id) => {
    let parameters = getSamplingParameters();
    let range = parameters[0];
    let step = parameters[1];
    
    const paths = [];

    
    let previousPoint = {
        x: 100,
        y: 100,
        z: 100,
    }
    
    let path = [];



    //CURRENT ISSUE: cannot simply ignore to push due to babylon.
    for (let currentZ = -1 * range; currentZ < range; currentZ = currentZ + step) {
        path = [];

        for (let currentX = -1 * range; currentX < range; currentX = currentX + step) {
            let scope = {
                x: currentX,
                z: currentZ
            }
            let currentY = math.evaluate(expression, scope);

            
            if(Math.abs(currentY) > yLimit) {
                if (currentY < 0) {
                    currentY = -1 * yLimit;
                }
                else {
                    currentY = yLimit;
                }
                /*
                path.push(currentX, yMax, currentZ);
                
                previousPoint = { 
                    x: currentX,
                    y: currentY,
                    z: currentZ
                }
                */
            }
            else {
                /* 
                path.push(previousPoint.x, previousPoint.y, previousPoint.z);
                previousPoint.x = previousPoint.x + noOverLap;
                */
            }
            path.push(new BABYLON.Vector3(currentX, currentY, currentZ)); //THIS WORKS

        }

        paths.push(path);
    }
    

    /* EXPERIMENTAL VERSION for derivative approach
    let currentZ = -1 * range;
    let currentX = -1 * range;
    let paths = [];
    let path = [];
    let stepX = 1;
    let scope = {
        x: currentX,
        z: currentZ
    };

    while(currentZ < range) {
        path = [];
        while (currentX < range) {
            scope = {
                x: currentX,
                z: currentZ
            }

            let currentY = math.evaluate(expression, scope);

            path.push(new BABYLON.Vector3(currentX, currentY, currentZ))
            let d = math.derivative(expression, 'x').evaluate(scope);
            currentX = currentX + math.abs(1 / d);
        }
        currentZ = currentZ + step;
        paths.push(path);
    }
    */

    // BELOW WORKS FINE
    console.log(paths);

    let graphOptions = {
        pathArray: paths,
        updatable: true,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }

    let currentGraph = BABYLON.MeshBuilder.CreateRibbon("graph" + id, graphOptions, myScene);
}

const resizeThreshold = 30;

//generateMeshFromFunction("x^2+z^2", 5);


engine.runRenderLoop(function() {
    myScene.render();
    //resizeGraph();
});

const resizeGraph = () => {
    if (currentCameraState != 'universal') {
        if (Math.abs(lastRadius - camera.radius) > resizeThreshold) {
            lastRadius = camera.radius;
            for (let i = 0; i < numMesh; i++) {
                let currentTextInput = textInputs[i];
                if (currentTextInput.value !== "") {
                    recreateMesh(currentTextInput.value, i + 1);
                }
            }
        }
    }
}

//const resizeInterval = setInterval(resizeGraph, 5000);
//Do we like resizing every few seconds better or instantaneous?

window.addEventListener("resize", function() {
    engine.resize();
});
