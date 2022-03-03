export default class Tile {

	#color;
	#gameContext;
	#id;
	#oldX;
	#oldY;
	#x = 0;
	#y = 0;
	#velocityX = 0;
	#velocityY = 0;

	constructor(gameContext) {
		this.#gameContext = gameContext;
		this.#color = '#' + Math.floor(Math.random()*16777215).toString(16);
		this.#id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	
	
	detectCollision(secondsPassed, sound) {
		
		let collision = false;
		
		if (this.#velocityX == 0 && this.#velocityY == 0) {
			this.#gameContext.setTileAt(Math.floor(this.#x), Math.floor(this.#y), this);
			return;
		}
		
		if (this.#x > this.#gameContext.getXTiles() - 1) {
			// Hit right wall
			this.#x = Math.floor(this.#x);
			this.#velocityX = 0;
			collision = true;
		} else {
			if (this.#x < 0) {
				// Hit left wall
				this.#x = 0;
				this.#velocityX = 0;
				collision = true;
			}
		}
		
		if (this.#y > this.#gameContext.getYTiles() - 1) {
			// Hit bottom wall
			this.#y = Math.floor(this.#y);
			this.#velocityY = 0;
			collision = true;
		} else {
			if (this.#y < 0) {
				// Hit top wall
				this.#y = 0;
				this.#velocityY = 0;
				collision = true;
			}
		}
		
//		if (this.#velocityX > 0) {
//			if (this.#x >= 1) {
//				debugger;
//			}	
//			
//			
//			if (this.#gameContext.getTileAt(Math.ceil(this.#x), Math.floor(this.#y)) !== null) {
//				// Hit tile to right
//				this.#x = Math.floor(this.#x);
//				this.#velocityX = 0;			
//			}
//		} else {
//			if (this.#velocityX < 0) {
//				if (this.#gameContext.getTileAt(Math.floor(this.#x), Math.floor(this.#y)) !== null) {
//					debugger;
//					// Hit tile to left
//					//this.#x = Math.ceil(this.#x);
//					//this.#velocityX = 0;			
//				}
//			}		
//		}

		if (!collision) {
			for (let i = 0; i < this.#gameContext.getGameObjects().length; i++) {
				var tile = this.#gameContext.getGameObjects()[i];
				
				if (tile.getId() == this.#id) {
					// Do not compare with self
					continue;
				}
							
				if (this.getCanvasX() > tile.getCanvasX() + this.#gameContext.getTileWidth() - 1 ||
					this.getCanvasX() + this.#gameContext.getTileWidth() - 1 < tile.getCanvasX() ||
					this.getCanvasY() > tile.getCanvasY() + this.#gameContext.getTileHeight() - 1 ||
					this.getCanvasY() + this.#gameContext.getTileHeight() - 1 < tile.getCanvasY()) {
					continue;
				}
				
				// Collision
				collision = true;
				//console.log('A = ' + (this.getCanvasX() > tile.getCanvasX() + this.#gameContext.getTileWidth()));
				//console.log('B = ' + (this.getCanvasX() + this.#gameContext.getTileWidth() < tile.getCanvasX()));
				//console.log('C = ' + (this.getCanvasY() > tile.getCanvasY() + this.#gameContext.getTileHeight()));
				//console.log('D = ' + (this.getCanvasY() + this.#gameContext.getTileHeight() < tile.getCanvasY()));
				
				//console.log(this.getCanvasY() + " v " + tile.getCanvasY() + this.#gameContext.getTileHeight());
				
				//debugger;
				//this.#x = this.#oldX;
				//this.#y = this.#oldY;
				//this.#velocityX = 0;
				//this.#velocityY = 0;
				if (this.#velocityX > 0) {
					this.#x = Math.floor(this.#x);
					this.#velocityX = 0;
				}
				
				if (this.#velocityX < 0) {
					this.#x = Math.ceil(this.#x);
					this.#velocityX = 0;
				}
				
				if (this.#velocityY > 0) {
					this.#y = Math.floor(this.#y);
					this.#velocityY = 0;
				}
				
				if (this.#velocityY < 0) {
					this.#y = Math.ceil(this.#y);
					this.#velocityY = 0;
				}
			}		
		}
		
		if (collision) {
			sound.play();
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
	
	
	getId() {
		return this.#id;
	}
	
	
	getCanvasX() {
		return this.#x * this.#gameContext.getTileWidth();	
	}
	
	
	getCanvasY() {
		return this.#y * this.#gameContext.getTileHeight();	
	}
	
	
	getX() {
		return this.#x;
	}
	
	
	getY() {
		return this.#y;
	}
	
	
	setId(id) {
		this.#id = id;
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
		//debugger;
		this.#gameContext.clearTileAt(Math.floor(this.#x), Math.floor(this.#y));
		this.#oldX = this.#x;
		this.#oldY = this.#y;
		this.#x += (this.#velocityX * secondsPassed);
		this.#y += (this.#velocityY * secondsPassed);
		
		if (this.#x >= 0 && this.#y >= 0) {
			//this.#gameContext.setTileAt(Math.floor(this.#x), Math.floor(this.#y), this);
		}
	}
}