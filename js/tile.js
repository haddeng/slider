export default class Tile {

	#color;
	#gameContext;
	#x = 0;
	#y = 0;
	#velocityX = 4;

	constructor(gameContext) {
		this.#gameContext = gameContext;
		this.#color = '#' + Math.floor(Math.random()*16777215).toString(16);
	}
	
	
	draw() {
		console.log('draw tile');
		
		var canvasX = this.#x * this.#gameContext.getTileWidth();
		var canvasY = 0;
		var height = this.#gameContext.getTileHeight();
		var width = this.#gameContext.getTileWidth();

		this.#gameContext.getCanvasContext().beginPath();
		this.#gameContext.getCanvasContext().fillStyle = this.#color;
		//this.#gameContext.getCanvasContext().strokeStyle = 'green';
		this.#gameContext.getCanvasContext().fillRect(canvasX, canvasY, width, height);
		//this.#gameContext.getCanvasContext().strokeRect(canvasX, canvasY, width, height);
		this.#gameContext.getCanvasContext().closePath();
	}
	
	
	setX(x) {
		this.#x = x;
	}
	
	
	setY(y) {
		this.#y = y;
	}
	
	
	update(secondsPassed) {
		console.log('update tile');
		
		if (this.#x < this.#gameContext.getXTiles() - 1) {
			this.#x += (this.#velocityX * secondsPassed);
		}
	}
}