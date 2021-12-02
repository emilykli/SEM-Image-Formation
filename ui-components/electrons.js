class Electron {
    constructor(xCoordinate, yCoordinate, xVelocity, yVelocity)
    {
        this.x = xCoordinate;
        this.y = yCoordinate;
        this.diameter = 15;
        this.xVel = xVelocity;
        this.yVel = yVelocity;
    }

    collisionMath(leftBound, rightBound) {
        fill(100, 100, 100);
        if(collideRectCircle(250, 570+145/2, 72.5, 10, this.x, this.y, this.diameter))
        {
            console.log("hit");

            let totalVelocity = sqrt(this.xVel * this.xVel + this.yVel * this.yVel);
            console.log(totalVelocity);

            let randomAngle = random(0, PI);

            this.xVel = totalVelocity * cos(randomAngle);
            this.yVel = -totalVelocity * sin(randomAngle);
        }
    }
}