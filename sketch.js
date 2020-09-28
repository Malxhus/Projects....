var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var invisibleGround;
var survivalTime = 0;
var Point = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
 

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 400);

  monkey = createSprite(90, 305, 10, 10);
  monkey.scale = 0.1;
  monkey.addAnimation("running", monkey_running);

  ground = createSprite(300, 380, 600, 90);

  invisibleGround = createSprite(300, 380, 600, 85);
  invisibleGround.visible = false;
  
  FoodGroup = createGroup();
}


function draw() {
  background("black");


  stroke("white");
  fill("white"); 
  text("SURVIVAL:" + survivalTime, 450, 50);
  survivalTime = survivalTime + Math.round(getFrameRate() / 60);

  text("POINT: " + Point, 40, 50);


  if (keyDown("space") && monkey.y >= 200) {
    monkey.velocityY = -15;
     
  }
  monkey.velocityY = monkey.velocityY + 0.8;





  monkey.collide(invisibleGround);
  
  spawnObstacles();
  spawnFood();
  
  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var Obstacle = createSprite(600, 319, 600, 5);
    Obstacle.addImage(obstacleImage);
    Obstacle.scale = 0.2;
    Obstacle.velocityX = -4;
  }
}
function spawnFood(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1 ;
    banana.velocityX = -3;
    
    FoodGroup.add(banana);
}
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    Point = Point + 1;
  }   
    
}