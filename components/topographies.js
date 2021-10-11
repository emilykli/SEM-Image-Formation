class Topography {
    constructor(selection) {
        this.shape = selection;
    }

    showSelf() {
        stroke(0);
        strokeWeight(1);
        switch (this.shape) {
            case "slope_down":
                this.drawSlopeDown();
                break;
            case "chunk_up":
                this.drawChunkUp();
                break;
            case "chunk_down":
                this.drawChunkDown();
                break;
            case "delta_curve":
                this.drawDeltaCurve();
                break;
        }
    }

    drawSlopeDown()
    {
        fill(0, 0, 40, 75);
        beginShape(TESS);
        vertex(1440-0, 350);
        vertex(1440-400, 400);
        vertex(1440-500, 450);
        vertex(1440-700, 500);
        vertex(1440-1000, 600);
        vertex(1440-1250, 540);
        vertex(1440-1440, 450);
        vertex(1440-1440, 900);
        vertex(1440-0, 900);
        endShape(CLOSE);

        fill(0, 0, 60, 75);
        beginShape(TESS);
        vertex(1440-0, 350);
        vertex(1440-350, 420);
        vertex(1440-500, 500);
        vertex(1440-750, 650);
        vertex(1440-900, 700);
        vertex(1440-1150, 650);
        vertex(1440-1350, 560);
        vertex(1440-1440, 500);
        vertex(1440-1440, 900);
        vertex(1440-0, 900);
        endShape(CLOSE);

        fill(0, 0, 90, 75);
        beginShape(TESS);
        vertex(1440-0, 350);
        vertex(1440-300, 450);
        vertex(1440-600, 650);
        vertex(1440-720, 750);
        vertex(1440-1000, 800);
        vertex(1440-1200, 750);
        vertex(1440-1350, 650);
        vertex(1440-1440, 500);
        vertex(1440-1440, 900);
        vertex(1440-0, 900);
        endShape(CLOSE);
    }

    drawChunkUp()
    {
        fill(0, 0, 40, 75);
        beginShape(TESS);
        vertex(0, 550);
        vertex(480, 550);
        vertex(480, 350);
        vertex(960, 350);
        vertex(960, 550);
        vertex(1440, 550);
        vertex(1440, 900);
        vertex(0, 900);
        endShape(CLOSE);

        fill(0, 0, 60, 75);
        beginShape(TESS);
        vertex(0, 600);
        vertex(450, 600);
        vertex(450, 400);
        vertex(930, 400);
        vertex(930, 600);
        vertex(1440, 600);
        vertex(1440, 900);
        vertex(0, 900);
        endShape(CLOSE);

        fill(0, 0, 90, 75);
        beginShape(TESS);
        vertex(0, 650);
        vertex(420, 650);
        vertex(420, 450);
        vertex(900, 450);
        vertex(900, 650);
        vertex(1440, 650);
        vertex(1440, 900);
        vertex(0, 900);
        endShape(CLOSE);
    }

    drawChunkDown()
    {
        fill(0, 0, 40, 75);
        beginShape(TESS);
        vertex(0, 550);
        vertex(480, 550);
        vertex(480, 750);
        vertex(960, 750);
        vertex(960, 550);
        vertex(1440, 550);
        vertex(1440, 900);
        vertex(0, 900);
        endShape(CLOSE);

        fill(0, 0, 60, 75);
        beginShape(TESS);
        vertex(0, 600);
        vertex(450, 600);
        vertex(450, 800);
        vertex(930, 800);
        vertex(930, 600);
        vertex(1440, 600);
        vertex(1440, 900);
        vertex(0, 900);
        endShape(CLOSE);

        fill(0, 0, 90, 75);
        beginShape(TESS);
        vertex(0, 650);
        vertex(420, 650);
        vertex(420, 850);
        vertex(900, 850);
        vertex(900, 650);
        vertex(1440, 650);
        vertex(1440, 900);
        vertex(0, 900);
        endShape(CLOSE);
    }

    drawDeltaCurve()
    {
        fill(0, 0, 40, 75);
        beginShape(TESS);
        vertex(0, 750);
        vertex(250, 720);
        vertex(500, 650);
        vertex(600, 350);
        vertex(670, 250);
        vertex(770, 250);
        vertex(840, 350);
        vertex(940, 650);
        vertex(1190, 720);
        vertex(1440, 750);
        vertex(1440, 900);
        vertex(0, 900);
        endShape(CLOSE);

        fill(0, 0, 60, 75);
        beginShape(TESS);
        vertex(0, 750);
        vertex(400, 780);
        vertex(520, 700);
        vertex(640, 400);
        vertex(700, 300);
        vertex(800, 340);
        vertex(850, 500);
        vertex(940, 700);
        vertex(1190, 750);
        vertex(1440, 750);
        vertex(1440, 900);
        vertex(0, 900);
        endShape(CLOSE);

        fill(0, 0, 90, 75);
        beginShape(TESS);
        vertex(0, 750);
        vertex(450, 800);
        vertex(520, 750);
        vertex(640, 450);
        vertex(720, 350);
        vertex(800, 390);
        vertex(830, 550);
        vertex(920, 720);
        vertex(1200, 760);
        vertex(1440, 750);
        vertex(1440, 900);
        vertex(0, 900);
        endShape(CLOSE);
    }
}