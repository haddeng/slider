import View from './View.js';

export default class HomeView extends View {

	constructor() {
		super('html/home.html', {
		});
	}

	
	onUpdated() {
		console.log('CHANGE IT!!!!');
		//super.container.element.querySelector('[id=canvas-container]').style.height = '200px';
		//super.container.getElementById('canvas-container').style.width = '200px';
		
		var deviceDimensions = super.getDeviceDimensions();
		
		if (deviceDimensions.height > deviceDimensions.width) {
			console.log('portrait')
			this.container.querySelector('[id="canvas-container"]').style.height = '80vw';
			this.container.querySelector('[id="canvas-container"]').style.width = '80vw';
		} else {
			console.log('landscape');
			this.container.querySelector('[id="canvas-container"]').style.height = '50vh';
			this.container.querySelector('[id="canvas-container"]').style.width = '50vh';
		}
		
		console.log('container height = ' + this.container.querySelector('[id="canvas-container"]').clientHeight);
		//this.container.querySelector('[id="canvas-container"]').style.height = '200px';
		//this.container.querySelector('[id="canvas-container"]').style.width = '200px';
	}


	onVisible() {
		console.log('FUCK AYE!');
		//document.getElementById('canvas-container').style.height = document.getElementById('canvas-container').offsetWidth + 'px';
	}
}
