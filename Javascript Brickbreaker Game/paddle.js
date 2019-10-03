const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Paddle {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    setSpeed(val){
        this.speed = val;
        this.move();
    }

    move(val){
        this.x = val;
        if(this.x < 0){
            this.x = 0;
        }
        else if(this.x + this.width > canvas.width){
            this.x = canvas.width - this.width;
        }
        this.update();
    }

    draw(){
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(){
        this.draw();
    }
}