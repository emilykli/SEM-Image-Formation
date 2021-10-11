let sampleShape, sampleImage, sampleSelect, slider, startScan;

let scanIndex = 0;
let scanTime = 20;

let darkRed = "#801f1f";

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


  //startScan.scan();

  startScan.showSelf();

  sampleShape = new Topography(sampleSelect.getShape());
  sampleShape.showSelf();

  sampleImage.showSelf();

  sampleSelect.showSelf();

}
