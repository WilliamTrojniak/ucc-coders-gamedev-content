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
        this.brickCollisionDetection();
    }

    rectangleCollisionDetection(rectangle){
        let closest_x = this.x;
        let closest_y = this.y;

        if(this.x < rectangle.x) closest_x = rectangle.x;
        else if(this.x > rectangle.x + rectangle.width) closest_x = rectangle.x + rectangle.width;

        if(this.y < rectangle.y) closest_y = rectangle.y;
        else if(this.y > rectangle.y + rectangle.height) closest_y = rectangle.y + rectangle.height;

        let difference_x = this.x - closest_x;
        let difference_y = this.y - closest_y;
        let distance = Math.sqrt(Math.pow(difference_x, 2)+Math.pow(difference_y, 2));
        
        return distance < this.radius;
    }

    brickCollisionDetection(){
        if(this.rectangleCollisionDetection(brick)){
            if(this.y <= brick.y || this.y >= brick.y + brick.height){
                this.setSpeed(1, -1);
            }
            if(this.x <= brick.x || this.x >= brick.x + brick.width){
                this.setSpeed(-1, 1);
            }
        }
        
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

        if(this.rectangleCollisionDetection(this.paddle)){
            if(this.y < this.paddle.y){
                // TODO Change ball direction based on where it hits the paddle
                this.setSpeed(1, -1);
            }
            else if(this.y > this.paddle.y + this.paddle.height){
                this.setSpeed(1, -1);
            }
            if(this.x < this.paddle.x || this.x > this.paddle.x + this.paddle.width){
                this.setSpeed(-1, 1);
            }
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