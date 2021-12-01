var canvasWidth = 792;
var canvasHeight = 720;

var isPlaying;

var canvasCenter = canvasWidth / 2;
var objectiveLensHalfWidth = 100;
var objectiveLensHeight = 50;


var simulationSpeed = 25;

var maxElectronVelocity = 10;

var beamLeftBound, beamRightBound;
var stage; //goes from 1 up to 5 for the 5 different "sections" of a cross section

var electrons = [];

function setup() {

  isPlaying = false;

  var canvas = createCanvas(canvasWidth, canvasHeight);
  console.log(windowWidth * 0.55 + " " + windowHeight * 0.80);

  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');

  // background(round(random(0, 255)),round(random(0, 255)),round(random(0, 255)));
  background(230);

  sample = new Sample("two_blocks");

  stage = 1;
  beamLeftBound = 250; //each stage is 73 px wide
  beamRightBound = 323;


  electrons = [];

  for (let i = 0; i < 20; i++) {
    electrons.push({
      x: canvasCenter + i * 20* simulationSpeed / 100 * maxElectronVelocity * (canvasCenter - 73/2 - beamLeftBound)/(623.5-objectiveLensHeight) + random(0, 30),
      y: -20 - simulationSpeed / 100 * maxElectronVelocity * i * 20,
      diameter: 10,
      xVelocity: -simulationSpeed / 100 * maxElectronVelocity * (canvasCenter - 73/2 - beamLeftBound)/(623.5-objectiveLensHeight),
      yVelocity: simulationSpeed / 100 * maxElectronVelocity,
    });
  }

  console.log("is set up");
}

function draw() {
  background(230);

  if (isPlaying) {
    for (let i = 0; i < electrons.length; i++) {
      electrons[i].x += electrons[i].xVelocity;
      electrons[i].y += electrons[i].yVelocity;
    }
  }

  console.log("simulation speed: " + simulationSpeed);

  drawWrapperBeam();

  fill(255);
  for (let i = 0; i < electrons.length; i++) {
    ellipse(electrons[i].x, electrons[i].y, electrons[i].diameter);
  }

  drawObjectiveLens();
  drawSEMComponents();

  sample.drawTwoBlocksStepped();
}

function playSimulation() {
  isPlaying = true;
}

function pauseSimulation() {
  isPlaying = false;
}

function drawSEMComponents() {

  drawSecondaryDetector();

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
  vertex(canvasCenter - 73/2, objectiveLensHeight);
  vertex(canvasCenter + 73/2, objectiveLensHeight);
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