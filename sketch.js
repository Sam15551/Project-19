var PLAY=0,END=1;
var gameState=PLAY;
var score=0;

var road,roadImg;
var invGround;
var boy,boyImg;
var car,carImg1,carImg2,carG;
var gameOver,gameOverImg;




function preload(){
  
  roadImg=loadImage("road.jpg");
  
  boyImg=loadImage("boy.jpg");
  
  carImg1=loadImage("blue_car.jpg");
  carImg2=loadImage("red_car.png");
  
  gameOverImg=loadImage("game_over.png");

}

function setup() {
  createCanvas(500,500);
  
  road=createSprite(350,250,10,10);
  road.addImage(roadImg);
  road.scale=1.6;
  road.velocityX=-1;
 
  invGround=createSprite(250,450,500,10);
  invGround.visible=false;
  
  boy=createSprite(75,440,10,10);
  boy.addImage(boyImg);
  boy.scale=0.5;
  boy.setCollider("rectangle",0,0,210,170);
  
  gameOver=createSprite(250,250,100,100);
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;
  
  carG = new Group();
}

function draw() {
  background("black");
  
  drawSprites();
  
  if(gameState===PLAY){
    
  score = score + Math.round(getFrameRate()/60);
  road.velocityX=-(1+score/100);
    
  if(road.x<70){
    road.x=250;
  }
  
  if(keyDown("space")&&boy.y>=350){
    boy.velocityY=-12;
  }
  
  boy.velocityY=boy.velocityY+0.4;
  
  spawnCars();
  
  if(boy.isTouching(carG)){
    gameState=END;
  }
    
  }
  
  if(gameState===END){
    gameOver.visible=true;
    text("Click on GAMEOVER to restart",110,350); 
    carG.destroyEach();
    road.velocityX=0;
    boy.velocityY=0;
    
    if(mousePressedOver(gameOver)){
      reset();
    }
  }
  
  boy.collide(invGround);
  
  text("Score="+score,400,50);
}

function spawnCars() {
  if(frameCount%250===0){
    car=createSprite(500,440);
    car.velocityX=-(5+score/100);
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: car.addImage(carImg1);
              break;
      case 2: car.addImage(carImg2);
              break;
      default: break;
    }
    car.scale=0.03;
    car.lifetime=600;
    car.collide(invGround);
    carG.add(car);
    boy.depth=car.depth;
    boy.depth++;
          
  }
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  score=0;
}