const s = (sketch) => {

  var currentRow;
  var currentColumn;

  let imageMatrix;

  sketch.setup = () => {
    sketch.canvas = sketch.createCanvas(200, 200);
    sketch.canvas.parent('resulting-image');

    currentRow = 0;
    currentColumn = 0;
    imageMatrix = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

    console.log("hello")
  };

  sketch.draw = () => {

    sketch.stroke(105);

    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        if (r == 0 && c == 0) {

          sketch.fill(electronCount);
          console.log(electronCount);
        }

        else {
          sketch.fill(0);
        }
        sketch.rect(20*r, 20*c, 20, 20);
      }
    }
    // sketch.background(electronCount);
  };
};

let myp5 = new p5(s);