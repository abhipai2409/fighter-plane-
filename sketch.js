// to create variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var fighterPlane, fighterPlaneImage, fighterPlaneD, fighterPlaneDImage;
var dangerStreet,dangerStreetImage;
var bulllet,bulletImage;
var launcher;
var enemyPlane1,enemyPlane1Image;
var enemyPlane2,enemyPlane2Image;
var enemyPlane3,enemyPlane3Image;
var enemyPlane4,enemyPlane4Image;
var score;                                                           
var missile,missileImage;
var enemyPlane;
var gameOverImg,restartImg

function preload(){
    fighterPlaneImage = loadImage("fightersinchan.png");
  
   dangerStreetImage = loadImage("dangerStreet-1.png"); 
  
   bulletImage = loadImage("bullet1.png");
  
   enemyPlane1Image = loadImage("enemyPlane_4.png");
  
   enemyPlane2Image = loadImage("enemyPlane_4.png");
  
   enemyPlane3Image = loadImage("enemyPlane-1.png");
  
   enemyPlane4Image = loadImage("enemyPlane-2.png");
  
   missileImage = loadImage("missile.png");
  
   restartImg = loadImage("restart.png")
  
   gameOverImg = loadImage("gameOver.png")
  
   fighterPlaneDImage = loadImage("exploded plane.png");
}

function setup() {
  createCanvas(650,600);
  
  
  
  dangerStreet = createSprite(0,200,20,20);
  dangerStreet.addImage( dangerStreetImage);
  dangerStreet.scale = 1.5;
  dangerStreet.velocityX = -1;
  dangerStreet.x = dangerStreet.width /2;
  
     fighterPlane= createSprite(80,200,20,20);
     fighterPlane.addImage( fighterPlaneImage);
     fighterPlane.scale = 0.6;

    launcher= createSprite(190,200,20,20);
    launcher.visible = false
  
    enemyP = new Group();
    bulletGroup = new Group();
    missiles = new Group();

   gameOver = createSprite(300,200);
   gameOver.addImage(gameOverImg);
  
   restart = createSprite(300,500);
   restart.addImage(restartImg);
  
 
   gameOver.scale = 1.2;
   restart.scale = 0.8;
  
    score = 0  
  
  fighterPlane.debug = false
   fighterPlane.setCollider("rectangle",0,0,300,100);
}

function draw() {
  background("black");
  
if(gameState === PLAY){
  
    if (dangerStreet.x < 0){
      dangerStreet.x = dangerStreet.width/2;
    }
       fighterPlane.y = World.mouseY
  
    if (keyDown("space")) {
  createBullet ();  
  }
     launcher.y= fighterPlane.y; 
    
    gameOver.visible = false;
    restart.visible = false;
    
    
    spawnEnemyPlane();
    if(bulletGroup.isTouching(enemyP)){
      enemyP.destroyEach();
      bulletGroup.destroyEach();
      score = score +5;
    
      createMissile ();
    }
  
   if(bulletGroup.isTouching(missiles)){
      
      bulletGroup.destroyEach();
      
    }
  
     if(missiles.isTouching( fighterPlane)) {
         
           missiles.destroyEach ();
           gameState = END;
    
         }
  
   if(fighterPlane.isTouching( enemyP)) {
          enemyP.destroyEach ();
           gameState = END;
    
         }
  
}
   else if( gameState === END){
      
      gameOver.visible = true;
      restart.visible = true;
     
       
      dangerStreet.velocityX = 0;
      enemyPlane.velocityY = 0;
     
       
      enemyP.setLifetimeEach(-1);
      bulletGroup.setLifetimeEach(-1);
       
     enemyP.setVelocityXEach(0);
     bulletGroup.setVelocityXEach(0); 
       
     fighterPlane.addImage( fighterPlaneDImage);
     fighterPlane.scale = 1.2;
   //  fighterPlane.velocityY = 1; 
       
        if(mousePressedOver(restart)) {
        reset();
    }
       
      }
  
   drawSprites();
   textSize(20);   
   stroke("white");
   fill("white");
   text("Score: "+ score, 500,50);
  
  }
  
  

 function createBullet() {
      var bullet = createSprite(100 ,100, 60, 10);
      bullet.addImage(bulletImage);
      bullet.x = 360;
      bullet.y=launcher.y; 
      bullet.x=launcher.x; 
      bullet.velocityX = 4;
      bullet.lifetime = 500 ;
      bullet.scale = 0.3;
      bulletGroup.add(bullet);
}

function spawnEnemyPlane() {
 if (frameCount % 100 === 0){
   enemyPlane = createSprite(600,165,10,40);
   enemyPlane.velocityX = -4;
   enemyPlane.y = Math.round(random(50,520));
    //generate random enemyPlane
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: enemyPlane.addImage( enemyPlane1Image);
              break;
      case 2: enemyPlane.addImage(enemyPlane2Image);
              break;
      case 3: enemyPlane.addImage(enemyPlane3Image);
              break;
      case 4: enemyPlane.addImage(enemyPlane4Image);
              break;
    
      default: break;
    }
   
    //assign scale and lifetime to the enemyPlane          
    enemyPlane.scale = 0.9;
    enemyPlane.lifetime = 180;
   
   //add each enemyPlane to the group
    enemyP.add(enemyPlane);
   
     enemyPlane.debug = false  
     enemyPlane.setCollider("rectangle",0,0,200,60);
    
 }
}

 function  createMissile () {

      var missile = createSprite(600,100, 60, 10);
      missile.addImage(missileImage);
      missile.y=  fighterPlane.y;
      missile.velocityX = -8;
      missile.lifetime = 150;
      missile.scale = 0.6;
      missiles.add(missile);
   
     missile.debug = true 
     missile.setCollider("rectangle",0,0,200,50);
    }

function reset(){
  
    gameState = PLAY;
    enemyPlane.VelocityY = 0;
    fighterPlane.addImage( fighterPlaneImage);
    fighterPlane.scale = 0.6;
    dangerStreet.velocityX = -1;
    enemyP.destroyEach();
    bulletGroup.destroyEach();
    score = 0;  
}