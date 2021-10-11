let sampleShape;
let sampleImage;
let sampleSelect;

function setup() {
  createCanvas(1440, 900);
  colorMode(HSB, 100);

  frameRate(10);
  
  sampleSelect = new SampleSelector();
  sampleShape = new Topography(sampleSelect.getShape());
  sampleImage = new Image();
}



function draw() {
  background(15);

  sampleShape = new Topography(sampleSelect.getShape());
  sampleShape.showSelf();

  sampleImage.showSelf();

  sampleSelect.showSelf();

}
