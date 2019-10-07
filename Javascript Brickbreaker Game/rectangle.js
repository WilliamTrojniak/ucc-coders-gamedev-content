class Rectangle extends Shape {
    constructor(x, y, w, h){
        super(x, y);
        this.width = w;
        this.height = h;
    }

    draw(){
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }


}