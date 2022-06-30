import Ball from "./Ball.js"
import Paddle from "./Paddle.js"
const ball=new Ball(document.getElementById("ball"))
const playerPaddle=new Paddle(document.getElementById("player-paddle"))
const computerPaddle=new Paddle(document.getElementById("computer-paddle"))
const playerScoreEle=document.getElementById("player-score");
const computerScoreEle=document.getElementById("computer-score");
let lasttime;
function update(time){
    if(lasttime!=null){
      const delta=time-lasttime
      //update code
      //console.log(delta);
      ball.update(delta,[playerPaddle.rect(),computerPaddle.rect()]);
      const hue=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
      document.documentElement.style.setProperty("--hue",hue+delta*.01)
      computerPaddle.update(delta,ball.y);
      if(islose()){
        console.log("lose");
        handleLose();
      }
    }
    lasttime=time;
    //console.log(time);
    window.requestAnimationFrame(update);
}
//setInterval(u)
document.addEventListener("mousemove",e=>{
  //converting e.y from pixel to percentage
  playerPaddle.position=(e.y/window.innerHeight)*100
})

function islose(){
  const rect=ball.rect();
  return rect.right>=window.innerWidth || rect.left<=0
}

function handleLose(){
  const rect=ball.rect();
  if(rect.right>=window.innerWidth){
    playerScoreEle.textContent=parseInt(playerScoreEle.textContent)+1
  }
  else{
    computerScoreEle.textContent=parseInt(computerScoreEle.textContent)+1
  }
  ball.reset();
  computerPaddle.reset();
}
window.requestAnimationFrame(update);
