
let paddle = new Paddle(50, 50, 50, 50);

let direction = 0;

canvas.addEventListener("mousemove", TakeInput);
function TakeInput(event){
    
    console.log(event);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddle.move(event.screenX);
    
}