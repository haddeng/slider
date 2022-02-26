export default class View {
	
	constructor(template, data)	{
    	this.template = template;
    	this.data = data;
		this.attached = false;
		this.built = false;

		var div = document.createElement('div');
		div.setAttribute('id', this.constructor.name);
		//var text = document.createTextNode('Loading...');
		//div.appendChild(text);
		this.container = div;
  	}


	static newInstance(update) {
		var instance = new this();
		
		if (update) {
			instance.update();
		}
		
		return instance;
	}
	
	
	async update() {
		var that = this;
	
		loadResource(this.template)
		.then(function(content) {
			console.log('Updating ' + that.constructor.name);
			
			// Convert template HTML to DOM
			var domParser = new DOMParser();
			var htmlDocument = domParser.parseFromString(content, 'text/html');
			
			// Embed sub DOMs in template slots
			for (var key in that.data) {
				console.log(key);
				var value = that.data[key];

				if (value.container && value.container.nodeType) {
					value = value.container;
					console.log('Slotting ' + value.id + ' into ' + that.constructor.name);
				} else {
					value = document.createTextNode(value);
				}
				
				htmlDocument.getElementById(key).appendChild(value);
			}
			
			that.replaceChildren(that.container, htmlDocument.body.firstChild);
			//that.container = htmlDocument.body.firstChild;
			that.onUpdated();
			that.built = true;
			
			if (that.attached && that.built) {
				console.log('CALLING onVisible FROM BUILT');
				//that.onVisible();
			}
		});
	}
	
	
	replaceChildren(target, replacement) {
		// Clear out current content
		while (target.firstChild) target.removeChild(target.firstChild);
		
		// Embed the replacement
		//replacement.childNodes.forEach(function(item) {
			//target.appendChild(item);
		//});
		target.appendChild(replacement);		
	}
	
	
	onAttach() {
		console.log('ATTACHED');
		this.attached = true;
		
		if (this.attached && this.built) {
			console.log('CALLING onVisible FROM ATTACHED');
			onVisible();
		}
	}
	
	onVisible() {
		console.log('VISIBLE');
	}
	
	onUpdated() {
		console.log('UPDATED');
	}
	
	
	getDeviceDimensions()
	{
		var screenWidth = window.screen.width; 
    	var screenHeight = window.screen.height;
    	var computedPixelRatio =  (window.screen.availWidth / document.documentElement.clientWidth);                        // a more reliable measure of device pixel ratio due to android firefox bugs...
    	computedPixelRatio = window.devicePixelRatio >= computedPixelRatio ? window.devicePixelRatio : computedPixelRatio;  // select whichever value is larger between pixel ratio methods

	    if (navigator.userAgent.indexOf('Android') != -1) 
	    {
	        screenWidth = screenWidth / computedPixelRatio;
	        screenHeight = screenHeight / computedPixelRatio;
	    }

    	console.log(screenWidth + " " + screenHeight + " " + window.devicePixelRatio + " " + computedPixelRatio);

		return {
			height: screenHeight,
			width: screenWidth,
		};
	}
}
