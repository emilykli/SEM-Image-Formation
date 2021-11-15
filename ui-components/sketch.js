var canvasWidth, canvasHeight;

function setup() {
  canvasWidth = 792;
  canvasHeight = 720;
  var canvas = createCanvas(canvasWidth, canvasHeight);
  console.log(windowWidth * 0.55 + " " + windowHeight * 0.80);

  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');

  // background(round(random(0, 255)),round(random(0, 255)),round(random(0, 255)));
  background(230);

  sample = new Sample("two_blocks");
}

function draw() {
  background(230);
  drawSEMComponents();
  sample.drawTwoBlocksStepped();
}

function drawSEMComponents() {

  drawObjectiveLens();
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