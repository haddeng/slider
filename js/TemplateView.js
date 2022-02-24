import View from '/js/View.js';
import HeaderView from '/js/HeaderView.js';
import FooterView from '/js/FooterView.js';

export default class TemplateView extends View {
	
	constructor() {
		super('/html/template.html', {
			header: HeaderView.newInstance(true),
			footer: FooterView.newInstance(true),
		});
	}

}
