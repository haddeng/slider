import View from './View.js';

export default class FooterView extends View {
	constructor() {
		super('html/footer.html', {
			year: new Date().getFullYear(),
		});
	}
}

