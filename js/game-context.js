export default class GameContext {

	static #X_TILES = 5;
	static #Y_TILES = 5;

	#canvasContext;
	#canvasDrag = false;
	#dragStart;
	#gameObjects = [];
	#tileGrid;
	#tileHeight;
	#tileVelocity = 10;
	#tileWidth;


	clearTileAt(x, y) {
		this.#tileGrid[y][x] = null;
	}
		
	
	getCanvasContext() {
		return this.#canvasContext;
	}
	
	
	getDragStart() {
		return this.#dragStart;
	}

	
	getGameObjects() {
		return this.#gameObjects;
	}
	
	
	getTileAt(x, y) {
		return this.#tileGrid[y][x];
	}
	
	
	getTileHeight() {
		return this.#tileHeight;
	}
	
	
	getTileVelocity() {
		return this.#tileVelocity;
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
		
		this.#tileGrid = [];
		
		for (let y = 0; y < GameContext.#Y_TILES; y++) {
			let row = [];
			
			for (let x = 0; x < GameContext.#X_TILES; x++) {
				row.push(null);
			}
			
			this.#tileGrid.push(row);
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
	
	
	setTileAt(x, y, value) {
		this.#tileGrid[y][x] = value;
	}
	
	
	update() {
		if (this.#canvasContext) {
			this.#tileHeight = this.#canvasContext.canvas.height / GameContext.#Y_TILES;
			this.#tileWidth = this.#canvasContext.canvas.width / GameContext.#X_TILES;
		}
	}
}