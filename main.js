song = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
leftWrist_score = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded!");
}

function draw() {
    image(video, 0, 0, 600, 500);
    circle(rightWristX, rightWristY, 20);

    if (rightWristY > 0 && rightWristY <= 100) {
        song.rate(0.5);
        document.getElementById("speed").innerHTML = "Speed: 0.5x";
    } else if (rightWristY > 100 && rightWristY <= 200) {
        song.rate(1);
        document.getElementById("speed").innerHTML = "Speed: 1x";
    } else if (rightWristY > 200 && rightWristY <= 300) {
        song.rate(1.5);
        document.getElementById("speed").innerHTML = "Speed: 1.5x";
    } else if (rightWristY > 300 && rightWristY <= 400) {
        song.rate(2);
        document.getElementById("speed").innerHTML = "Speed: 2x";
    } else if (rightWristY > 400 && rightWristY <= 500) {
        song.rate(2.5);
        document.getElementById("speed").innerHTML = "Speed: 2.5x";
    }

    if (leftWrist_score > 0.2) {
        fill('#FF0000');
        stroke('#FF0000');

        circle(leftWristX, leftWristY, 20);
        leftWristY = Number(leftWristY);
        remove_decimals = floor(leftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume: " + volume;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X: " + leftWristX);
        console.log("Left Wrist Y: " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X: " + rightWristX);
        console.log("Right Wrist Y: " + rightWristY);
        leftWrist_score = results[0].pose.keypoints[9].score;
        rightWrist_score = results[0].pose.keypoints[10].score;

        console.log("Left Wrist Score: " + leftWrist_score);
        console.log("Right Wrist Score: " + rightWrist_score);
    }
}