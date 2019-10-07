class Circle extends Shape {
    constructor(x, y, r){
        super(x, y);
        this.radius = r;
    }

    draw(){
        ctx.fillStyle = "#FF00FF";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 360);
        ctx.fill();
    }
}