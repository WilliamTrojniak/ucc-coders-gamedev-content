const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        
    }

    draw(){
        console.log("No draw function was defined");
    }

    update(){
        this.draw();
    }
}