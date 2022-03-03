export default class Sound {
	
	#audioElement;
	
	
	constructor(src) {
		this.#audioElement = document.createElement("audio");
		this.#audioElement.src = src;
		this.#audioElement.setAttribute("preload", "auto");
		this.#audioElement.setAttribute("controls", "none");
		this.#audioElement.style.display = "none";
		document.body.appendChild(this.#audioElement);
  	}
	
	
	play() {
		this.#audioElement.play();
	}
}
