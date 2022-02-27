import Footer from './footer.js';
import GameContext from './game-context.js';
import Tile from './tile.js';

var gameContext = new GameContext();
var gameObjects = [];
var oldTimeStamp = 0;


function clearCanvas() {
	gameContext.getCanvasContext().clearRect(0, 0, gameContext.getCanvasContext().canvas.width, gameContext.getCanvasContext().canvas.height);
}


function init() {
	const footer = new Footer();
	footer.init();	
	resize();
	
	gameContext.setCanvasContext(document.getElementById('game-canvas').getContext('2d'));
	let tile = new Tile(gameContext);
	tile.setX(0);
	tile.setY(0);
	gameObjects.push(tile);
	
	window.requestAnimationFrame(updateGame);
}


function resize() {
	const mainElement = document.getElementById('main');
	const gameContainerElement = document.getElementById('game-container');
	
	if (mainElement.clientHeight > mainElement.clientWidth) {
		console.log('Portrait view detected');
		gameContainerElement.style.width = '100%';
		gameContainerElement.style.height = gameContainerElement.clientWidth + 'px';
	} else {
		console.log('Landscape view detected');
		gameContainerElement.style.height = '100%';
		gameContainerElement.style.width = gameContainerElement.clientHeight + 'px';
	}	
	
	document.getElementById('game-canvas').height = document.getElementById('game-container').clientHeight;
	document.getElementById('game-canvas').width = document.getElementById('game-container').clientWidth;
	gameContext.update();
}


function updateGame(timeStamp) {
	// Calculate the number of seconds passed since the last frame
	let secondsPassed = (timeStamp - oldTimeStamp) / 1000;

	// Move forward in time with a maximum amount
	secondsPassed = Math.min(secondsPassed, 0.1);

	oldTimeStamp = timeStamp;

	// Update
	for (let i = 0; i < gameObjects.length; i++) {
		gameObjects[i].update(secondsPassed);
	}

	// Detect collisions
	//detectCollisions();

	// Clear the canvas
	clearCanvas();

	// Draw
	for (let i = 0; i < gameObjects.length; i++) {
		gameObjects[i].draw(secondsPassed);
	}

	// Requesting new frame
	window.requestAnimationFrame(updateGame);
}


document.addEventListener('DOMContentLoaded', (event) => {
  init();
})


window.addEventListener('resize', function() {
	console.log('Resize');
	resize();
});


