class Paddle extends Rectangle{

    // constructor(x, y, w, h) {
    //     super(x, y, w, h);
    // }

    move(val){
        this.x = val - this.width/2;
        if(this.x < 0){
            this.x = 0;
        }
        else if(this.x + this.width > canvas.width){
            this.x = canvas.width - this.width;
        }
    }

}