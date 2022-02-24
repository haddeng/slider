import View from './View.js';

export default class HeaderView extends View {
	
	constructor() {
    	super('/html/header.html', {});
	}


 	/*async update() {
		var that = this;
	
		loadResource(this.template)
		.then(function(content) {
			var domParser = new DOMParser();
			var htmlDocument = domParser.parseFromString(content, 'text/html');
			that.container.replaceChild(htmlDocument.body.childNodes[0], that.container.childNodes[0]);
			
			var pathname = window.location.pathname;

 			document.querySelectorAll('#header nav a')
			.forEach(el => {
        		el.classList.remove('selected');

 				if ((pathname == '/' && el.pathname == '/') ||
					(pathname.startsWith(el.pathname) && el.pathname != '/')) {
 					el.classList.add('selected');
 				}
 			});
		});
  	}*/
}