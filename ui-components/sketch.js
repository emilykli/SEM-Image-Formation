var canvasWidth, canvasHeight;
var isPlaying;

var simulationSpeed = 25;

var maxElectronVelocity = 10;

var electrons = [];

function setup() {
  canvasWidth = 792;
  canvasHeight = 720;

  isPlaying = false;

  var canvas = createCanvas(canvasWidth, canvasHeight);
  console.log(windowWidth * 0.55 + " " + windowHeight * 0.80);

  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');

  // background(round(random(0, 255)),round(random(0, 255)),round(random(0, 255)));
  background(230);

  sample = new Sample("two_blocks");


  electrons = [];

  for (let i = 0; i < 20; i++) {
    electrons.push({
      x: random(250, 323),
      y: -20 - 70 * i,
      diameter: 20,
      xVelocity: 0,
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

  drawSEMComponents();

  for (let i = 0; i < electrons.length; i++) {
    ellipse(electrons[i].x, electrons[i].y, electrons[i].diameter);
  }

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
  var canvasCenter = canvasWidth / 2;
  var objectiveLensHalfWidth = 100;
  var objectiveLensHeight = 50;

  fill(80);
  beginShape(TESS);
  vertex(canvasCenter - objectiveLensHalfWidth, 0);
  vertex(canvasCenter + objectiveLensHalfWidth, 0);
  vertex(canvasCenter + objectiveLensHalfWidth / 2, objectiveLensHeight);
  vertex(canvasCenter - objectiveLensHalfWidth / 2, objectiveLensHeight);
  vertex(canvasCenter - objectiveLensHalfWidth, 0);
  endShape(CLOSE);

  textAlign(CENTER);
  noStroke();
  fill(255);
  text("Objective Lens", canvasCenter, 30);
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