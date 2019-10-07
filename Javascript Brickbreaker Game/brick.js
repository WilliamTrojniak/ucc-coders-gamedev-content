class Brick extends Rectangle {
    constructor(x, y, w, h, ball, health){
        super(x, y, w, h);
        this.ball = ball;
        this.health = health;
    }

    collisionDetection(){
        //Top Collision
        if(this.ball.x + this.ball.radius >= this.x && this.ball.x - this.ball.radius <= this.x + this.width && this.ball.y + this.ball.radius <= this.y && this.ball.y + this.ball.radius + this.ball.speed.y > this.y){
            this.ball.setSpeed(1, -1);
        }
        //Bottom Collision
        else if(this.ball.x + this.ball.radius >= this.x && this.ball.x - this.ball.radius <= this.x + this.width && this.ball.y - this.ball.radius >= this.y + this.height && this.ball.y - this.ball.radius + this.ball.speed.y < this.y + this.height){
            this.ball.setSpeed(1, -1);
        }
        //Side collision
        else if((this.ball.x - this.ball.radius < this.x + this.width && this.ball.x + this.ball.radius > this.x) && (this.ball.y > this.y && this.ball.y < this.y + this.height)){
            this.ball.setSpeed(-1, 1);
        }

    }

    update(){
        this.collisionDetection();

        super.update();
    }

}