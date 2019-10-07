class Ball extends Circle {
    constructor(x, y, r, velX, velY, paddle){
        super(x, y, r);
        this.speed = {x: velX, y: velY};
        this.paddle = paddle;
    }

    move(){
        this.x += this.speed.x;
        this.y += this.speed.y;
        this.collisionDetection();
    }

    collisionDetection(){
        this.paddleCollisionDetection();
        this.wallCollisionDetection();
    }

    wallCollisionDetection(){
        if(this.x + this.radius > canvas.width || this.x - this.radius < 0){
            this.x -= this.speed.x;
            this.setSpeed(-1, 1);
        }
        if(this.y + this.radius > canvas.height || this.y - this.radius < 0){
            this.y -= this.speed.y;
            this.setSpeed(1, -1);
        }
    }

    paddleCollisionDetection(){
        if(this.x + this.radius >= this.paddle.x && this.x - this.radius <= this.paddle.x + this.paddle.width && this.y + this.radius <= this.paddle.y && this.y + this.radius + this.speed.y > this.paddle.y){
            //TODO Improve X Collision
            //TODO Change X speed based on where the ball hits the paddle
            this.setSpeed(1, -1);
        }
        else if((this.x - this.radius < this.paddle.x + this.paddle.width && this.x + this.radius > this.paddle.x) && (this.y > this.paddle.y && this.y < this.paddle.y + this.paddle.height)){
            this.setSpeed(-1, 1);
        }
    }

    setSpeed(x, y){
        this.speed.x = x * this.speed.x;
        this.speed.y = y * this.speed.y;
    }

    update(){
        this.move();
        super.update();
    }
}