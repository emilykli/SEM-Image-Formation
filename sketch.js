let sampleShape, sampleImage, sampleSelect, slider, startScan;

let scanIndex = 0;
let scanTime = 20;

let darkRed = "#801f1f";
let periwinkle = "#6c66ba";
let darkBlue = "#534d91";

let buttonColor = periwinkle;
let buttonPressed = false;

function setup() {
  createCanvas(1440, 900);
  colorMode(HSB, 100);

  frameRate(10);

  sampleSelect = new SampleSelector();
  sampleShape = new Topography(sampleSelect.getShape());
  sampleImage = new Image();

  startScan = new StartButton();

  slider = createSlider(0, 100, 100);
  slider.position(50, 200);
  slider.style('width', '250px');
}



function draw() {
  background(15);

  scanTime = (260 - slider.value()) / 5;
  console.log(scanTime);


  if (buttonPressed) {

    startScan.scan();

  }

  startScan.showSelf();

  sampleShape = new Topography(sampleSelect.getShape());
  sampleShape.showSelf();

  // box(70, 70, 70);

  sampleImage.showSelf();

  sampleSelect.showSelf();

}

class StartButton {
  constructor() {
    this.scanState = false;
  }

  showSelf() {
    this.checkMouseStatus();
    stroke(0);
    strokeWeight(2);
    fill(buttonColor);
    rect(50, 60, 250, 100);

    textSize(40);
    fill(100);
    text('start scan', 85, 120);
  }

  scan() {
    strokeWeight(180);
    stroke(darkRed);

    scanIndex += 1;

    if (scanIndex < scanTime) {
      background(15);
      line(720, -100, 120, 900);
    }

    else if (scanIndex < scanTime * 2) {
      background(15);
      line(720, -100, 420, 900);
    }

    else if (scanIndex < scanTime * 3) {
      background(15);
      line(720, -100, 720, 900);
    }

    else if (scanIndex < scanTime * 4) {
      background(15);
      line(720, -100, 1025, 900);
    }

    else {
      background(15);
      line(720, -100, 1420, 900);

      if (scanIndex > scanTime * 5) {

        scanIndex = 0;
        buttonPressed = false;
      }
    }

  }

  checkMouseStatus() {
    if (mouseX > 50 && mouseY > 60 && mouseX < 300 && mouseY < 160) {
      buttonColor = darkBlue;
    }

    else {
      buttonColor = periwinkle;
    }
  }
}

function mouseClicked() {
  if (mouseX > 50 && mouseY > 60 && mouseX < 300 && mouseY < 160) {
    buttonPressed = !buttonPressed;
  }
}
