// GLOBAL SCOPE VARIABLES

// Scoreboard
let score = 0;
let scoreboard = {
  score: 0, 

  update: function(){
    this.score++;
    print(this.score);
  }
}
// Ball
var ballX; 
var ballY;
var ballWidth = 40;
var ballHeight = 40;
var ballSpeed = 6;
var ballDirectionX = 1;
var ballDirectionY = 1;
// Player paddle
var playerWidth = 30;
var playerHeight = 100;
var pSpeed = 7;
// Player paddle position
var p1x = 20;
var p1y = 250;
// Audio 
let backgroundMusic;
let paddleHit;


// Load music before play
function preload() {
  backgroundMusic = loadSound('retromusic.m4a');
  paddleHit = loadSound('boop.wav');
}


// SETUP
function setup() {
  createCanvas(700, 500);
  ballPosition();
  textAlign(CENTER);
  backgroundMusic.play();
}


// DRAW
function draw() {
  background('#B33951');
  paddleAudio();
  paddle();
  ball();
  keyPressed();
  playBall();
  wallCollision();
  paddleCollision()
  scoreboardScreen();
  resetBall();
  gameOver();
  paddleAudio();
}


// FUNCTIONS

// Scoreboard
function scoreboardScreen() {
  textSize(24);
  text(score, 300, 40);
  if( ballX >= p1x-15 && ballX <= p1x+15 && ballY >= p1y-50 && ballY <= p1y+50){
    score++;
  }
}

// Ball
function ball() {
  fill('#F1F7ED');
  noStroke;
  rect(ballX, ballY, ballWidth, ballHeight, 50);
}

// Ball starting position
function ballPosition () {
  rectMode(CENTER);
  ballPosition = true;
  ballX = width/2;
  ballY = height/2;
}

// Play ball
function playBall() {
  ballX = ballX + (ballDirectionX*ballSpeed); // Move horizontally
  ballY = ballY + (ballDirectionY*ballSpeed); // Move vertically
}

// Wall collision
function wallCollision() {
  if (ballY >= height) {
    // Bottom wall
    ballDirectionY = ballDirectionY * -1;
  } else if (ballY <= 0) {
    // Top wall
    ballDirectionY = ballDirectionY * -1;
  } else if (ballX >= width) {
    ballDirectionX = ballDirectionX * -1;
  } 
    }

// Paddle
function paddle() {
  noStroke();
  fill('#232975');
  rect(p1x, p1y, playerWidth, playerHeight, 30);
}

// Move paddle
function keyPressed() {
  if (keyCode === UP_ARROW && keyIsPressed) {
      p1y = p1y-pSpeed;
  }
  if (keyCode === DOWN_ARROW && keyIsPressed) {
    p1y = p1y + pSpeed;
  }
}

// Paddle collision
function paddleCollision() {
  if (ballX >= p1x-15 && ballX <= p1x+15 && ballY >= p1y-50 && ballY <= p1y+50) {
    ballDirectionX = ballDirectionX * -1;
  }
}

// Paddle Audio
function paddleAudio(){
  if (ballX >= p1x-15 && ballX <= p1x+15 && ballY >= p1y-50 && ballY <= p1y+50) {
    paddleHit.play();
  }
}

// Reset ball when missed wall/paddle collision
function resetBall() {
  if(ballX <= 0) {
    ballX = width/2;
    ballY = height/2;
    ballDirectionX = ballDirectionX * -1; 
  }
}

// Game Over
function gameOver(){
  if (score >= 10){
  // resetBall = false;
  backgroundMusic.pause();
  textSize(96);
  text("YOU WIN!", 350, 200);
  }
}