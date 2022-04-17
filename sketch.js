const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope,rope1,rope2;
var fruit;
var link, link1, link2;
var melonpng, backgroundpng, cutbuttonpng, rabbitpng;
var airsound, eatingsound, sadsound, cutsound, backgroundsound;
var balloon;
var mutebutton;
var r = Math.random(100,425) ;

function preload() {
  melonpng = loadImage("pngs/melon.png");
  backgroundpng = loadImage("pngs/background.png");
  rabbitpng = loadImage("pngs/Rabbit-01.png");
  blink = loadAnimation("pngs/blink_1.png","pngs/blink_2.png","pngs/blink_3.png");
  eat = loadAnimation("pngs/eat_0.png","pngs/eat_1.png","pngs/eat_2.png","pngs/eat_3.png","pngs/eat_4.png");
  sad = loadAnimation("pngs/sad_1.png","pngs/sad_2.png","pngs/sad_3.png");
  airsound = loadSound("air.wav");
  eatingsound = loadSound("eating_sound.mp3");
  sadsound = loadSound("sad.wav");
  cutsound = loadSound("rope_cut.mp3");
  backgroundsound = loadSound("sound1.mp3");
  
   

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
  

}

function setup() 
{
  
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }
  frameRate(80);
  backgroundsound.play();
  backgroundsound.setVolume(0.08);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,690,600,20);
  rope = new Rope(3,{x:245,y:40});
  rope1 = new Rope(6,{x:95,y:70});
  rope2 = new Rope(10,{x:455,y:20});
 

  rabbit = createSprite(425,canH-80,100,100);
  blink.frameDelay= 20;
  eat.frameDelay= 20;
  sad.frameDelay= 20;
  rabbit.addAnimation('blinking',blink);
  rabbit.addAnimation('eating',eat);
  rabbit.addAnimation('crying',sad);

  rabbit.changeAnimation('blinking');

  rabbit.scale = 0.2;

  button = createImg("cut.png");
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button1 = createImg("cut.png");
  button1.position(95,50);
  button1.size(50,50);
  button1.mouseClicked(drop1);

  button2 = createImg("cut.png");
  button2.position(425,20);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  balloon = createImg("pngs/balloon.png");
  balloon.position(50,190);
  balloon.size(120,100);
  balloon.mouseClicked(airblow);

  mutebutton = createImg("pngs/mute.png");
  mutebutton.position(30,30);
  mutebutton.size(50,50);
  mutebutton.mouseClicked(mute);


  fruit = Bodies.circle(300,300,15);
  Matter.Composite.add(rope.body, fruit);
  

  link = new Link(rope,fruit);
  link1 = new Link(rope1,fruit);
  link2 = new Link(rope2,fruit);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
  
  
}

function draw() 
{
  background(51);
  image(backgroundpng, 0, 0, width, height);
  console.log(r);
  ground.show();
  rope.show();
  rope1.show();
  rope2.show();
  push();
  imageMode(CENTER);
  if(fruit != null){
    image(melonpng,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

 /* if (keyDown(LEFT_ARROW)){
    rabbit.x = rabbit.x - 3;
  }

  if (keyDown(RIGHT_ARROW)){
    rabbit.x = rabbit.x + 3;
  }*/
    
 if(collison(fruit,rabbit)){
    rabbit.changeAnimation("eating");
    eatingsound.play();
 }

  if(collison(fruit,ground.body)){
    rabbit.changeAnimation('crying');
    sadsound.play();
  }

  drawSprites();
  Engine.update(engine);
  

 
   
}

function drop() {
  rope.break();
  link.detach();
  link = null;
  cutsound.play();
}

function drop1() {
  rope1.break();
  link1.detach();
  link1 = null;
  cutsound.play();
}

function drop2() {
  rope2.break();
  link2.detach();
  link2 = null;
  cutsound.play();
}


function collison(body,sprite) {
  if(body != null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    
    if (d <= 80){
      
      World.remove(engine.world,fruit);
      fruit = null;
      return true;
    }
    else{
      
      return false;
    }
  }
}

function airblow()
{
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  airsound.play();

}

function mute() {

  if(backgroundsound.isPlaying()){
    backgroundsound.stop();
  }
  else{
    backgroundsound.play();
  }
}