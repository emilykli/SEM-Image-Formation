let sample, sampleImage;
let frameCount;

let electrons = [];

let pink = "#D81B6099";

function setup() {
    createCanvas(1440, 900);
    colorMode(HSB, 100);
    background(90);

    strokeWeight(0);
    fill(15);
    rect(0, 800, 1440, 100);

    strokeWeight(1);

    sample = new SampleDisplay("two_blocks");
    sampleImage = new Image();
    frameCount = 0;

    for (let i = 0; i < 20; i++) {
        electrons.push({
          x: 900 + 30 * i,
          y: 0 - 70 * i,
          diameter: 20,
          xVelocity: -3,
          yVelocity: 7,
          downwardsVelocity: 0,
          downwardsAcceleration: 0
        });
      }

}

function draw() {
    background(90);
    fill(15);
    rect(0, 800, 1440, 100);


    sample.showIsometricView();
    sample.show2DView();
    sampleImage.showSelf();
    scan();
}

function scan() {
    let scanColumn = floor(frameCount / 600);

    fill(pink);

    switch (scanColumn) {
        case 0:
            beginShape(TESS);
            vertex(600, 560);
            vertex(720, 560);
            vertex(960, 0);
            vertex(840, 0);
            endShape(CLOSE);

            for(let i = 0; i < electrons.length; i++)
            {
                electrons[i].x += electrons[i].xVelocity;
                if (electrons[i].yVelocity > 0 && electrons[i].downwardsAcceleration != 0) {
                    electrons[i].yVelocity = -1;
                    electrons[i].xVelocity *= 1.2;
                }

                else if (electrons[i].downwardsAcceleration != 0)
                {
                    electrons[i].yVelocity += electrons[i].downwardsAcceleration;
                    electrons[i].y += electrons[i].yVelocity + electrons[i].downwardsAcceleration;
                }
                else{
                    electrons[i].y += electrons[i].yVelocity - electrons[i].downwardsAcceleration;
                }

                ellipse(electrons[i].x, electrons[i].y, electrons[i].diameter);
                console.log(electrons[i].x + " " + electrons[i].y + " " + electrons[i].diameter)

                if(collideRectCircle(600, 560, 600, 240, electrons[i].x, electrons[i].y, electrons[i].diameter)) {
                    electrons[i].yVelocity *= -1;
                    electrons[i].downwardsAcceleration = random(0.05, 0.06);
                    electrons[i].yVelocity += random(-1, 3);
                }
            }
            break;
        case 1:
            beginShape(TESS);
            vertex(720, 560);
            vertex(840, 560);
            vertex(960, 0);
            vertex(840, 0);
            endShape(CLOSE);
            break;
        case 2:
            beginShape(TESS);
            vertex(840, 560);
            vertex(960, 560);
            vertex(960, 0);
            vertex(840, 0);
            endShape(CLOSE);
            break;
        case 3:
            beginShape(TESS);
            vertex(960, 560);
            vertex(1080, 560);
            vertex(960, 0);
            vertex(840, 0);
            endShape(CLOSE);
            break;
        case 4:
            beginShape(TESS);
            vertex(1080, 560);
            vertex(1200, 560);
            vertex(960, 0);
            vertex(840, 0);
            endShape(CLOSE);
            break;

    }

    frameCount += 1;
}