var trex, trex_running, edges;
var groundImage;
var ground
var invisibleGround
var cloudImage
var ob1,ob2,ob3,ob4,ob5,ob6
var gamestate="play"
var obgroup
var cloudgroup
var gameover
var restart
var js
var rs
var score=0
var trexCollide
var jumpSound
var checkPointSound
var dieSound
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
groundImage= loadImage("ground2.png")
cloudImage=loadImage("cloud.png")
ob1=loadImage("obstacle1.png")
ob2=loadImage("obstacle2.png")
ob3=loadImage("obstacle3.png")
ob4=loadImage("obstacle4.png")
ob5=loadImage("obstacle5.png")
ob6=loadImage("obstacle6.png")
gameover=loadImage("gameOver.png")
restart=loadImage("restart.png")
trexCollide=loadAnimation("trex_collided.png")
jumpSound=loadSound("jump.mp3")
checkPointSound=loadSound("checkPoint.mp3")
dieSound=loadSound("die.mp3")
}

function setup(){
  createCanvas(600,200);
  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("stop", trexCollide);
  invisibleGround=createSprite(300,195,600,5)
  invisibleGround.visible=false
  trex.scale = 0.5;
  ground=createSprite(300,190,600,5)
  ground.addImage("mirela",groundImage)
  obgroup= createGroup()
  cloudgroup=createGroup()
  trex.setCollider("circle",0,0,30)
  trex.debug=false
  js=createSprite(300,50,10,10)
  js.addImage(gameover)
  rs=createSprite(300,100,10,10)
  rs.addImage(restart)
}


function draw(){
  background("white");
  text("score="+score,470,30)
  if(gamestate=="play")
  {
  trex.changeAnimation("running",trex_running)
  score=score+1
    js.visible=false
  rs.visible=false
  ground.velocityX=-3
  if(ground.x<0)
    {
    ground.x=300
    }
    if(score%200==0)
  {
    checkPointSound.play()
  }
    if(keyDown("space")&&trex.y>120) 
    {
    trex.velocityY=-12
    jumpSound.play()
    }
    trex.velocityY=trex.velocityY+1
    makeclouds()
    makeobstacles()
    if(trex.isTouching(obgroup))
    {
    gamestate="end"
    dieSound.play()
    }
  }
  if(gamestate=="end")
  {
  trex.changeAnimation("stop",trexCollide)
    js.visible=true
    rs.visible=true
  ground.velocityX=0
  cloudgroup.setVelocityXEach(0)
  obgroup.setVelocityXEach(0)
  if(mousePressedOver(rs)){
  reset()
  }
  }
  
  trex.collide(invisibleGround)
  
  drawSprites();
}
function makeclouds()
{
if(frameCount%60==0)
{
cloud=createSprite(540,50,10,10)
cloud.addImage(cloudImage)
cloud.velocityX=-10
cloudgroup.add(cloud)
}

}
function makeobstacles(){

if(frameCount%60==0)
{

ob=createSprite(550,180,10,10)
ob.velocityX=-5
ob.scale=0.5
var a=Math.round(random(1,6))
switch(a)
{
case 1: ob.addImage(ob1)
break
case 2: ob.addImage(ob2)
break
case 3: ob.addImage(ob3)
break
case 4: ob.addImage(ob4)
break
case 5: ob.addImage(ob5)
break
case 6: ob.addImage(ob6)
break
}
obgroup.add(ob)
}
}
function reset(){
gamestate="play"
obgroup.destroyEach();
cloudgroup.destroyEach();
score=0
  
  

}  
  