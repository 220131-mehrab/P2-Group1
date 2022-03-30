const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const PADDLE1X = 20;
const PADDLE2X = 780;

let canvas, canvasContext;
let mouseX, mouseY;

let paddle1Y = 50;
let paddle1Top, paddle1Bottom, paddle1Right, paddle1Center;
let paddleThickness = 20;
let paddle2Y = 450;
let paddle2Top, paddle2Bottom, paddle2Right, paddle2Center;
let paddle2SpeedY = 15;

let ballX = CANVAS_WIDTH / 2 ;
let ballY = CANVAS_HEIGHT / 2;
let ballRadius = 10;
let ballTop = ballY - ballRadius / 2;
let ballBottom = ballY + ballRadius / 2;
let ballLeft = ballX - ballRadius / 2;
let ballRight = ballX + ballRadius / 2;
let ballSpeedX = 15;
let ballSpeedY = 7;
let ballSpeed;

let ballText = document.getElementById('ball');
let ballText2 = document.getElementById('ballAtts');

let pauseGame = false;

function updateMousePos(evt) {
	let rect = canvas.getBoundingClientRect(); // Position of mouse on page
	let root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	paddle1Y = mouseY - (PADDLE_HEIGHT / 2);
}



window.onload = function() {
	canvas = document.getElementById('pongCanvas');
	canvasContext = canvas.getContext('2d');

		let framesPerSecond = 30;
		setInterval(CallAll, 1000/framesPerSecond)

	canvas.addEventListener('mousemove', updateMousePos);
}



function ballReset() {
	ballX = CANVAS_WIDTH / 2;
	ballY = CANVAS_HEIGHT / 2;
}

function BallMove() {
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if (ballY < 0 || ballY > CANVAS_HEIGHT)
		ballSpeedY *= -1;

	if (ballX < paddle1Right+paddleThickness && ballY < paddle1Y + PADDLE_HEIGHT && ballY > paddle1Y)
		ballSpeedX *= -1;
	                         // Paddle 1 Collision information
	else if (ballX < 0)
		ballReset();

	if (ballX > PADDLE2X+paddleThickness && ballY < paddle2Y + PADDLE_HEIGHT && ballY > paddle2Y) {
		ballSpeedX *= -1;
	}
							// Paddle 2 Collision information
	else if (ballX > CANVAS_WIDTH) {
		ballReset();
	}



	ballText.value = "X = " + ballX + "  Y = " + ballY;

}

function AIPaddle() {
	// Have the paddle2 chase after the ball.
	// Have center of paddle2 follow ballY.

	// Grab difference of ballY and paddle2Y.
	// Paddle2Y follows ballY, and stop if the center is parallel to ballY.

	GetNewRandomSpeed();
	if (paddle2Center > ballY)
		paddle2Y -= Math.abs(ballSpeedY) - ballSpeed;
	else if (paddle2Center < ballY)
		paddle2Y += Math.abs(ballSpeedY) - ballSpeed;

}

function GetNewRandomSpeed() {
	ballSpeed = Math.random() * 3;
}

function MoveAll() {
	BallMove();
	AIPaddle();
}

function DrawAll(){
  colorRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT, 'black'); //background
  colorRect(PADDLE1X, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, '#e0e0e0'); // Left Player
  colorRect(PADDLE2X, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, '#e0e0e0'); // Right Player
  colorCircle(ballX, ballY, ballRadius, 'white'); // draws ball.
}

function CallAll() {
	DrawAll();
	MoveAll();
	DrawNet();
	UpdateVars();
}

function UpdateVars() {
	paddle1Top = paddle1Y;
	paddle1Bottom = paddle1Y + PADDLE_HEIGHT;
	paddle1Center = paddle1Y + PADDLE_HEIGHT / 2;
	paddle1Right = PADDLE1X;
	paddle2Top = paddle2Y;
	paddle2Bottom = paddle2Y + PADDLE_HEIGHT;
	paddle2Center = paddle2Y + PADDLE_HEIGHT / 2;
	paddle2Right = PADDLE2X;
	ballTop = ballY - (ballRadius / 2); // verified
	ballBottom = ballY + (ballRadius / 2); // verified
	ballLeft = ballX - (ballRadius / 2); // verified
	ballRight = ballX + (ballRadius / 2); // verified
	// ballText2.value = "BallLeft = " + ballLeft + ", BallRight " + ballRight + ", BallTop " + ballTop + ", BallBottom " + ballBottom;
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}

function DrawNet() {
	for (let i=0; i < CANVAS_HEIGHT; i+=35) {
		colorRect(CANVAS_WIDTH / 2, i, 5, 25, '#c7c7c7');
	}
}

