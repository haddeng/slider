import Footer from './footer.js';
import GameContext from './game-context.js';
import Tile from './tile.js';

var gameContext = new GameContext();
var gameObjects = [];
var oldTimeStamp = 0;

var tile;


function clearCanvas() {
	gameContext.getCanvasContext().clearRect(0, 0, gameContext.getCanvasContext().canvas.width, gameContext.getCanvasContext().canvas.height);
}


function init() {
	const footer = new Footer();
	footer.init();	
	resize();
	
	initControls();
	
	gameContext.setCanvasContext(document.getElementById('game-canvas').getContext('2d'));
	tile = new Tile(gameContext);
	tile.setX(0);
	tile.setY(0);
	gameObjects.push(tile);
	
	window.requestAnimationFrame(updateGame);
}


function initControls() {		
	let canvas = document.getElementById('game-canvas');
	
	canvas.addEventListener('mousedown', function(event) {
		controlDown(event);
	});
	
	canvas.addEventListener('mouseup', function(event) {
		controlUp(event);
	});
}


function controlDown(event) {
	let canvas = document.getElementById('game-canvas');
	
	let canvasX = (event.pageX || event.targetTouches[0].pageX) - canvas.offsetLeft;
	let canvasY = (event.pageY || event.targetTouches[0].pageY) - canvas.offsetTop;
	let gridX = Math.floor(canvasX / gameContext.getTileWidth());
	let gridY = Math.floor(canvasY / gameContext.getTileHeight());
	
	let dragStart =  {
		x: canvasX,
		y: canvasY
	}
	
	console.log(canvasX);
	console.log(gridX);

	gameContext.setCanvasDrag(true);
	gameContext.setDragStart(dragStart);
	console.log('MOUSE DOWN');
}


function controlUp(event) {
	let canvas = document.getElementById('game-canvas');
	
	let canvasX = (event.pageX || event.targetTouches[0].pageX) - canvas.offsetLeft;
	let canvasY = (event.pageY || event.targetTouches[0].pageY) - canvas.offsetTop;
	let gridX = Math.floor(canvasX / gameContext.getTileWidth());
	let gridY = Math.floor(canvasY / gameContext.getTileHeight());

	let vectorX = canvasX - gameContext.getDragStart().x;
	let vectorY = canvasY - gameContext.getDragStart().y;
	
	console.log('vectorX = ' + vectorX);
	console.log('vectorY = ' + vectorY);

	if (Math.abs(vectorX) > Math.abs(vectorY)) {
		console.log('Horizontal move');
		
		if (vectorX < 0) {
			// Left	
			console.log('Left');
			tile.setVelocityX(-8);
		} else {
			// Right
			console.log('Right');
			tile.setVelocityX(8);
		}
	} else {
		console.log('Vertical move');
		
		if (vectorY < 0) {
			// Up	
			console.log('Up');
			tile.setVelocityY(-8);
		} else {
			// Down
			console.log('Down');
			tile.setVelocityY(8);
		}
	}

	gameContext.setCanvasDrag(false);
	//gameContext.setDragStart(dragStart);
	console.log('MOUSE UP');
}


function resize() {
	const mainElement = document.getElementById('main');
	const gameContainerElement = document.getElementById('game-container');
	
	gameContainerElement.style.height = '0px';
	gameContainerElement.style.width = '0px';
	document.getElementById('game-canvas').height = 0;
	document.getElementById('game-canvas').width = 0;
	
	if (mainElement.clientHeight > mainElement.clientWidth) {
		console.log('Portrait view detected');
		gameContainerElement.style.width = '100%';
		gameContainerElement.style.height = gameContainerElement.clientWidth + 'px';
	} else {
		console.log('Landscape view detected');
		gameContainerElement.style.height = '100%';
		console.log('container height = ' + gameContainerElement.clientHeight + 'px');
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


