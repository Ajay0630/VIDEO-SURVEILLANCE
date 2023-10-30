video = "";
status1 = false;
objects = [];

function preload(){
    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas = createCanvas(1000, 700);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 1000, 700);
    if (status1 == true) {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects are Detected";
            document.getElementById("hashobj").innerHTML = "Number of Objects: " + objects.length;

            fill("#47FF47");
            percent = floor(objects[i].confidence * 100);
            textSize(25);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#47FF47");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function startSurveillance(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model has successfully loaded.");
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}