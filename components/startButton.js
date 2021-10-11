let periwinkle = "#6c66ba";
let darkBlue = "#534d91";
let buttonColor = periwinkle;

class StartButton
{
    constructor()
    {
        this.scanState = false;
    }

    showSelf()
    {
        this.checkMouseStatus();
        stroke(0);
        strokeWeight(2);
        fill(buttonColor);
        rect(50, 60, 250, 100);
        
        textSize(40);
        fill(100);
        text('start scan', 85, 120);
    }

    scan() {
        strokeWeight(180);
        stroke(darkRed);
      
        scanIndex += 1;
      
        if (scanIndex < scanTime) {
          background(15);
          line(720, -100, 120, 900);
        }
      
        else if (scanIndex < scanTime * 2) {
          background(15);
          line(720, -100, 420, 900);
        }
      
        else if (scanIndex < scanTime * 3) {
          background(15);
          line(720, -100, 720, 900);
        }
      
        else if (scanIndex < scanTime * 4) {
          background(15);
          line(720, -100, 1025, 900);
        }
      
        else {
          background(15);
          line(720, -100, 1420, 900);
        }
      
      }

    checkMouseStatus()
    {
        if(mouseX > 50 && mouseY > 60 && mouseX < 300 && mouseY < 160)
        {
            buttonColor = darkBlue;
        }

        else
        {
            buttonColor = periwinkle;
        }
    }
}