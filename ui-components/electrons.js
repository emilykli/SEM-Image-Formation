class Electron {
    constructor(xCoordinate, yCoordinate, xVelocity, yVelocity, i) {
        this.x = xCoordinate;
        this.y = yCoordinate;
        this.diameter = 12;
        this.xVel = xVelocity;
        this.yVel = yVelocity;
        this.index = i;
        this.hasMadeContact = false;
        this.distanceFromDetectorX = abs(this.x - secondaryDetectorCenterX);
        this.distanceFromDetectorY = abs(this.y - secondaryDetectorCenterY);
        this.distance = sqrt(this.distanceFromDetectorX * this.distanceFromDetectorX + this.distanceFromDetectorY * this.distanceFromDetectorY);
        this.collidedWithDetector = false;
        this.outOfFrame = false;
    }

    collisionMathSteppedBlock() {
        const detect = [[[4,5,6,7,8],[4,5,6,7,8],[5,6,7,8,9],[5,6,7,8,9],[6,7,8,9]],[[4,5,6,7,8],[5,6,7,8,9],[5,6,7,8,9],[5],[6,7,8,9]],[[4,5,6,7,8],[5,6,7,8,9],[5,6,7,8,9],[5],[6,7,8,9]],[[4,5,6,7,8],[5,6,7,8,9],[5,6,7,8,9],[5],[6,7,8,9]],[[4,5,6,7,8],[4,5,6,7,8],[5,6,7,8,9],[5,6,7,8,9],[6,7,8,9]]];
        const nodetect = [[[0,1,2,3,9],[0,1,2,3,9],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4,5]],[[0,1,2,3,9],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4,6,7,8,9],[0,1,2,3,4,5]],[[0,1,2,3,9],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4,6,7,8,9],[0,1,2,3,4,5]],[[0,1,2,3,9],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4,6,7,8,9],[0,1,2,3,4,5]],[[0,1,2,3,9],[0,1,2,3,9],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4,5]]];

        if (topographyIndex == 0 || topographyIndex == 4) {
            if (collideRectCircle(250, 570 + 145 / 2, 365, 10, this.x, this.y, this.diameter)) //collides with left region in
            {
                if (this.hasMadeContact) {
                    this.diameter = 0;
                    this.outOfFrame = true;
                }

                let totalVelocity = sqrt(this.xVel * this.xVel + this.yVel * this.yVel);
                let randomAngle = electron_initial_angle(topographyIndex, sectionIndex, electrons_pixel, detect, nodetect, this.index);

                if (randomAngle == 0 || randomAngle == PI) {
                    this.diameter = 0;
                    this.outOfFrame = true;
                    this.hasMadeContact = true;
                }

                this.xVel = totalVelocity * cos(randomAngle);
                this.yVel = -totalVelocity * sin(randomAngle);
                if (!interactionVol) {
                    interactionVol = true;
                    interactionVolX = this.x;
                    interactionVolY = this.y;
                }
                this.x += this.xVel * 2;
                this.y += this.yVel * 2;
                this.hasMadeContact = true;


            }

            if (this.hasMadeContact && (this.x < 0 || this.y < 0 || this.x > canvasWidth || this.y > canvasHeight)) {
                this.outOfFrame = true;
                this.diameter = 0;
            }
        }
        else {
            if (collideRectCircle(250, 642.5, 91.25, 10, this.x, this.y, this.diameter) || collideRectCircle(250 + 75, 570, 144, 10, this.x, this.y, this.diameter) || collideRectCircle(250 + 73 + 109.5, 642.5, 182.5, 10, this.x, this.y, this.diameter)) //collides with flat region
            {

                let totalVelocity = sqrt(this.xVel * this.xVel + this.yVel * this.yVel);
                let randomAngle = electron_initial_angle(topographyIndex, sectionIndex, electrons_pixel, detect, nodetect, this.index);

                if (randomAngle == 0 || randomAngle == PI) {
                    this.diameter = 0;
                    this.outOfFrame = true;
                    this.hasMadeContact = true;
                }

                this.xVel = totalVelocity * cos(randomAngle);
                this.yVel = -totalVelocity * sin(randomAngle);
                if (!interactionVol) {
                    interactionVol = true;
                    interactionVolX = this.x;
                    interactionVolY = this.y;
                }

                this.x += this.xVel * 2;
                this.y += this.yVel * 2;
                this.hasMadeContact = true;


            }

            else if (collideRectCircle(250 + 73, 550, 1, 150, this.x, this.y, this.diameter) || collideRectCircle(250 + 73 * 3, 550, 1, 150, this.x, this.y, this.diameter)) {
                this.diameter = 0;
                this.outOfFrame = true;
            }
            if (this.hasMadeContact && (this.x < 0 || this.y < 0 || this.x > canvasWidth || this.y > canvasHeight)) {
                this.outOfFrame = true;
                this.diameter = 0;
            }
        }
    }

    collisionMathDome() {
        const detect = [[[4,5,6,7,8],[4,5,6,7,8],[0,1,2,3,4],[5,6],[6,7,8,9]],[[4,5,6,7,8],[2,3,4,5,6,7],[0,1,2,3,4],[0,1,9],[6]],[[2,4,5,6,7,8],[3,4,5,6,7],[0,1,3,4],[0,1,9],[2,6]],[[3,4,5,6,7,8],[4,5,6,7],[0,1,2,4],[0,1,3,9],[3,6,7]],[[4,5,6,7,8],[4,5,6,7,8],[5,6,7,8,9],[5,6,7,8,9],[6,7,8,9]]];
        const nodetect = [[[0,1,2,3,9],[0,1,2,3,9],[5,6,7,8,9],[0,1,2,3,4,7,8,9],[0,1,2,3,4,5]],[[0,1,2,3,9],[0,1,8,9],[5,6,7,8,9],[2,3,4,5,6,7,8],[0,1,2,3,4,5,7,8,9]],[[0,1,3,9],[0,1,2,8,9],[2,5,6,7,8,9],[2,3,4,5,6,7,8],[0,1,3,4,5,7,8,9]],[[0,1,2,9],[0,1,2,3,8,9],[3,5,6,7,8,9],[2,4,5,6,7,8],[0,1,2,4,5,8,9]],[[0,1,2,3,9],[0,1,2,3,9],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4,5]]];

        let totalVelocity = sqrt(this.xVel * this.xVel + this.yVel * this.yVel);
        let randomAngle = electron_initial_angle(topographyIndex, sectionIndex, electrons_pixel, detect, nodetect, this.index);
        if (randomAngle == 0) {
            randomAngle += 0.1;
        }
        if (randomAngle == PI) {
            randomAngle -= 0.1;
        }

        if (topographyIndex == 0) {
            if (collideCircleCircle(250 + 182.5, 550 + 73.5, 120, this.x, this.y, this.diameter)) {
                if (this.hasMadeContact && sectionIndex != 2) {
                    this.diameter = 0;
                    this.outOfFrame = true;
                }
                let circleSlope = (this.y - 623.5) / (this.x - 432.5);
                let circleAngle = atan(-1 / circleSlope);
                this.xVel = -totalVelocity * cos(circleAngle + randomAngle);
                this.yVel = -totalVelocity * sin(circleAngle + randomAngle);

                if (!interactionVol) {
                    interactionVol = true;
                    interactionVolX = this.x;
                    interactionVolY = this.y;
                }

                this.x += this.xVel * 2;
                this.y += this.yVel * 2;
                this.hasMadeContact = true;

            }
        }

        if (topographyIndex == 1) {
            if (collideCircleCircle(250 + 182.5, 550 + 73.5, 245, this.x, this.y, this.diameter)) {
                if (this.hasMadeContact && sectionIndex != 2) {
                    this.diameter = 0;
                    this.outOfFrame = true;
                }
                let circleSlope = (this.y - 623.5) / (this.x - 432.5);
                let circleAngle = atan(-1 / circleSlope);
                this.xVel = -totalVelocity * cos(circleAngle + randomAngle);
                this.yVel = -totalVelocity * sin(circleAngle + randomAngle);

                if (!interactionVol) {
                    interactionVol = true;
                    interactionVolX = this.x;
                    interactionVolY = this.y;
                }

                this.x += this.xVel * 2;
                this.y += this.yVel * 2;
                this.hasMadeContact = true;

            }
        }

        if (topographyIndex == 2) {
            if (collideCircleCircle(250 + 182.5, 550 + 73.5, 265, this.x, this.y, this.diameter)) {
                if (this.hasMadeContact && sectionIndex != 2) {
                    this.diameter = 0;
                    this.outOfFrame = true;
                }
                let circleSlope = (this.y - 623.5) / (this.x - 432.5);
                let circleAngle = atan(-1 / circleSlope);
                this.xVel = -totalVelocity * cos(circleAngle + randomAngle);
                this.yVel = -totalVelocity * sin(circleAngle + randomAngle);

                if (!interactionVol) {
                    interactionVol = true;
                    interactionVolX = this.x;
                    interactionVolY = this.y;
                }

                this.x += this.xVel * 2;
                this.y += this.yVel * 2;
                this.hasMadeContact = true;


            }
        }

        if (topographyIndex == 3) {
            if (collideCircleCircle(250 + 182.5, 550 + 73.5, 205, this.x, this.y, this.diameter)) {
                if (this.hasMadeContact && sectionIndex != 2) {
                    this.diameter = 0;
                    this.outOfFrame = true;
                }
                let circleSlope = (this.y - 623.5) / (this.x - 432.5);
                let circleAngle = atan(-1 / circleSlope);
                this.xVel = -totalVelocity * cos(circleAngle + randomAngle);
                this.yVel = -totalVelocity * sin(circleAngle + randomAngle);
                if (!interactionVol) {
                    interactionVol = true;
                    interactionVolX = this.x;
                    interactionVolY = this.y;
                }
                this.x += this.xVel * 2;
                this.y += this.yVel * 2;
                this.hasMadeContact = true;


            }
        }



        if (collideRectCircle(250, 570 + 145 / 2, 365, 10, this.x, this.y, this.diameter))
        {
            if (this.hasMadeContact) {
                this.diameter = 0;
                this.outOfFrame = true;
            }

            this.xVel = totalVelocity * cos(randomAngle);
            this.yVel = -totalVelocity * sin(randomAngle);

            if (!interactionVol) {
                interactionVol = true;
                interactionVolX = this.x;
                interactionVolY = this.y;
            }

            this.x += this.xVel * 2;
            this.y += this.yVel * 2;
            this.hasMadeContact = true;
        }

        if (this.hasMadeContact && (this.x < 0 || this.y < 0 || this.x > canvasWidth || this.y > canvasHeight)) {
            this.outOfFrame = true;
            this.diameter = 0;
        }
    }

    collisionMathPyramid() {
        const detect = [[[4,5,6,7,8],[4,5,6,7,8],[5,6,7,8,9],[5,6,7,8,9],[6,7,8,9]],[[4,5,6,7,8],[2,3,4,5,6],[5,6,7,8,9],[3,4,5,6,7,8],[6,7,8,9]],[[4,5,6,7,8],[1,2,3,4,5,6],[5,6,7,8,9],[2,3,4,5,6],[6,7,8,9]],[[4,5,6,7,8],[4,5,6,7,8,9],[5,6,7,8,9],[5,6,7,8,9],[6,7,8,9]],[[4,5,6,7,8],[4,5,6,7,8],[5,6,7,8,9],[5,6,7,8,9],[6,7,8,9]]];
        const nodetect = [[[0,1,2,3,9],[0,1,2,3,9],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4,5]],[[0,1,2,3,9],[0,1,7,8,9],[0,1,2,3,4],[0,1,2,9],[0,1,2,3,4,5]],[[0,1,2,3,9],[0,7,8,9],[0,1,2,3,4],[0,1,7,8,9],[0,1,2,3,4,5]],[[0,1,2,3,9],[0,1,2,3],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4,5]],[[0,1,2,3,9],[0,1,2,3,9],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4,5]]];

        let totalVelocity = sqrt(this.xVel * this.xVel + this.yVel * this.yVel);
        let randomAngle = electron_initial_angle(topographyIndex, sectionIndex, electrons_pixel, detect, nodetect, this.index);

        let bottomLeftX = 73 + 250;
        let bottomRightX = 292 + 250;
        let bottomY = 73.5 + 550 + 20;

        let leftVertexX, leftVertexY, rightVertexX, rightVertexY;

        switch (topographyIndex) {
            case 1: {
                leftVertexX = 128.5 + 250;
                leftVertexY = 73.5 - 46 + 550;
                rightVertexX = 236.5 + 250;
                rightVertexY = 73.5 - 46 + 550;
                break;
            }

            case 2: {
                leftVertexX = 164.5 + 250;
                leftVertexY = 73.5 - 77 + 550;
                rightVertexX = 200.5 + 250;
                rightVertexY = 73.5 - 77 + 550;
                break;
            }

            case 3: {
                leftVertexX = 93 + 250;
                leftVertexY = 73.5 - 16 + 550;
                rightVertexX = 272 + 250;
                rightVertexY = 73.5 - 16 + 550;
                break;
            }
        }

        if (topographyIndex == 1 || topographyIndex == 2 || topographyIndex == 3) {
            leftVertexY += 20;
            rightVertexY += 20;

            //top surface
            if (collideLineCircle(leftVertexX, leftVertexY, rightVertexX, rightVertexY, this.x, this.y, this.diameter)) {
                this.xVel = totalVelocity * cos(randomAngle);
                this.yVel = -totalVelocity * sin(randomAngle);
                if (!interactionVol) {
                    interactionVol = true;
                    interactionVolX = this.x;
                    interactionVolY = this.y;
                }
                this.x += this.xVel * 2;
                this.y += this.yVel * 2;
                this.hasMadeContact = true;
            }

            //side surface
            if (collideLineCircle(leftVertexX, leftVertexY, bottomLeftX, bottomY, this.x, this.y, this.diameter)) {
                if (this.hasMadeContact && sectionIndex != 1 && sectionIndex != 3) {
                    this.diameter = 0;
                    this.hasMadeContact = true;
                    this.outOfFrame = true;
                }

                let slope = (bottomY - leftVertexY) / (leftVertexX - bottomLeftX);
                let angle = atan(slope)

                this.xVel = totalVelocity * cos(randomAngle + angle);
                this.yVel = -totalVelocity * sin(randomAngle + angle);
                if (!interactionVol) {
                    interactionVol = true;
                    interactionVolX = this.x;
                    interactionVolY = this.y;
                }
                this.x += this.xVel * 2;
                this.y += this.yVel * 2;
                this.hasMadeContact = true;


            }

            if (collideLineCircle(bottomRightX, bottomY, rightVertexX, rightVertexY, this.x, this.y, this.diameter)) {
                if (this.hasMadeContact && sectionIndex != 1 && sectionIndex != 3) {
                    this.diameter = 0;
                    this.hasMadeContact = true;
                    this.outOfFrame = true;
                }

                let slope = (bottomY - rightVertexY) / (bottomRightX - rightVertexX);
                let angle = atan(slope)

                this.xVel = totalVelocity * cos(randomAngle + angle);
                this.yVel = -totalVelocity * sin(randomAngle + angle);
                if (!interactionVol) {
                    interactionVol = true;
                    interactionVolX = this.x;
                    interactionVolY = this.y;
                }
                this.x += this.xVel * 2;
                this.y += this.yVel * 2;
                this.hasMadeContact = true;
            }
        }

        if (collideRectCircle(250, 570 + 145 / 2, 365, 10, this.x, this.y, this.diameter)) //collides with left region in
        {
            if (this.hasMadeContact) {
                this.diameter = 0;
                this.outOfFrame = true;
            }

            if ((topographyIndex != 0 && topographyIndex != 4) && (sectionIndex == 1 || sectionIndex == 3)) {
                this.diameter = 0;
                this.outOfFrame = true;
            }
            let totalVelocity = sqrt(this.xVel * this.xVel + this.yVel * this.yVel);
            let randomAngle = electron_initial_angle(topographyIndex, sectionIndex, electrons_pixel, detect, nodetect, this.index);

            this.xVel = totalVelocity * cos(randomAngle);
            this.yVel = -totalVelocity * sin(randomAngle);
            if (!interactionVol) {
                interactionVol = true;
                interactionVolX = this.x;
                interactionVolY = this.y;
            }
            this.x += this.xVel * 2;
            this.y += this.yVel * 2;
            this.hasMadeContact = true;
        }

        if (this.hasMadeContact && (this.x < 0 || this.y < 0 || this.x > canvasWidth || this.y > canvasHeight)) {
            this.outOfFrame = true;
            this.diameter = 0;
        }
    }

    collisionMathInvertedPyramid() {
        const detect = [[[4,5,6,7,8],[4,5,6,7,8],[5,6,7,8,9],[5,6,7,8,9],[6,7,8,9]],[[4,5,6,7,8],[5,6,7,8,9],[5,6,7,8,9],[6,7,8,9],[]],[[4,5,6,7,8],[5,6,7,8,9],[5,6,7,8,9],[6,7,8,9],[]],[[4,5,6,7,8],[5,6,7,8,9],[5,6,7,8,9],[6,7,8,9],[]],[[4,5,6,7,8],[4,5,6,7,8],[5,6,7,8,9],[5,6,7,8,9],[6,7,8,9]]];
        const nodetect = [[[0,1,2,3,9],[0,1,2,3,9],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4,5]],[[0,1,2,3,9],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4,5],[0,1,2,3,4,5,6,7,8,9]],[[0,1,2,3,9],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4,5],[0,1,2,3,4,5,6,7,8,9]],[[0,1,2,3,9],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4,5],[0,1,2,3,4,5,6,7,8,9]],[[0,1,2,3,9],[0,1,2,3,9],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4,5]]];

        let totalVelocity = sqrt(this.xVel * this.xVel + this.yVel * this.yVel);
        let randomAngle = electron_initial_angle(topographyIndex, sectionIndex, electrons_pixel, detect, nodetect, this.index);
        if (randomAngle == 0) {
            randomAngle += 0.1;
        }
        if (randomAngle == PI) {
            randomAngle -= 0.1;
        }

        if (topographyIndex == 1 || topographyIndex == 2 || topographyIndex == 3) {
            //top surface
            if (collideLineCircle(323, 533, 542, 533, this.x, this.y, this.diameter)) {
                if (randomAngle == 0 || randomAngle == PI) {
                    this.diameter = 0;
                    this.hasMadeContact = true;
                    this.outOfFrame = true;
                }
                this.xVel = totalVelocity * cos(randomAngle);
                this.yVel = -totalVelocity * sin(randomAngle);
                if (!interactionVol) {
                    interactionVol = true;
                    interactionVolX = this.x;
                    interactionVolY = this.y;
                }
                this.x += this.xVel * 2;
                this.y += this.yVel * 2;
                this.hasMadeContact = true;

            }

            //side bits
            if (collideLineCircle(323, 513, 432.5, 623.5, this.x, this.y, this.diameter) || collideLineCircle(542, 513, 432.5, 623.5, this.x, this.y, this.diameter)) {
                this.diameter = 0;
                this.hasMadeContact = true;
                this.outOfFrame = true;
            }
        }

        if (collideRectCircle(250, 570 + 145 / 2, 365, 10, this.x, this.y, this.diameter)) //collides with left region in
        {
            if (this.hasMadeContact) {
                this.diameter = 0;
                this.outOfFrame = true;
            }

            let totalVelocity = sqrt(this.xVel * this.xVel + this.yVel * this.yVel);
            let randomAngle = electron_initial_angle(topographyIndex, sectionIndex, electrons_pixel, detect, nodetect, this.index);

            if (randomAngle == 0 || randomAngle == PI) {
                this.hasMadeContact = true;
                this.outOfFrame = true;
            }

            this.xVel = totalVelocity * cos(randomAngle);
            this.yVel = -totalVelocity * sin(randomAngle);
            if (!interactionVol) {
                interactionVol = true;
                interactionVolX = this.x;
                interactionVolY = this.y;
            }
            this.x += this.xVel * 2;
            this.y += this.yVel * 2;
            this.hasMadeContact = true;
        }

        if (this.hasMadeContact && (this.x < 0 || this.y < 0 || this.x > canvasWidth || this.y > canvasHeight)) {
            this.outOfFrame = true;
            this.diameter = 0;
        }
    }

    collisionMathSpire() {
        const detect = [[[4,5,6,7,8],[5,6,7,8,9],[5,6,7,8,9],[5,6,7,8,9],[6,7,8,9]],[[1,2,3,4,5],[2,3,4,5,6],[0,1,2,3,4],[0,1,2],[0,1,2,3]],[[1,2,3,4,5],[2,3,4,5,6],[0,1,2,3,4],[0,1,2],[0,1,2,3]],[[1,2,3,4,5],[1,2,3,4,5],[0,1,2,3,4],[0,1,2,3],[0,1,2,3]],[[4,5,6,7,8],[4,5,6,7,8],[5,6,7,8,9],[5,6,7,8,9],[6,7,8,9]]];
        const nodetect = [[[0,1,2,3,9],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4,5]],[[0,6,7,8,9],[0,1,7,8,9],[5,6,7,8,9],[3,4,5,6,7,8,9],[4,5,6,7,8,9]],[[0,6,7,8,9],[0,1,7,8,9],[5,6,7,8,9],[3,4,5,6,7,8,9],[4,5,6,7,8,9]],[[0,6,7,8,9],[0,6,7,8,9],[5,6,7,8,9],[4,5,6,7,8,9],[4,5,6,7,8,9]],[[0,1,2,3,9],[0,1,2,3,9],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4,5]]];

        let totalVelocity = sqrt(this.xVel * this.xVel + this.yVel * this.yVel);
        let randomAngle = electron_initial_angle(topographyIndex, sectionIndex, electrons_pixel, detect, nodetect, this.index);
        let slope, angle;

        switch (topographyIndex) {
            case 0:
                if (collideLineCircle(250, 623.5 + 20, 323, 623.5 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }

                    slope = 0;
                    angle = atan(slope);


                    this.xVel = totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;
                }

                if (collideLineCircle(323, 623.5 + 20, 396, 622 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = (622 - 623.5) / (396 - 323);
                    angle = atan(slope);

                    this.xVel = totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;
                }
                if (collideLineCircle(396, 622 + 20, 469, 622 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = 0;
                    angle = atan(slope);

                    this.xVel = totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;

                }
                if (collideLineCircle(469, 622 + 20, 542, 623.5 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = (622 - 623.5) / (469 - 542);
                    angle = atan(slope);

                    this.xVel = totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;

                }
                if (collideLineCircle(542, 623.5 + 20, 615, 623.5 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = 0;
                    angle = atan(slope);

                    this.xVel = totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;
                }
                break;

            case 1:
                if (collideLineCircle(250, 623.5 + 20, 323, 623.5 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = 0;
                    angle = atan(slope);

                    this.xVel = -totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;
                }
                if (collideLineCircle(323, 623.5 + 20, 396, 605 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = (605 - 623.5) / (396 - 323);
                    angle = atan(slope);

                    this.xVel = -totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;

                }
                if (collideLineCircle(377, 610 + 20, 420.3, 595 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = (595 - 610) / (420.3 - 377);
                    angle = atan(slope);

                    this.xVel = -totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;

                }
                if (collideLineCircle(420.3, 593 + 20, 444.6, 593 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = 0;
                    angle = atan(slope);

                    this.xVel = -totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;
                }
                if (collideLineCircle(444.6, 595 + 20, 488, 610 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = (610 - 595) / (488 - 444.6);
                    angle = atan(slope);

                    this.xVel = -totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;

                }
                if (collideLineCircle(469, 605 + 20, 542, 623.5 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = (605 - 623.5) / (469 - 542);
                    angle = atan(slope);

                    this.xVel = -totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;

                }
                if (collideLineCircle(542, 623.5 + 20, 615, 623.5 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = 0;
                    angle = atan(slope);

                    this.xVel = -totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;

                }
                break;

            case 2:
                if (collideLineCircle(250, 623.5 + 20, 323, 623.5 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = 0;
                    angle = atan(slope);

                    this.xVel = -totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;
                }
                if (collideLineCircle(323, 623.5 + 20, 396, 590 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = (590 - 623.5) / (396 - 323);
                    angle = atan(slope);

                    this.xVel = -totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;
                }
                if (collideLineCircle(377, 595 + 20, 420.3, 555 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = (555 - 595) / (420.3 - 377);
                    angle = atan(slope);

                    this.xVel = -totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;

                }
                if (collideLineCircle(420.3, 553 + 20, 444.6, 553 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = 0;
                    angle = atan(slope);

                    this.xVel = -totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;

                }
                if (collideLineCircle(444.6, 555 + 20, 488, 595 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = (595 - 555) / (488 - 444.6);
                    angle = atan(slope);

                    this.xVel = -totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;
                }
                if (collideLineCircle(469, 590 + 20, 542, 623.5 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = (590 - 623.5) / (469 - 542);
                    angle = atan(slope);

                    this.xVel = -totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;
                }
                if (collideLineCircle(542, 623.5 + 20, 615, 623.5 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = 0;
                    angle = atan(slope);

                    this.xVel = -totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;

                }
                break;

            case 3:
                if (collideLineCircle(250, 623.5 + 20, 323, 623.5 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = 0;
                    angle = atan(slope);

                    this.xVel = -totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;

                }
                if (collideLineCircle(323, 623.5 + 20, 396, 617 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = (617 - 623.5) / (396 - 323);
                    angle = atan(slope);

                    this.xVel = -totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;

                }
                if (collideLineCircle(396, 616 + 20, 469, 616 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = 0;
                    angle = atan(slope);

                    this.xVel = -totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;
                }
                if (collideLineCircle(469, 617 + 20, 542, 623.5 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = (617 - 623.5) / (469 - 542);
                    angle = atan(slope);

                    this.xVel = -totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;
                }
                if (collideLineCircle(542, 623.5 + 20, 615, 623.5 + 20, this.x, this.y, this.diameter)) {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }
                    slope = 0;
                    angle = atan(slope);

                    this.xVel = -totalVelocity * cos(randomAngle + angle);
                    this.yVel = -totalVelocity * sin(randomAngle + angle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;
                }
                break;

            case 4:
                if (collideRectCircle(250, 570 + 145 / 2, 365, 10, this.x, this.y, this.diameter)) //collides with left region in
                {
                    if (this.hasMadeContact) {
                        this.diameter = 0;
                        this.outOfFrame = true;
                    }

                    let totalVelocity = sqrt(this.xVel * this.xVel + this.yVel * this.yVel);
                    let randomAngle = electron_initial_angle(topographyIndex, sectionIndex, electrons_pixel, detect, nodetect, this.index);

                    this.xVel = totalVelocity * cos(randomAngle);
                    this.yVel = -totalVelocity * sin(randomAngle);
                    if (!interactionVol) {
                        interactionVol = true;
                        interactionVolX = this.x;
                        interactionVolY = this.y;
                    }
                    this.x += this.xVel * 2;
                    this.y += this.yVel * 2;
                    this.hasMadeContact = true;

                }
                break;

        }

        if (this.hasMadeContact && (this.x < 0 || this.y < 0 || this.x > canvasWidth || this.y > canvasHeight)) {
            this.outOfFrame = true;
            this.diameter = 0;
        }

    }

    electronDriftMath() {
        var P_detector = 400;
        var KE = 8.01 * Math.pow(10, -18);
        var delta_t = 0.001;
        var q_e = 1.602 * Math.pow(10, -19);

        var A = P_detector * q_e / KE * 5;
        console.log(secondaryDetectorCenterX);
        console.log(secondaryDetectorCenterY);
        var det_x0 = secondaryDetectorCenterX;
        var det_y0 = secondaryDetectorCenterY + 50;
        var sigma_x = 1050;
        var sigma_y = 750;

        var E_field = electric_field(this.x, this.y, A, det_x0, det_y0, sigma_x, sigma_y);


        this.x += delta_t * this.xVel;
        this.y += delta_t * this.yVel;

        this.xVel += delta_t * E_field[0];
        this.yVel += delta_t * E_field[1];

    }

    secondaryDetectorCollision() {
        if (collideRectCircle(0, 0, 180, 300, this.x, this.y, this.diameter) && this.collidedWithDetector == false && this.diameter != 0 && !this.outofFrame) {
            this.diameter = 0;
            this.collidedWithDetector = true;
            this.outOfFrame = true;
            electronCount += 1;
        }
    }
}

function electric_field(x, y, A, det_x0, det_y0, sigma_x, sigma_y) {

    var rx = det_x0 - x;
    var ry = det_y0 - y;

    //magnitude
    var ex = rx * rx / (2 * sigma_x * sigma_x);
    var ey = ry * ry / (2 * sigma_y * sigma_y);
    var E = A * Math.exp(- (ex + ey));

    //direction
    var dist = Math.pow(rx * rx + ry * ry, 0.5)

    var Ex = E * rx / dist
    var Ey = E * ry / dist

    return [Ex, Ey]


}

function angle_randomizer(index) {
    switch (index) {
        case 0:
            return 5;
        case 1:
            return 7;
        case 2:
            return 1;
        case 3:
            return 9;
        case 4:
            return 2;
        case 5:
            return 6;
        case 6:
            return 4;
        case 7:
            return 8;
        case 8:
            return 3;
        case 9:
            return 0;
        case 10:
            return 10;

    }

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function electron_initial_angle(topographyIndex, sectionIndex, electrons_pixel, detect, nodetect, index){
    const initial_angles = [0.524, 0.756, 0.989, 1.222, 1.454, 1.687, 1.92, 2.153, 2.385, 2.618] //rad

    let detect_initial_angle_indx = detect[topographyIndex][sectionIndex]
    let nodetect_initial_angle_indx = nodetect[topographyIndex][sectionIndex]
    let initial_angle_indx

    if (electrons_pixel[index]){
        initial_angle_indx = detect_initial_angle_indx[getRandomInt(detect_initial_angle_indx.length)]
    }
    else {
        initial_angle_indx = nodetect_initial_angle_indx[getRandomInt(nodetect_initial_angle_indx.length)]
    }
    let initial_angle = initial_angles[initial_angle_indx]
    return initial_angle
}
