export default class Image {
	
	#divElement;
	#imgElement;
	
	
	constructor(src, gameContext) {
		this.#divElement = document.createElement('div');
		this.#divElement.style.display = 'none';
		this.#imgElement = document.createElement('img');
		this.#imgElement.id = 'image';
		this.#imgElement.src = src;
		this.#imgElement.height = gameContext.getCanvasContext().canvas.height;
		this.#imgElement.width = gameContext.getCanvasContext().canvas.width;
		this.#divElement.appendChild(this.#imgElement);
		document.body.appendChild(this.#divElement);
  	}


	getImage() {
		return this.#imgElement;
	}
}
