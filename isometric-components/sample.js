let blue = "#1E88E5";

class SampleDisplay {
    constructor(sampleName) {
        this.shape = sampleName;
        this.row = 0;
        this.column = 0;
    }

    showIsometricView() {
        fill(95);
        rect(50, 550, 400, 300);

        switch (this.shape) {
            case "two_blocks":
                this.drawTwoBlocksIsometric();
                break;
        }
    }

    show2DView() {
        switch (this.shape) {
            case "two_blocks":
                this.drawTwoBlocks2D();
                break;
        }

    }

    drawTwoBlocks2D() {
        switch (this.row) {
            case 0:
                rect(600, 560, 600, 240);
                break;
        }

    }

    drawTwoBlocksIsometric()
    {
        //bottom right
        fill(blue);
        beginShape(TESS);
        vertex(200, 770);
        vertex(200, 830);
        vertex(400, 714.53);
        vertex(400, 654.53);
        endShape(CLOSE);

        //bottom left
        beginShape(TESS);
        vertex(100, 772.26);
        vertex(100, 712.26);
        vertex(200, 770);
        vertex(200, 830);
        endShape(CLOSE);

        //bottom center
        beginShape(TESS);
        vertex(100, 712.26);
        vertex(200, 770);
        vertex(400, 654.53);
        vertex(300, 596.79);
        endShape(CLOSE);

        //top left
        beginShape(TESS);
        vertex(220, 740);
        vertex(170, 711.13);
        vertex(170, 631.13);
        vertex(220, 660);
        endShape(CLOSE);

        //top right
        beginShape(TESS);
        vertex(220, 660);
        vertex(220, 740);
        vertex(270, 711.13);
        vertex(270, 631.13);
        endShape(CLOSE);

        //top center
        beginShape(TESS);
        vertex(270, 631.13);
        vertex(220, 660);
        vertex(170, 631.13);
        vertex(220, 602.26);
        endShape(CLOSE);
    }
}