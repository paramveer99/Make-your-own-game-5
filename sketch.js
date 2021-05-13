var PLAY = 1;
var END = 0;
var gameState = PLAY;
//score
var score = 0;
var Bullet;
var BulletGroup;
var AlienGroup;
function preload(){
  boss=loadImage("Aliensboss.png");
  back=loadImage("background.png");
  coment=loadImage("comet.png");
  Gaurdian=loadImage("gaurdianaliens.png");
  Solider=loadImage("solider.png");
  SpaceShip=loadImage("spaceship.png");
  bullet=loadImage("Bullet.png");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  bg=createSprite(width/2,height/2);
  bg.addImage(back);
  ship=createSprite(1000, 900, 50, 50);
  ship.addImage(SpaceShip);
  ship.scale=0.5;
  BulletGroup = createGroup();
  AlienGroup = createGroup();
}
function draw(){
  background(0);
 
  if(gameState === PLAY){
    ship.x = World.mouseX;
  if(keyDown("space")){
    var temp_arrow = spawnBullet();
   //ship.x =  temp_arrow.x;
   temp_arrow.x = ship.x;
   }  
  bg.velocityY=1;
  if(bg.y > 400){
    bg.y = 200;
  }

  
  spawncomets();
  soliders();
  Gaurdians();
  Boss();
  if(AlienGroup.isTouching(BulletGroup)){
    score = score + 1;
    AlienGroup.destroyEach();
    BulletGroup.destroyEach();
  }
} 
if(AlienGroup.isTouching(ship)){
  gameState = END;
  AlienGroup.destroyEach();
    BulletGroup.destroyEach();
    background.destroyEach();
}
if(keyDown(UP_ARROW)){
  reset();
}


  drawSprites();
  textSize(35)
  fill("white")
  text("Score  " + score, width-300, 50); 
}
if(BulletGroup.isTouching(Boss)){
  gameState = END;
}

function spawncomets(){
  if(World.frameCount % 120===0){
  var comets = createSprite(random(100,200),random(100,300),10,10);
  comets.addImage(coment);
  comets.velocityY = 4;
  comets.velocityX = 2;
  AlienGroup.add(comets);
  }
}

function soliders(){
  if(World.frameCount % 200===0){
    var solider = createSprite(random(500,400),random(1500,500));
    solider.addImage(Solider);
    solider.scale = 0.1;
    solider.velocityX = 1;
    solider.velocityY = 1;
    AlienGroup.add(solider);
  }
}

function Gaurdians(){
  if(World.frameCount % 300===0){
    var gaurdian = createSprite(random(700,600),random(2000,700));
    gaurdian.addImage(Gaurdian);
    gaurdian.scale = 0.3;
    gaurdian.velocityX = 3;
    gaurdian.velocityY = 3;
    AlienGroup.add(gaurdian);
  }
}

function Boss(){
  if(World.frameCount % 600===0){
    var iboss = createSprite(200,200);
    iboss.addImage(boss);
    iboss.scale = 0.4;
    iboss.velocityX = 1;
    iboss.velocityY = 1;
    AlienGroup.add(iboss);
  }
}

function spawnBullet(){
  var Bullet  = createSprite(1000,800,10,);
  Bullet.scale = 0.1;
  Bullet.velocityY = -1;
    Bullet.addImage(bullet);
    BulletGroup.add(Bullet);

    return Bullet;
}