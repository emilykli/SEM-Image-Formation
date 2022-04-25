
var currentRow;
var currentColumn;

var imageMatrix;

var rectangle_results = [
  [5, 5, 5, 5, 5],
  [5, 10, 10, 4, 4],
  [4, 10, 10, 4, 4],
  [5, 10, 10, 4, 4],
  [5, 5, 5, 5, 5]
]

var pyramid_results = [
  [5, 5, 5, 5, 5],
  [5, 8, 9, 7, 4],
  [5, 12, 14, 11, 4],
  [5, 7, 7, 7, 4],
  [5, 5, 5, 5, 5]
]

var dome_results = [
  [5, 8, 10, 4, 5],
  [5, 10, 12, 10, 4],
  [5, 14, 18, 14, 4],
  [5, 8, 10, 8, 4],
  [5, 5, 5, 5, 5]
]

var spire_results = [
  [5, 5, 5, 5, 5],
  [5, 10, 11, 9, 4],
  [5, 12, 14, 11, 4],
  [5, 6, 7, 5, 4],
  [5, 5, 5, 5, 5]
]

var inverted_pyramid_results = [
  [5, 5, 5, 5, 5],
  [5, 12, 12, 12, 0],
  [5, 12, 12, 12, 0],
  [5, 12, 12, 12, 0],
  [5, 5, 5, 5, 5]
]

const s = (sketch) => {


  sketch.setup = () => {
    sketch.canvas = sketch.createCanvas(200, 200);
    sketch.canvas.parent('resulting-image');

    currentRow = 0;
    currentColumn = 0;
    imageMatrix = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        sketch.fill(0);
        sketch.rect(40 * r, 40 * c, 40, 40);
      }
    }

    // console.log("hello")
  };

  sketch.draw = () => {

    sketch.stroke(105);

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (r == topographyIndex && c == sectionIndex && isPlaying) {
          imageMatrix[r][c] = electronCount;
          // console.log(r + ", " + c + " : " + electronCount)
        }
        sketch.fill(8 * imageMatrix[r][c]);
        sketch.rect(40 * c, 40 * r, 40, 40);
      }
    }
    // sketch.background(electronCount);
  };
};

let myp5 = new p5(s);
