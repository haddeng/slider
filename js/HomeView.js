import View from './View.js';

export default class HomeView extends View {

	constructor() {
		super('html/home.html', {
		});
	}

	
	onRendered() {
		super.onRendered();
		var that = this;
		
		const observer = new MutationObserver((mutations, obs) => {
			const h = document.getElementById('header')
			const b = document.getElementById('content');
			const f = document.getElementById('footer');
			
			//console.log('element = ' + element);
			
			if (h && b && f) {
				//console.log(hello.innerText)
				that.size();
				obs.disconnect();
				return;
			}
		});
		
		observer.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: true
		});
		
		this.container.classList.add("ready");
		//super.container.element.querySelector('[id=canvas-container]').style.height = '200px';
		//super.container.getElementById('canvas-container').style.width = '200px';
		
		//var deviceDimensions = super.getDeviceDimensions();
		
		//if (deviceDimensions.height > deviceDimensions.width) {
			//console.log('portrait')
			//this.container.querySelector('[id="canvas-container"]').style.height = '80vw';
			//this.container.querySelector('[id="canvas-container"]').style.width = '80vw';
		//} else {
			//console.log('landscape');
			//this.container.querySelector('[id="canvas-container"]').style.height = '50vmin';
			//this.container.querySelector('[id="canvas-container"]').style.width = '50vmin';
		//}
		
		//console.log('container height = ' + this.container.querySelector('[id="canvas-container"]').clientHeight);
		//this.container.querySelector('[id="canvas-container"]').style.height = '200px';
		//this.container.querySelector('[id="canvas-container"]').style.width = '200px';
	}


	size() {
		console.log('parent clientHeight = ' + this.container.clientHeight);
		console.log('parent clientWidth = ' + this.container.clientWidth);
	
		console.log('parent clientHeight = ' + this.container.offsetHeight);
		console.log('parent clientWidth = ' + this.container.offsetWidth);
		
		if (this.container.clientHeight > this.container.clientWidth) {
			console.log('portrait');
			this.container.querySelector('[id="canvas-container"]').style.width = '100%';
			var width = this.container.querySelector('[id="canvas-container"]').clientWidth;
			this.container.querySelector('[id="canvas-container"]').style.height = width + 'px';
		} else {
			console.log('landscape');
			this.container.querySelector('[id="canvas-container"]').style.height = '100%';
			var height = this.container.querySelector('[id="canvas-container"]').clientHeight;
			this.container.querySelector('[id="canvas-container"]').style.width = height + 'px';
		}	
	}
}
