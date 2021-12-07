const s = ( sketch ) => {

    let x = 100;
    let y = 100;
  
    sketch.setup = () => {
      sketch.canvas = sketch.createCanvas(200, 200);
      sketch.canvas.parent('resulting-image');
      console.log("hello")
    };
  
    sketch.draw = () => {
      sketch.background(electronCount);
    };
  };
  
  let myp5 = new p5(s);