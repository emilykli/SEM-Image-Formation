let lightPurple = "#c1a7d6";
let darkPurple = "#9f7fb5";

class SampleSelector{
    constructor()
    {
        this.leftArrowColor = lightPurple; //dirty lilac purple
        this.rightArrowColor = lightPurple;
        this.shapeArray = ["slope_down", "chunk_up", "chunk_down", "delta_curve"];
        this.currentShapeIndex = 0;
    }

    showSelf()
    {
        this.checkMouseStatus();
        
        // BOXES
        strokeWeight(0.5);
        stroke(0);

        fill(this.leftArrowColor);
        rect(1130, 680, 50, 180);
        fill(this.rightArrowColor);
        rect(1360, 680, 50, 180);

        fill(100);
        rect(1180, 680, 180, 180);

        //ARROW DECALS
        strokeWeight(4.5);
        stroke(100);

        //LEFT ARROW
        line(1145, 770, 1165, 740);
        line(1145, 770, 1165, 800);

        //RIGHT ARROW
        line(1395, 770, 1375, 740);
        line(1395, 770, 1375, 800);

        stroke(0);
        switch (this.currentShapeIndex){
            case 0:
                this.drawSlopeDown();
                break;

            case 1:
                this.drawChunkUp();
                break;

            case 2:
                this.drawChunkDown();
                break;
            
            case 3:
                this.drawDeltaCurve();
                break;
        }
        
    }

    drawSlopeDown()
    {
        bezier(1182, 770, 1250, 815, 1290, 815, 1357, 770);
    }

    drawChunkUp()
    {
        line(1182, 790, 1230, 790);
        line(1230, 790, 1230, 750);
        line(1230, 750, 1309, 750);
        line(1309, 750, 1309, 790);
        line(1309, 790, 1357, 790);
    }

    drawChunkDown()
    {
        line(1182, 770, 1230, 770);
        line(1230, 770, 1230, 810);
        line(1230, 810, 1309, 810);
        line(1309, 810, 1309, 770);
        line(1309, 770, 1357, 770);
    }

    drawDeltaCurve()
    {
        bezier(1182, 840, 1265, 650, 1275, 650, 1357, 840);
    }

    checkMouseStatus()
    {

        //check if mouse is over left arrow button
        if(mouseX > 1130 && mouseX < 1180 && mouseY > 680 && mouseY < 860)
        {
            this.leftArrowColor = darkPurple; //darker purple

            if(mouseIsPressed)
            {
                this.currentShapeIndex -= 1;
                if(this.currentShapeIndex < 0)
                {
                    this.currentShapeIndex = 3;
                }
            }
            
        }
        else
        {
            this.leftArrowColor = lightPurple;
        }

        //check if mouse is over right arrow button
        if(mouseX > 1360 && mouseX < 1410 && mouseY > 680 && mouseY < 860)
        {
            this.rightArrowColor = darkPurple; //darker purple

            if(mouseIsPressed)
            {
                this.currentShapeIndex += 1;
                if(this.currentShapeIndex > 3)
                {
                    this.currentShapeIndex = 0;
                }
            }

        }
        else
        {
            this.rightArrowColor = lightPurple;
        }
    }

    getShape()
    {
        return this.shapeArray[this.currentShapeIndex];
    }
}