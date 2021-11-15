class Sample {
    constructor(sampleName)
    {
        this.shape = sampleName;
        this.row = 0;
        this.column = 0;
    }

    drawTwoBlocksStepped() {
        var translateX = 250;
        var translateY = 550;
        translate(translateX, translateY);
        fill(160);
        beginShape(TESS);
        vertex(0, 147*0.5);
        vertex(0, 292*0.5);
        vertex(730*0.5, 292*0.5);
        vertex(730*0.5, 147*0.5);
        vertex(365*0.5, 147*0.5);
        vertex(365*0.5, 0);
        vertex(145*0.5, 0);
        vertex(145*0.5, 147*0.5);
        vertex(0, 147*0.5);
        endShape(CLOSE);
        translate(-translateX, -translateY);
    }
}