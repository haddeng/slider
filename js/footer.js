export default class Footer {

	init() {
		const node = document.createTextNode(new Date().getFullYear());
		document.getElementById('copyright-year').appendChild(node);
	}
}