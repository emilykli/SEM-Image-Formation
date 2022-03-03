var canvasWidth = 792;
var canvasHeight = 720;

var isPlaying, initialPress;

var canvasCenter = canvasWidth / 2;
var objectiveLensHalfWidth = 100;
var objectiveLensHeight = 50;

var secondaryDetectorCenterX;
var secondaryDetectorCenterY;


var simulationSpeed = 25;

var maxElectronVelocity = 10;

var beamLeftBound, beamRightBound;
var stage; //goes from 1 up to 5 for the 5 different "sections" of a cross section

var electrons = [];

var electronCount = 0;

var globalShape = 'two_blocks';

var topographyIndex = 0;

var sectionIndex = 0; //help?

var allMadeContact = false;

var allOutOfFrame = false;

var playPause = false;

function setup() {

  isPlaying = false;

  allMadeContact = false;

  allOutOfFrame = false;

  electronCount = 0;

  initialPress = 0;

  var canvas = createCanvas(canvasWidth, canvasHeight);
  // console.log(windowWidth * 0.55 + " " + windowHeight * 0.80);

  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');

  // background(round(random(0, 255)),round(random(0, 255)),round(random(0, 255)));
  background(230);

  sample = new Sample(globalShape);

  beamLeftBound = 270; //each stage is 73 px wide
  beamRightBound = 303;


  electrons = [];

  for (let i = 0; i < 20; i++) {
    let xCoord = canvasCenter + i * 20 * 20 / 100 * maxElectronVelocity * (canvasCenter - 73 / 2 + 20 - beamLeftBound) / (623.5 - objectiveLensHeight);
    let yCoord = -20 - 20 / 100 * maxElectronVelocity * i * 20;
    let xVelocity = -simulationSpeed / 100 * maxElectronVelocity * (canvasCenter - 73 / 2 + 20 - beamLeftBound) / (623.5 - objectiveLensHeight);
    let yVelocity = simulationSpeed / 100 * maxElectronVelocity;
    let newElectron = new Electron(xCoord, yCoord, xVelocity, yVelocity, i);

    electrons.push(newElectron);
  }
  // console.log("is set up");
}

function draw() {
  background(230);

  if (initialPress != 0 && allMadeContact == false) {
    drawWrapperBeam();
  }

  if (isPlaying) {

    for (let i = electrons.length - 1; i >= 0; i -= 1) {
      electrons[i].x += electrons[i].xVel;
      electrons[i].y += electrons[i].yVel;

      switch (globalShape) {
        case 'two_blocks': {
          electrons[i].collisionMathSteppedBlock();
          break;
        }
      }

      electrons[i].secondaryDetectorCollision();

      if (electrons[i].hasMadeContact) {
        electrons[i].electronDriftMath();
      }

      electrons[i].distanceFromDetectorX = abs(electrons[i].x - secondaryDetectorCenterX);
      electrons[i].distanceFromDetectorY = abs(electrons[i].y - secondaryDetectorCenterY);
      electrons[i].distance = sqrt(electrons[i].distanceFromDetectorX * electrons[i].distanceFromDetectorX + electrons[i].distanceFromDetectorY * electrons[i].distanceFromDetectorY);
    }

    let allMadeContactTemp = true;
    for (let i = 0; i < electrons.length; i++) {
      if (electrons[i].hasMadeContact == false) {
        allMadeContactTemp = false;
      }
    }
    if (allMadeContactTemp) {
      allMadeContact = true;
    }
    let allOutOfFrameTemp = true;
    for (let i = 0; i < electrons.length; i++) {
      //console.log(i + " " + electrons[i].outOfFrame);
      if (electrons[i].outOfFrame == false) {
        allOutOfFrameTemp = false;
        //console.log(i);
      }
    }
    if (allOutOfFrameTemp == true) {
      //background(100, 100, 100);
      allOutOfFrame = true;

    }

    if (allOutOfFrame) {
      if (sectionIndex <= 3) {
        sectionIndex += 1;
        allOutOfFrame = false;
        allMadeContact = false;
        beamLeftBound += 73;
        beamRightBound += 73;

        electronCount = 0;

        electrons = [];

        for (let i = 0; i < 20; i++) {
          let xCoord = canvasCenter + i * 20 * 20 / 100 * maxElectronVelocity * (canvasCenter - 73 / 2 + 20 - beamLeftBound) / (623.5 - objectiveLensHeight);
          let yCoord = -20 - 20 / 100 * maxElectronVelocity * i * 20;
          let xVelocity = -simulationSpeed / 100 * maxElectronVelocity * (canvasCenter - 73 / 2 + 20 - beamLeftBound) / (623.5 - objectiveLensHeight);
          let yVelocity = simulationSpeed / 100 * maxElectronVelocity;
          let newElectron = new Electron(xCoord, yCoord, xVelocity, yVelocity, i);

          electrons.push(newElectron);
        }
      }
      else {
        if(topographyIndex == 4) {
          console.log("hi")
          swapPlayPause();
        }
        else {
        topographyIndex += 1;
        sectionIndex = 0;
        playPause = false;
        allOutOfFrame = false;
        allMadeContact = false;
        setup();
        isPlaying = true;
        initialPress = 1;

        switch(globalShape) {
          case 'two_blocks': {
            document.getElementById("isoImage").src = rectImages[topographyIndex];
            break;
          }
          case 'dome': {
            document.getElementById("isoImage").src = domeImages[topographyIndex];
            break;
          }
          case 'inverted_pyramid': {
            document.getElementById("isoImage").src = invertedPyramidImages[topographyIndex];
            break;
          }
          case 'pyramid': {
            document.getElementById("isoImage").src = pyramidImages[topographyIndex];
            break;
          }
          case 'spire': {
            document.getElementById("isoImage").src = spireImages[topographyIndex];
            break;
          }
        }
      }
      }
    }
  }

  // console.log("simulation speed: " + simulationSpeed);

  fill(255);
  stroke(1);
  for (let i = 0; i < electrons.length; i++) {
    ellipse(electrons[i].x, electrons[i].y, electrons[i].diameter);
  }

  drawObjectiveLens();
  drawSecondaryDetector();

  sample.drawSample();

  // fill(0);
  // rect(250, 642.5, 72.5, 10);
  // rect(250 + 72.5, 550, 1, 72.5);
  // rect(323, 560, 109.5, 10);
  // rect(250 + 72.5 + 109.5, 550, 1, 72.5);
  // rect(250 + 73 + 109.5, 642.5, 182.5, 10);
}

function playSimulation() {
  isPlaying = true;

  if (initialPress == 0) {
    initialPress = 1;
  }
}

function pauseSimulation() {
  isPlaying = false;
}

function drawObjectiveLens() {

  fill(80);
  beginShape(TESS);
  vertex(canvasCenter - objectiveLensHalfWidth, 0);
  vertex(canvasCenter + objectiveLensHalfWidth, 0);
  vertex(canvasCenter + 73 / 2, objectiveLensHeight);
  vertex(canvasCenter - 73 / 2, objectiveLensHeight);
  vertex(canvasCenter - objectiveLensHalfWidth, 0);
  endShape(CLOSE);

  textAlign(CENTER);
  noStroke();
  fill(255);
  text("Objective Lens", canvasCenter, 30);
  stroke(1);
}

function drawWrapperBeam() {
  noStroke();
  fill(30);
  beginShape(TESS);
  vertex(canvasCenter - 73 / 2 + 20, objectiveLensHeight);
  vertex(canvasCenter + 73 / 2 - 20, objectiveLensHeight);
  vertex(beamRightBound, 623.5);
  vertex(beamLeftBound, 623.5);
  endShape(CLOSE);
  stroke(1);
}

function drawSecondaryDetector() {
  var translateX = 10;
  var translateY = 200;

  var secondaryDetectorHeight = 70;
  var secondaryDetectorWidth = 180;

  secondaryDetectorCenterX = translateX + secondaryDetectorWidth / 2;
  secondaryDetectorCenterY = translateY + secondaryDetectorHeight / 2;

  translate(translateX, translateY);
  fill(80);
  rect(0, 0, secondaryDetectorWidth, secondaryDetectorHeight);

  noStroke();
  fill(255);
  textAlign(CENTER);
  text("Secondary Detector", secondaryDetectorWidth / 2, secondaryDetectorHeight / 2 + 3);
  stroke(1);
  translate(-translateX, -translateY);
}