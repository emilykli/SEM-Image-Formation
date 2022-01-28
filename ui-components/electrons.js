class Electron {
    constructor(xCoordinate, yCoordinate, xVelocity, yVelocity) {
        this.x = xCoordinate;
        this.y = yCoordinate;
        this.diameter = 12;
        this.xVel = xVelocity;
        this.yVel = yVelocity;
        this.hasMadeContact = false;
        this.distanceFromDetectorX = abs(this.x - secondaryDetectorCenterX);
        this.distanceFromDetectorY = abs(this.y - secondaryDetectorCenterY);
        this.distance = sqrt(this.distanceFromDetectorX * this.distanceFromDetectorX + this.distanceFromDetectorY * this.distanceFromDetectorY);
        this.collidedWithDetector = false;
        this.outOfFrame = false;
    }

    collisionMathSteppedBlock() {
        fill(100, 100, 100);
        if (topographyIndex == 0 || topographyIndex == 4) {
            //rect(250, 642.5, 72.5, 10);
            if (collideRectCircle(250, 570 + 145 / 2, 365, 10, this.x, this.y, this.diameter)) //collides with left region in 
            {

                let totalVelocity = sqrt(this.xVel * this.xVel + this.yVel * this.yVel);
                let randomAngle = random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) / 10 * PI;

                this.xVel = totalVelocity * cos(randomAngle);
                this.yVel = -totalVelocity * sin(randomAngle);
                this.hasMadeContact = true;
            }

            if (this.hasMadeContact && (this.x < 0 || this.y < 0 || this.x > canvasWidth || this.y > canvasHeight)) {
                this.outOfFrame = true;
            }
        }
        else {
            if (collideRectCircle(250, 570 + 145 / 2, 72.5, 10, this.x, this.y, this.diameter)) //collides with left region in 
            {

                let totalVelocity = sqrt(this.xVel * this.xVel + this.yVel * this.yVel);
                let randomAngle = random(0, PI);

                this.xVel = totalVelocity * cos(randomAngle);
                this.yVel = -totalVelocity * sin(randomAngle);
                this.hasMadeContact = true;
            }

            if (collideRectCircle(250 + 72.5, 550, 1, 72.5, this.x, this.y, this.diameter)) {
                this.diameter = 0;
            }
        }
    }

    electronDriftMath() {

        this.y -= 400 / this.distance;
        if (this.x < 150) {
            this.x += 200 / this.distance;
        }
        if (this.x > 100) {
            this.x -= 200 / this.distance;
        }
        this.x -= 100 / this.distance
    }

    secondaryDetectorCollision() {
        if (collideRectCircle(10, 200, 180, 70, this.x, this.y, this.diameter) && this.collidedWithDetector == false) {
            this.diameter = 0;
            this.collidedWithDetector = true;
            electronCount += 8;
        }
    }
}