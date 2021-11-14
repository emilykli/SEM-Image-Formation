class Sample {
    constructor(sampleName)
    {
        this.shape = sampleName;
        this.row = 0;
        this.column = 0;
    }

    drawTwoBlocksStepped() {
        translate(210, 470);
        fill(95);
        beginShape(TESS);
        vertex(0, 147*0.75);
        vertex(0, 292*0.75);
        vertex(730*0.75, 292*0.75);
        vertex(730*0.75, 147*0.75);
        vertex(365*0.75, 147*0.75);
        vertex(365*0.75, 0);
        vertex(145*0.75, 0);
        vertex(145*0.75, 147*0.75);
        vertex(0, 147*0.75);
        endShape(CLOSE);
        translate(-210, -470);
    }
}