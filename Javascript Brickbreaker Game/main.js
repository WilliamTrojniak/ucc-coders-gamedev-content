
let paddle = new Paddle(canvas.width/2 - 42, 550, 85, 13);

canvas.addEventListener("mousemove", TakeInput);
function TakeInput(event){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddle.move(event.clientX);
    
}