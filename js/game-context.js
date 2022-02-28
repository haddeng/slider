export default class GameContext {

	static #X_TILES = 5;
	static #Y_TILES = 5;

	#canvasContext;
	#canvasDrag = false;
	#dragStart;
	#tileHeight;
	#tileWidth;
	
	
	getCanvasContext() {
		return this.#canvasContext;
	}
	
	
	getDragStart() {
		return this.#dragStart;
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
	
	
	getYTiles() {
		return GameContext.#Y_TILES;
	}
	
	
	isCanvasDrag() {
		return this.#canvasDrag;
	}
	
	
	#init() {
		this.update();
	}
	
	
	update() {
		if (this.#canvasContext) {
			this.#tileHeight = this.#canvasContext.canvas.height / GameContext.#Y_TILES;
			this.#tileWidth = this.#canvasContext.canvas.width / GameContext.#X_TILES;
		}
	}
	
	
	setCanvasContext(canvasContext) {
		this.#canvasContext = canvasContext;
		//debugger;
		this.#init();
	}
	
	
	setCanvasDrag(canvasDrag) {
		this.#canvasDrag = canvasDrag;
	}
	
	
	setDragStart(dragStart) {
		this.#dragStart = dragStart;
	}
}