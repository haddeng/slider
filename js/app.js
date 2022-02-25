import HomeView from './HomeView.js';
import TemplateView from './TemplateView.js';

var routeMap = new Map();


document.addEventListener('click', function (event) {
	if (!event.target.matches('.nav')) {
    	return;
  	}

	event.preventDefault();

	var pathname = event.target.pathname;
	var parameters = event.target.search;

	var stateDataObj = { url: pathname };
	history.pushState(stateDataObj, '', pathname + parameters);
	route(pathname);

}, false);


function initRoutes() {
	routeMap.set('/', HomeView.newInstance(true));
	routeMap.set('/slider/', HomeView.newInstance(true));
}


function route(pathname) {
	var routeKey = pathname.replace(new RegExp('\/([0-9]+)\/', 'g'), '\/#\/');
	routeKey = routeKey.replace(new RegExp('\/([0-9]+)$', 'g'), '\/#');
	var view = routeMap.get(routeKey);

	if (!view) {
		// URL isn't mapped to a view
    	throw new Error('No view mapped for ' + routeKey);
  	}

	if (decoratorView) {
		// TODO: what if decorator slot has already been filled?
		console.log('Setting decorator content view');
		decoratorView.data['content'] = view;
		view = decoratorView;
	}
	
	//document.getElementById('body').innerHTML = view.container.outerHTML;	
	document.body.appendChild(view.container);
 }


window.addEventListener('error', function (e) {
	alert('Something went wrong. Check logs.');
});


window.addEventListener("load", function() {
	initRoutes();
	route(window.location.pathname);
});


window.addEventListener('popstate', function (e) {
	var state = e.state;

	if (state !== null) {
		route(state.url);
	} else {
		route('/');
	}
});


window.addEventListener('submit', function (event) {
	event.preventDefault();
	sendData(event.target);
});


window.loadResource = function(url) {
	return new Promise(resolve => {
    	var xhr = new XMLHttpRequest();
		//url = View.setUrlParameter(url, 'url', window.location.href); 
		xhr.open('GET', url);

		xhr.onload = function() {
 			if (xhr.status === 200) {
				resolve(xhr.responseText);
			} else {
 				console.log('Request failed.  Returned status of ' + xhr.status);
				// TODO: throw?
			}
		};

		xhr.send();
	});
}


var decoratorView = TemplateView.newInstance(true);