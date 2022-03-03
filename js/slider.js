import Footer from './footer.js';
import GameContext from './game-context.js';
import Sound from './sound.js';
import Tile from './tile.js';

var gameContext = new GameContext();
//var gameObjects = [];
var oldTimeStamp = 0;
var sound;


function clearCanvas() {
	gameContext.getCanvasContext().clearRect(0, 0, gameContext.getCanvasContext().canvas.width, gameContext.getCanvasContext().canvas.height);
}


function init() {
	const footer = new Footer();
	footer.init();	
	resize();
	
	initControls();
	initSounds();
	
	gameContext.setCanvasContext(document.getElementById('game-canvas').getContext('2d'));
	//let tile1 = new Tile(gameContext);
	//tile1.setX(4);
	//tile1.setY(0);
	//tile1.setId(1);
	//gameContext.setTileAt(4, 0, tile1);
	//gameContext.getGameObjects().push(tile1);
	//let tile2 = new Tile(gameContext);
	//tile2.setX(4);
	//tile2.setY(1);
	//tile2.setId(2);
	//gameContext.getGameObjects().push(tile2);
	//gameContext.setTileAt(4, 1, tile2);
	
	window.requestAnimationFrame(updateGame);
}


function initControls() {		
	let canvas = document.getElementById('game-canvas');
	
	canvas.addEventListener('mousedown', function(event) {
		controlDown(event);
	});
	
	canvas.addEventListener('touchstart', function(event) {
		controlDown(event);
	});
	
	canvas.addEventListener('mouseup', function(event) {
		controlUp(event);
	});
	
	canvas.addEventListener('touchend', function(event) {
		controlUp(event);
	});
}


function initSounds() {
	sound = new Sound('https://www.w3schools.com/graphics/bounce.mp3');
}


function controlDown(event) {
	event.preventDefault();
	let canvas = document.getElementById('game-canvas');
	
	let canvasX = (event.pageX || event.changedTouches[0].pageX) - canvas.offsetLeft;
	let canvasY = (event.pageY || event.changedTouches[0].pageY) - canvas.offsetTop;
	let gridX = Math.floor(canvasX / gameContext.getTileWidth());
	let gridY = Math.floor(canvasY / gameContext.getTileHeight());
	let tile = gameContext.getTileAt(gridX, gridY);

	if (tile == null) {
		gameContext.setDragStart(null);
		
		if (gridX == 0 && gridY == 0 && gameContext.getTileAt(0, 0) == null) {
			newTile();
		}
		
		return;
	}
	
	//debugger;
	
	let dragStart =  {
		tile: tile,
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
	
	if (gameContext.getDragStart() == null) {
		return;
	}
	
	let canvas = document.getElementById('game-canvas');
	
	let canvasX = (event.pageX || event.changedTouches[0].pageX) - canvas.offsetLeft;
	let canvasY = (event.pageY || event.changedTouches[0].pageY) - canvas.offsetTop;
	let gridX = Math.floor(canvasX / gameContext.getTileWidth());
	let gridY = Math.floor(canvasY / gameContext.getTileHeight());

	let vectorX = canvasX - gameContext.getDragStart().x;
	let vectorY = canvasY - gameContext.getDragStart().y;
	let tile = gameContext.getDragStart().tile;
	
	console.log('vectorX = ' + vectorX);
	console.log('vectorY = ' + vectorY);

	if (Math.abs(vectorX) > Math.abs(vectorY)) {
		console.log('Horizontal move');
		
		if (vectorX < 0) {
			// Left	
			console.log('Left');
			tile.setVelocityX(-gameContext.getTileVelocity());
		} else {
			// Right
			console.log('Right');
			tile.setVelocityX(gameContext.getTileVelocity());
		}
	} else {
		console.log('Vertical move');
		
		if (vectorY < 0) {
			// Up	
			console.log('Up');
			tile.setVelocityY(-gameContext.getTileVelocity());
		} else {
			// Down
			console.log('Down');
			tile.setVelocityY(gameContext.getTileVelocity());
		}
	}

	gameContext.setCanvasDrag(false);
	//gameContext.setDragStart(dragStart);
	console.log('MOUSE UP');
}


function newTile() {
	let tile = new Tile(gameContext);
	tile.setX(0);
	tile.setY(0);
	tile.setVelocityX(gameContext.getTileVelocity());
	//tile.setId(1);
	gameContext.setTileAt(0, 0, tile);
	gameContext.getGameObjects().push(tile);

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
		gameContainerElement.style.width = '95%';
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
	for (let i = 0; i < gameContext.getGameObjects().length; i++) {
		gameContext.getGameObjects()[i].update(secondsPassed);
	}

	// Detect collisions
	for (let i = 0; i < gameContext.getGameObjects().length; i++) {
		gameContext.getGameObjects()[i].detectCollision(secondsPassed, sound);
	}

	// Clear the canvas
	clearCanvas();

	// Draw
	for (let i = 0; i < gameContext.getGameObjects().length; i++) {
		gameContext.getGameObjects()[i].draw(secondsPassed);
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


