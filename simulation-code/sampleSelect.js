class Sample {
    constructor(sampleName) {
        this.shape = sampleName;
        this.row = 0;
        this.column = 0;
    }

    drawSample() {

        switch (this.shape) {
            case "two_blocks": {
                this.drawTwoBlocksStepped();
                break;
            }

            case "dome": {
                this.drawDome();
                break;
            }

            case "pyramid": {
                this.drawPyramid();
                break;
            }

            case "spire": {
                this.drawSpire();
                break;
            }

            case "inverted_pyramid": {
                this.drawInvertedPyramid();
                break;
            }
        }
    }

    drawTwoBlocksStepped() {
        var translateX = 250;
        var translateY = 550;
        translate(translateX, translateY);
        fill(160);
        noStroke();

        if (topographyIndex == 0 || topographyIndex == 4) {
            rect(0, 73.5, 365, 73.5);
            translate(-translateX, -translateY);
        }
        else {
            beginShape(TESS);
            vertex(0, 73.5);
            vertex(0, 146);
            vertex(365, 146);
            vertex(365, 73.5);
            vertex(219, 73.5);
            vertex(219, 0);
            vertex(73, 0);
            vertex(73, 73.5);
            vertex(0, 73.5);
            endShape(CLOSE);
            translate(-translateX, -translateY);
            stroke(1);
        }

    }

    drawDome() {
        var translateX = 250;
        var translateY = 550;
        translate(translateX, translateY);
        fill(160);
        noStroke();

        rect(0, 73.5, 365, 73.5);

        if(topographyIndex == 0) {
            arc(182.5, 73.5, 141, 141, PI, 2*PI);
        }

        if(topographyIndex == 1) {
            arc(182.5, 73.5, 269, 269, PI, 2*PI);
        }

        if(topographyIndex == 2) {
            arc(182.5, 73.5, 289, 289, PI, 2*PI);
        }

        if(topographyIndex == 3) {
            arc(182.5, 73.5, 228, 228, PI, 2*PI);
        }
        translate(-translateX, -translateY);
    }

    drawPyramid() {
        var translateX = 250;
        var translateY = 550;
        translate(translateX, translateY);
        fill(160);
        noStroke();

        if (topographyIndex == 1) {
            beginShape(TESS);
            vertex(73, 73.5);
            vertex(128.5, 73.5 - 46);
            vertex(236.5, 73.5 - 46);
            vertex(292, 73.5);
            vertex(73, 73.5);
            endShape(CLOSE);
        }

        if (topographyIndex == 2) {
            beginShape(TESS);
            vertex(73, 73.5);
            vertex(164.5, 73.5 - 77);
            vertex(200.5, 73.5 - 77);
            vertex(292, 73.5);
            vertex(73, 73.5);
            endShape(CLOSE);
        }

        if (topographyIndex == 3) {
            beginShape(TESS);
            vertex(73, 73.5);
            vertex(93, 73.5 - 16);
            vertex(272, 73.5 - 16);
            vertex(292, 73.5);
            vertex(73, 73.5);
            endShape(CLOSE);
        }

        rect(0, 73.5, 365, 73.5);
        translate(-translateX, -translateY);
    }

    drawSpire() {
        var translateX = 250;
        var translateY = 550 + 73.5;
        translate(translateX, translateY);
        fill(160);
        noStroke();

        //bezier(182.5, -150 + 73.5, 209, -145.5 + 73.5, 208, -82 + 73.5, 322, 73.5);

        rect(0, 0, 365, 73.5);

        if(topographyIndex == 0) {
            beginShape();
            curveVertex(43,0);
            curveVertex(43,0);
            curveVertex(109.5, -0.5);
            curveVertex(182.5, -3);
            curveVertex(255.5, -0.5);
            curveVertex(322,0);
            curveVertex(322,0);
            endShape();
        }

        if(topographyIndex == 1) {
            beginShape();
            curveVertex(43,0);
            curveVertex(43,0);
            curveVertex(109.5,-84 + 73.5);
            curveVertex(182.5,-105.5 + 73.5);
            curveVertex(255.5,-84 + 73.5);
            curveVertex(322,0);
            curveVertex(322,0);
            endShape();
        }

        if (topographyIndex == 2) {
            beginShape();
            curveVertex(43,0);
            curveVertex(43,0);
            curveVertex(109.5,-91.5 + 73.5);
            curveVertex(182.5,-150 + 73.5);
            curveVertex(255.5,-91.5 + 73.5);
            curveVertex(322,0);
            curveVertex(322,0);
            endShape();
        }

        if (topographyIndex == 3) {
            beginShape();
            curveVertex(43,0);
            curveVertex(43,0);
            curveVertex(109.5,-76.5 + 73.5);
            curveVertex(182.5,-84 + 73.5);
            curveVertex(255.5,-76.5 + 73.5);
            curveVertex(322,0);
            curveVertex(322,0);
            endShape();
        }
        translate(-translateX, -translateY);
    }

    drawInvertedPyramid() {
        var translateX = 250;
        var translateY = 550;
        translate(translateX, translateY);
        fill(160);
        noStroke();

        rect(0, 73.5, 365, 73.5);

        if(topographyIndex == 1 || topographyIndex == 2 || topographyIndex == 3) {
            beginShape(TESS);
            vertex(182.5, 73.5);
            vertex(292, -110.5 + 73.5);
            vertex(73, -110.5 + 73.5);
            vertex(182.5, 73.5);
            endShape(CLOSE);
        }
        translate(-translateX, -translateY); 
    }
}