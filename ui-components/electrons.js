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
        fill(100, 100, 100);
        if (topographyIndex == 0 || topographyIndex == 4) {
            //rect(250, 642.5, 72.5, 10);
            if (collideRectCircle(250, 570 + 145 / 2, 365, 10, this.x, this.y, this.diameter)) //collides with left region in 
            {

                let totalVelocity = sqrt(this.xVel * this.xVel + this.yVel * this.yVel);
                let randomAngle = angle_randomizer(this.index % 11) / 10 * PI;

                this.xVel = totalVelocity * cos(randomAngle);
                this.yVel = -totalVelocity * sin(randomAngle);
                this.hasMadeContact = true;
            }

            if (this.hasMadeContact && (this.x < 0 || this.y < 0 || this.x > canvasWidth || this.y > canvasHeight)) {
                this.outOfFrame = true;
            }
        }
        else {
            if (collideRectCircle(250, 570 + 145 / 2, 72.5, 10, this.x, this.y, this.diameter) || collideRectCircle(323, 560, 112, 10, this.x, this.y, this.diameter) || collideRectCircle(250 + 73 + 109.5, 642.5, 182.5, 10, this.x, this.y, this.diameter)) //collides with flat region  
            {

                let totalVelocity = sqrt(this.xVel * this.xVel + this.yVel * this.yVel);
                let randomAngle = angle_randomizer(this.index % 11) / 10 * PI;

                this.xVel = totalVelocity * cos(randomAngle);
                this.yVel = -totalVelocity * sin(randomAngle);
                this.hasMadeContact = true;
            }

            else if (collideRectCircle(250 + 72.5, 561, 1, 72.5, this.x, this.y, this.diameter) || collideRectCircle(250 + 72.5 + 109.5, 561, 1, 72.5, this.x, this.y, this.diameter)) {
                this.diameter = 0;
                this.outOfFrame = true;
            }
            if (this.hasMadeContact && (this.x < 0 || this.y < 0 || this.x > canvasWidth || this.y > canvasHeight)) {
                this.outOfFrame = true;
            }
        }
    }

    electronDriftMath() {
        var P_detector = 300;
        var KE = 8.01 * Math.pow(10, -18);
        var delta_t = 0.001;
        var q_e = 1.602 * Math.pow(10, -19);
        var m_e = 9.109 * Math.pow(10, -31);
        var L = 0.02;

        var A = P_detector * q_e / KE;
        var det_x0 = secondaryDetectorCenterX;
        var det_y0 = secondaryDetectorCenterY;
        var sigma_x = 2.5;
        var sigma_y = 2;

        var E_field = electric_field(this.x, this.y, A, det_x0, det_y0, sigma_x, sigma_y);


        this.x += delta_t * this.xVel;
        this.y += delta_t * this.yVel;

        this.xVel += delta_t * E_field[0];
        this.yVel += delta_t * E_field[1];

    }

    secondaryDetectorCollision() {
        if (collideRectCircle(10, 200, 180, 70, this.x, this.y, this.diameter) && this.collidedWithDetector == false) {
            this.diameter = 0;
            this.collidedWithDetector = true;
            this.outOfFrame = true;
            electronCount += 8;
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
    switch(index){
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