import View from './View.js';
import HeaderView from './HeaderView.js';
import FooterView from './FooterView.js';

export default class TemplateView extends View {
	
	constructor() {
		super('html/template.html', {
			header: HeaderView.newInstance(true),
			footer: FooterView.newInstance(true),
		});
	}

}
