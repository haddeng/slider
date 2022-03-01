export default class Tile {

	#color;
	#gameContext;
	#oldX;
	#oldY;
	#x = 0;
	#y = 0;
	#velocityX = 0;
	#velocityY = 0;

	constructor(gameContext) {
		this.#gameContext = gameContext;
		this.#color = '#' + Math.floor(Math.random()*16777215).toString(16);
	}
	
	
	detectCollision(secondsPassed) {
			
		if (this.#x > this.#gameContext.getXTiles() - 1) {
			// Hit right wall
			this.#x = Math.floor(this.#x);
			this.#velocityX = 0;
		} else {
			if (this.#x < 0) {
				// Hit left wall
				this.#x = 0;
				this.#velocityX = 0;
			}
		}
		
		if (this.#y > this.#gameContext.getYTiles() - 1) {
			// Hit bottom wall
			this.#y = Math.floor(this.#y);
			this.#velocityY = 0;
		} else {
			if (this.#y < 0) {
				// Hit top wall
				this.#y = 0;
				this.#velocityY = 0;
			}
		}
		
		if (this.#velocityX > 0) {
			if (this.#gameContext.getTileAt(Math.ceil(this.#x), Math.floor(this.#y)) !== null) {
				// Hit tile to right
				this.#x = Math.floor(this.#x);
				this.#velocityX = 0;			
			}
		} else {
			if (this.#velocityX < 0) {
				if (this.#gameContext.getTileAt(Math.floor(this.#x), Math.floor(this.#y)) !== null) {
					//debugger;
					// Hit tile to left
					//this.#x = Math.ceil(this.#x);
					//this.#velocityX = 0;			
				}
			}		
		}
		
		//this.#gameContext.clearTileAt(Math.floor(this.#oldX), Math.floor(this.#oldY));
		this.#gameContext.setTileAt(Math.floor(this.#x), Math.floor(this.#y), this);
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
		this.#gameContext.clearTileAt(Math.floor(this.#x), Math.floor(this.#y));
		this.#oldX = this.#x;
		this.#oldY = this.#y;
		this.#x += (this.#velocityX * secondsPassed);
		this.#y += (this.#velocityY * secondsPassed);
		
		if (this.#x >= 0 && this.#y >= 0) {
			this.#gameContext.setTileAt(Math.floor(this.#x), Math.floor(this.#y), this);
		}
	}
}