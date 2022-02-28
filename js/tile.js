export default class Tile {

	#color;
	#gameContext;
	#x = 0;
	#y = 0;
	#velocityX = 8;
	#velocityY = 0;

	constructor(gameContext) {
		this.#gameContext = gameContext;
		this.#color = '#' + Math.floor(Math.random()*16777215).toString(16);
	}
	
	
	draw() {
		//console.log('draw tile');
		
		var canvasX = this.#x * this.#gameContext.getTileWidth();
		var canvasY = this.#y * this.#gameContext.getTileHeight();
		var height = this.#gameContext.getTileHeight();
		var width = this.#gameContext.getTileWidth();

		this.#gameContext.getCanvasContext().beginPath();
		this.#gameContext.getCanvasContext().fillStyle = this.#color;
		//this.#gameContext.getCanvasContext().strokeStyle = 'green';
		this.#gameContext.getCanvasContext().fillRect(canvasX, canvasY, width, height);
		//this.#gameContext.getCanvasContext().strokeRect(canvasX, canvasY, width, height);
		this.#gameContext.getCanvasContext().closePath();
	}
	
	
	setVelocityX(velocityX) {
		this.#velocityX = velocityX;	
	}
	
	
	setVelocityY(velocityY) {
		this.#velocityY = velocityY;	
	}
	
	setX(x) {
		this.#x = x;
	}
	
	
	setY(y) {
		this.#y = y;
	}
	
	
	update(secondsPassed) {
		//console.log('update tile');
		
		if (this.#velocityX > 0 && this.#x < this.#gameContext.getXTiles() - 1) {
			this.#x += (this.#velocityX * secondsPassed);
			
			if (this.#x > this.#gameContext.getXTiles() - 1) {
				this.#x = Math.floor(this.#x);
			}
		} else {
			if (this.#velocityX < 0 && this.#x > 0) {
				this.#x += (this.#velocityX * secondsPassed);
				
				if (this.#x < 0) {
					this.#x = 0;
				}
			}
		}
		
		if (this.#velocityY > 0 && this.#y < this.#gameContext.getYTiles() - 1) {
			this.#y += (this.#velocityY * secondsPassed);
			
			if (this.#y > this.#gameContext.getYTiles() - 1) {
				this.#y = Math.floor(this.#y);
			}
		} else {
			if (this.#velocityY < 0 && this.#y > 0) {
				this.#y += (this.#velocityY * secondsPassed);
				
				if (this.#y < 0) {
					this.#y = 0;
				}
			}
		}
	}
}