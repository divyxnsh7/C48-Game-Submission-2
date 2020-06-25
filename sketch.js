var starlord, starlord_running, starlord_collided, starlord_jump, jumpSound;
var ground, invisibleGround;

var coinsGroup, coinsGroup2, coinsGroup3, coinsGroup4, coinsGroup5, coinImage, coinSound;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score, coinCount;

var PLAY=1, END=0, gameState = PLAY; 

var bg_img, bg_sound, gameOver, gameOver_Img, gameOverSound, restart, restart_Img;
var jumpBtn, jumpBtnImg, resetBtn, resetBtnImg;


function preload(){
  starlord_running = loadAnimation("images/hero1 1.png","images/hero2 1.png","images/hero3 1.png");
  starlord_collided = loadAnimation("images/starlord_collided.png");
  starlord_jump = loadAnimation("images/jump3 1.png");
  jumpSound = loadSound("sounds/Jump effect.flac");
  

  coinImage = loadAnimation("images/coin1.png","images/coin2.png","images/coin3.png","images/coin4.png");
  coinSound = loadSound("sounds/Coin collect sound.wav");
  gameOverSound = loadSound("sounds/Game over.mp3")
  
  obstacle1 = loadImage("images/ob1 1.png");
  obstacle2 = loadAnimation("images/ob2 3 .png");
  //obstacle3 = loadAnimation("images/ob3(1).png","images/ob3(2).png","images/ob3(3).png","images/ob3(4).png","images/ob3(5).png");
  obstacle3 = loadAnimation("images/ob3 1 1.png","images/ob3 2 1.png","images/ob3 3 1.png","images/ob3 4 1.png");
  obstacle4 = loadAnimation("images/ob4(1).png","images/ob4(2).png","images/ob4(3).png","images/ob4(4).png");
  obstacle5 = loadAnimation("images/obs5 1.png");
  obstacle6 = loadAnimation("images/ob6 f3.png");
  obstacle7 = loadImage("images/ob 7.png");

  bg_img = loadImage("images/bg_img3 f4.png");
  bg_sound = loadSound("sounds/background m3.mp3");
  
  gameOver_Img = loadImage("images/gameOver.png");
  restart_Img = loadImage("images/restart.png");

  jumpBtnImg = loadImage("images/jumpb1.png");
  resetBtnImg = loadImage("images/button3.png");
}

function setup() {
  createCanvas(650, 250);

  ground = createSprite(300, 125, 650, 250);
  ground.addImage("ground", bg_img);
  //ground.scale = 1.07;
  ground.x = ground.width/2;

  starlord = createSprite(100,230,20,50);
  starlord.addAnimation("running",starlord_running);
  starlord.addAnimation("collided",starlord_collided);
  starlord.addAnimation("jump",starlord_jump);
  starlord.scale = 0.19;
  starlord.y = 220;
  //starlord_collided.scale = 2;
  //starlord.debug = true;
  starlord.setCollider("circle", 0, 0, 290);


  //starlord_collided.addImage("collided",starlord_collided);

     
  invisibleGround = createSprite(200,235,400,10);
  invisibleGround.visible = false;
  
  coinsGroup = new Group();
  coinsGroup2 = new Group();
  coinsGroup3 = new Group();
  coinsGroup4 = new Group();
  coinsGroup5 = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(300,80);
  gameOver.addImage("game over", gameOver_Img);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,150);
  restart.addImage("restart", restart_Img);
  restart.scale = 0.5;
  restart.visible = false;

  jumpBtn = createSprite(575, 200, 50, 50);
  jumpBtn.addImage("jump btn", jumpBtnImg);
  jumpBtn.scale = 0.85;
  
  score = 0;
  textSize(30);
  fill("white");
  textFont("Bradley Hand ITC");
  coinCount = 0;
  textSize(30);
  fill("white");
  textFont("Bradley Hand ITC");
}

function draw() {
  background(0);
  //image(bg_img, 0, 0, 1600, 400);

  
  //textStroke("white");
  //textSize(18);
  
  //text(BOLD);
  
  starlord.collide(invisibleGround);
  ground.velocityX = -(6+3*score/100);

  //bg_sound.play();


  if (ground.x < 0){                  
    ground.x = ground.width/2;
  }  
 
  
  if (gameState === PLAY) {
  ground.velocityX = -(6+3*score/100);
    score = score + Math.round(getFrameRate()/60);
  if(keyDown("space") && starlord.y >= 135) {
    starlord.velocityY = -12.5;
    starlord.changeAnimation("jump",starlord_jump);
    jumpSound.play();
  }
  if(mousePressedOver(jumpBtn) && starlord.y >= 135) {
    starlord.velocityY = -12.5;
    starlord.changeAnimation("jump",starlord_jump);
    jumpSound.play();
  }
  if(keyWentUp("space")){
    starlord.changeAnimation("running",starlord_running);
  }
  /*if(mouseReleased(jumpBtn)){
    starlord.changeAnimation("running",starlord_running);
  }*/
  starlord.velocityY = starlord.velocityY + 0.8
    if (ground.x < 0){                  
    ground.x = ground.width/2;
  }
  if(coinsGroup.isTouching(starlord)){
    coinSound.play();
    coinsGroup.destroyEach();
    coinCount = coinCount + 1;
  }
  if(coinsGroup2.isTouching(starlord)){
    coinSound.play();
    coinsGroup2.destroyEach();
    coinCount = coinCount + 1;
  }
  if(coinsGroup3.isTouching(starlord)){
    coinSound.play();
    coinsGroup3.destroyEach();
    coinCount = coinCount + 1;
  }
  if(coinsGroup4.isTouching(starlord)){
    coinSound.play();
    coinsGroup4.destroyEach();
    coinCount = coinCount + 1;
  }
  if(coinsGroup5.isTouching(starlord)){
    coinSound.play();
    coinsGroup5.destroyEach();
    coinCount = coinCount + 1;
  }
    if (obstaclesGroup.isTouching(starlord)) {
      gameState = END;
    }

    obstaclesGroup.depth = jumpBtn.depth;
    jumpBtn.depth = jumpBtn.depth + 1;
    
    spawnCoins();
    spawnCoins2();
    spawnCoins3();
    spawnCoins4();
    spawnCoins5();
    spawnObstacles();
  }
   else if (gameState === END) {
    ground.velocityX = 0;
    starlord.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    coinsGroup2.setVelocityXEach(0);
    coinsGroup3.setVelocityXEach(0);
    coinsGroup4.setVelocityXEach(0);
    coinsGroup5.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    coinsGroup2.setLifetimeEach(-1);
    coinsGroup3.setLifetimeEach(-1);
    coinsGroup4.setLifetimeEach(-1);
    coinsGroup5.setLifetimeEach(-1);
    starlord.changeAnimation("collided",starlord_collided);
    starlord.x = 150;
    starlord.y = 205;
    gameOver.visible = true;
    //gameOverSound.play();
    restart.visible = true;
    if (mousePressedOver(restart)) {
    reset();
    }
  }
    
    
    
  drawSprites();
  text("Score: "+ score, 500 ,25);
  text("Coins:"+ coinCount, 15, 25);
}

function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 90 === 0) {
    var coin = createSprite(600,50,10,10);
    coin.addAnimation("coin",coinImage);
    coin.scale = 0.15;
    coin.velocityX = -(6+3*score/100);
    coin.setCollider("circle", 0, 0, 150);
     //assign lifetime to the variable
    coin.lifetime = 200;
    //adjust the depth
    coin.depth = starlord.depth;
    starlord.depth = starlord.depth + 1;
    coin.depth = gameOver.depth;
    gameOver.depth = gameOver.depth + 1;
  
    //add each cloud to the group
    coinsGroup.add(coin);
  
  }
  
}

function spawnCoins2() {
  if (frameCount % 90 === 0) {
  var coin1 = createSprite(640,50,10,10);
  coin1.addAnimation("coin",coinImage);
  coin1.scale = 0.15;
    coin1.velocityX = -(6+3*score/100);
    coin1.setCollider("circle", 0, 0, 150);
     //assign lifetime to the variable
    coin1.lifetime = 200;
    
    //adjust the depth
    coin1.depth = starlord.depth;
    starlord.depth = starlord.depth + 1;

    coin1.depth = gameOver.depth;
    gameOver.depth = gameOver.depth + 1;
    //add each cloud to the group
    coinsGroup2.add(coin1);
  }
}

function spawnCoins3() {
  if (frameCount % 90 === 0) {
  var coin2 = createSprite(680,50,10,10);
  coin2.addAnimation("coin",coinImage);
  coin2.scale = 0.15;
    coin2.velocityX = -(6+3*score/100);
    coin2.setCollider("circle", 0, 0, 150);
     //assign lifetime to the variable
    coin2.lifetime = 200;
    //adjust the depth
    coin2.depth = starlord.depth;
    starlord.depth = starlord.depth + 1;
    coin2.depth = gameOver.depth;
    gameOver.depth = gameOver.depth + 1;
    
    //add each cloud to the group
    coinsGroup3.add(coin2);
  }
}

function spawnCoins4() {
  if (frameCount % 90 === 0) {
  var coin3 = createSprite(720,50,10,10);
  coin3.addAnimation("coin",coinImage);
  coin3.scale = 0.15;
    coin3.velocityX = -(6+3*score/100);
    coin3.setCollider("circle", 0, 0, 150);
     //assign lifetime to the variable
    coin3.lifetime = 200;
    //adjust the depth
    coin3.depth = starlord.depth;
    starlord.depth = starlord.depth + 1;
    coin3.depth = gameOver.depth;
    gameOver.depth = gameOver.depth + 1;
    
    //add each cloud to the group
    coinsGroup4.add(coin3);
  }
}

function spawnCoins5() {
  if (frameCount % 90 === 0) {
  var coin4 = createSprite(760,50,10,10);
  coin4.addAnimation("coin",coinImage);
  coin4.scale = 0.15;
    coin4.velocityX = -(6+3*score/100);
    coin4.setCollider("circle", 0, 0, 150);
     //assign lifetime to the variable
    coin4.lifetime = 200;
    //adjust the depth
    coin4.depth = starlord.depth;
    starlord.depth = starlord.depth + 1;
    coin4.depth = gameOver.depth;
    gameOver.depth = gameOver.depth + 1;
    
    //add each cloud to the group
    coinsGroup5.add(coin4);
  }
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(600,190,10,40);
    //obstacle4.positiony = 175;
    //obstaclesGroup.y = 175;
    obstacle.velocityX = -(6+3*score/100); 
    //obstacle.debug = true;
    obstacle.setCollider("circle", 0, 0, 80);
    obstacle.depth = starlord.depth;
    starlord.depth = starlord.depth + 1;

    //generate random obstacles
    var rand = Math.round(random(1,7));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addAnimation("hissing",obstacle2);
              break;
      case 3: obstacle.addAnimation("barriers",obstacle3);
              break;
      case 4: obstacle.addAnimation("ring",obstacle4);
              break;
      case 5: obstacle.addAnimation("flame",obstacle5);
              break;
      case 6: obstacle.addAnimation("fkeokm",obstacle6);
              break;
      case 7: obstacle.addImage(obstacle7);
              break;           
      default: break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.45;
    //obstacle4.tint = "blue";

    //obstacle4.height = 100;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
  
  function reset() {
    gameState = PLAY;
    starlord.changeAnimation("running",starlord_running);
    gameOver.visible = false;
    restart.visible = false;
    score = 0;
    coinCount = 0;
    obstaclesGroup.destroyEach();
    coinsGroup.destroyEach();
    coinsGroup2.destroyEach();
    coinsGroup3.destroyEach();
    coinsGroup4.destroyEach();
    coinsGroup5.destroyEach();
  }