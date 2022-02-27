export default class GameContext {

	static #X_TILES = 4;
	static #Y_TILES = 4;

	#canvasContext;
	#tileHeight;
	#tileWidth;
	
	
	getCanvasContext() {
		return this.#canvasContext;
	}
	
	
	getTileHeight() {
		return this.#tileHeight;
	}
	
	
	getTileWidth() {
		return this.#tileWidth;
	}
	
	
	getXTiles() {
		return GameContext.#X_TILES;
	}
	
	
	#init() {
		this.update();
	}
	
	
	update() {
		if (this.#canvasContext) {
			this.#tileHeight = this.#canvasContext.canvas.height / GameContext.#X_TILES;
			this.#tileWidth = this.#canvasContext.canvas.width / GameContext.#Y_TILES;
		}
	}
	
	
	setCanvasContext(canvasContext) {
		this.#canvasContext = canvasContext;
		//debugger;
		this.#init();
	}
}