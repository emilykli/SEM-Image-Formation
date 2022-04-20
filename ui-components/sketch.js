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

var interactionVol = false;

var interactionVolX, interactionVolY;

var electrons_pixel;

var image_matrix;

function setup() {

  interactionVol = false;

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
    let beamCenter = 1 / 2 * (beamLeftBound + beamRightBound)
    let xCoord = canvasCenter + i * 20 * 20 / 100 * maxElectronVelocity * (canvasCenter - beamCenter) / (623.5);
    let yCoord = -20 - 20 / 100 * maxElectronVelocity * i * 20;
    let xVelocity = -35 / 100 * maxElectronVelocity * (canvasCenter - beamCenter) / (623.5);
    let yVelocity = 35 / 100 * maxElectronVelocity;
    let newElectron = new Electron(xCoord, yCoord, xVelocity, yVelocity, i);

    electrons.push(newElectron);
  }

  switch (globalShape){
    case 'two_blocks': {
      image_matrix = rectangle_results;
      break;
    }
    case 'dome': {
      image_matrix = dome_results;
      break;
    }
    case 'inverted_pyramid': {
      image_matrix = inverted_pyramid_results;
      break;
    }
    case 'pyramid': {
      image_matrix = pyramid_results;
      break;
    }
    case 'spire': {
      image_matrix = spire_results;
      break;
    }
  }
  electrons_pixel = electrons_vec_pixel(topographyIndex, sectionIndex, 20, rectangle_results)
  // console.log("is set up");
}

function draw() {
  background(230);
  frameRate(simulationSpeed/100 * 60);

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
        case 'dome': {
          electrons[i].collisionMathDome();
          break;
        }
        case 'pyramid': {
          electrons[i].collisionMathPyramid();
          break;
        }
        case 'inverted_pyramid': {
          electrons[i].collisionMathInvertedPyramid();
          break;
        }
        case 'spire': {
          electrons[i].collisionMathSpire();
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
        interactionVol = false;
        beamLeftBound += 73;
        beamRightBound += 73;

        electronCount = 0;

        electrons = [];

        for (let i = 0; i < 20; i++) {
          let beamCenter = 1 / 2 * (beamLeftBound + beamRightBound)
          let xCoord = canvasCenter + i * 20 * 20 / 100 * maxElectronVelocity * (canvasCenter - beamCenter) / (623.5);
          let yCoord = -20 - 20 / 100 * maxElectronVelocity * i * 20;
          let xVelocity = -35 / 100 * maxElectronVelocity * (canvasCenter - beamCenter) / (623.5);
          let yVelocity = 35 / 100 * maxElectronVelocity;
          let newElectron = new Electron(xCoord, yCoord, xVelocity, yVelocity, i);

          electrons.push(newElectron);
        }
        switch (globalShape){
          case 'two_blocks': {
            const image_matrix = rectangle_results;
            break;
          }
          case 'dome': {
            const image_matrix = dome_results;
            break;
          }
          case 'inverted_pyramid': {
            const image_matrix = inverted_pyramid_results;
            break;
          }
          case 'pyramid': {
            const image_matrix = pyramid_results;
            break;
          }
          case 'spire': {
            const image_matrix = spire_results;
            break;
          }
        }
        electrons_pixel = electrons_vec_pixel(topographyIndex, sectionIndex, 20, image_matrix)
      }
      else {
        if (topographyIndex == 4) {
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

          switch (globalShape) {
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


  fill(255);
  stroke(1);
  for (let i = 0; i < electrons.length; i++) {
    if (electrons[i].diameter != 0) {
      ellipse(electrons[i].x, electrons[i].y, electrons[i].diameter);
    }
  }

  drawObjectiveLens();
  drawSecondaryDetector();

  sample.drawSample();

  // fill(0);
  // rect(250, 642.5, 91.25, 10);
  // rect(250 + 73, 550, 1, 150);
  // rect(250 + 73, 570, 146, 10);
  // fill(color('#A020F0'))
  // rect(250 + 73*3, 550, 1, 150);
  // fill(0)
  // rect(250 + 73 + 109.5, 642.5, 182.5, 10);

  // fill(0);
  // ellipse(432.5, 623.5, 250);

  if (interactionVol && !allMadeContact) {
    drawInteractionVolume();
  }
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
  vertex(canvasCenter - 16.5, 0);
  vertex(canvasCenter + 16.5, 0);
  vertex(beamRightBound, 623.5);
  vertex(beamLeftBound, 623.5);
  endShape(CLOSE);

  if (globalShape == 'inverted_pyramid' && topographyIndex >= 1 && topographyIndex <= 3 && sectionIndex >= 1 && sectionIndex <= 3) {
    fill(230);
    rect(0, 513, 1000, 150)
  }
  stroke(1);
}

function drawSecondaryDetector() {
  var translateX = 0;
  var translateY = 0;

  var secondaryDetectorHeight = 300;
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

function drawInteractionVolume() {
  noStroke();
  fill(30, 30, 30, 100);
  circle(interactionVolX, interactionVolY, 30);
  stroke(1);
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function electrons_vec_pixel(topographyIndex, sectionIndex, num_elec, image){
    detect_num_electrons = image[topographyIndex][sectionIndex]

    let electrons_pixel = []
    for (let i = 0; i < num_elec; i++){
        if (i < detect_num_electrons){
            electrons_pixel.push(true)
        }
        else {
            electrons_pixel.push(false)
        }
    }
    return shuffle(electrons_pixel)
}
