const s = (sketch) => {

  var currentRow;
  var currentColumn;

  var imageMatrix;

  sketch.setup = () => {
    sketch.canvas = sketch.createCanvas(200, 200);
    sketch.canvas.parent('resulting-image');

    currentRow = 0;
    currentColumn = 0;
    imageMatrix = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];

    // console.log("hello")
  };

  sketch.draw = () => {

    sketch.stroke(105);

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if(r == sectionIndex && c == topographyIndex) {
          imageMatrix[r][c] = electronCount;
        }
        sketch.fill(10 * imageMatrix[r][c]);
        sketch.rect(40*r, 40*c, 40, 40);
      }
    }
    // sketch.background(electronCount);
  };
};

let myp5 = new p5(s);