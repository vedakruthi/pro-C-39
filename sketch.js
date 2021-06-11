    var PLAY=1;
    var END=0;
    var gamestate=PLAY;
    var monkey , monkey_running;
    var banana ,bananaImage, obstacle, obstacleImage;
    var bananaGroup, obstacleGroup;
    var survivaltime;
    var bg,bgimg;
    var ground;
    var score;

function preload(){
    monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");
    bgimg = loadImage("forest.jpg");
 }



function setup() {
    createCanvas(displayWidth, displayHeight/2);
    bg = createSprite(900,10,displayWidth,displayHeight/2);
    bg.addImage(bgimg);
    bg.scale = 0.6;
    monkey=createSprite(80,315,20,20);
    monkey.addAnimation("moving",monkey_running);
    monkey.scale=0.1;

    ground=createSprite(400,420,2000,10);
    ground.velocityX=-4;
    ground.visible = false;
    ground.x=ground.width/2;

    bananaGroup=new Group();
    obstacleGroup=new Group();

    survivaltime=0;
    score=0;
}


function draw() {
    
  
if(gamestate===PLAY){
    if (ground.x < 600){
    ground.x = ground.width/2;
    }
    if(keyDown("space")&&monkey.y >= 100){
    monkey.velocityY=-10;
    }
    
    
    //adding gravity
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground);
    console.log(frameCount);
    stroke(0);
    fill(0);
    textSize(20);
    survivaltime=Math.ceil(frameCount/frameRate());
    text("survival time="+survivaltime,250,50);
    
    fill(0);
    stroke(0);
    textSize(15);
    text("score:"+score,500,50);
  
    
  spawnObstacles();
    spawnBananas();
  
  if (bananaGroup.isTouching(monkey)){
      obstacleGroup.destroyEach();
    score = score + 1;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
    if(obstacleGroup.isTouching(monkey)){   
        monkey.scale=0.08;
        gamestate=END;
        }
    if(bananaGroup.isTouching(monkey)){
    score=score+1;
    bananaGroup.destroyEach();
    }  
}
  
  else if(gamestate===END){
    fill(0);
    stroke(0);
    textSize(20);
    text("gameover!",240,160);
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    ground.destroy();
    monkey.destroy();
  }
    
    
    drawSprites();  
}

function spawnObstacles(){
    if(World.frameCount % 120===0){
    obstacle=createSprite(90,400,20,20);
    obstacle.velocityX=-3;
    obstacle.addImage(obstacleImage);
    obstacle.lifetime=500;
    obstacle.scale=0.1;
    obstacle.x = Math.round(random(120,340));
    obstacleGroup.add(obstacle);
     }
}
function spawnBananas(){
      if(World.frameCount % 80===0){
      banana=createSprite(20,400,20,20);
      banana.velocityX=3;
      banana.addImage(bananaImage);
      banana.lifetime=500;
      banana.scale=0.1;
      banana.y = Math.round(random(100,400));
      monkey.depth=banana.depth+1;    
      bananaGroup.add(banana);
       }
}




