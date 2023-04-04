var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
 towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 300);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.4;

  doorsGroup = new Group();
  climbersGroup = new Group();
 

}

function draw() {
background(200);
  drawSprites();
  if (gameState == "play") {

    if (tower.y > 400) {
      tower.y = 300
    }

    if (keyDown("space")) {
      ghost.velocityY = -2;
    }
    ghost.velocityY = ghost.velocityY + 0.7;

    if (keyDown(RIGHT_ARROW)) {
      ghost.x = ghost.x + 3;
    }

    if (keyDown(LEFT_ARROW)) {
      ghost.x = ghost.x - 3;
    }

    spawnDoors();

    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (doorsGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }
  }
  if (gameState == "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("game over", 230, 250);
  }
}

function spawnDoors() {
  if (frameCount % 300 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200, 10);
    door.x = Math.round(random(120, 400));
    climber.x = door.x;
    door.addImage(doorImg);
    climber.addImage(climberImg);
    door.velocityY = 1;
    climber.velocityY = 1;
    doorsGroup.add(door);
    climbersGroup.add(climber);
  }
}