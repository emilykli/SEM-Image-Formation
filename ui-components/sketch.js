function setup() {
    var canvas = createCanvas(windowWidth * 0.55, windowHeight * 0.80);
   
    // Move the canvas so it’s inside our <div id="sketch-holder">.
    canvas.parent('sketch-holder');
  
    // background(round(random(0, 255)),round(random(0, 255)),round(random(0, 255)));
    background(230);
    
    sample = new Sample("two_blocks");
  }

function draw()
  {
    background(230);
    sample.drawTwoBlocksStepped();
  }