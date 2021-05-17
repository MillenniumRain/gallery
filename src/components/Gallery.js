export class Gallery {
	constructor(main) {
		this.div = document.createElement('DIV');
		this.div.id = 'gallery';
		this.div.className = 'gallery';
		this.div.addEventListener('click', (e) => {
			if (e.target.classList.contains('gallery__remove')) this.remove(e);
		});
		main.append(this.div);
	}
	remove(e) {
		e.target.closest('.gallery__container').outerHTML = '';
	}
	get() {
		return this.div;
	}
	draw(data) {
		data = JSON.parse(data);
		let html = ``;
		data.galleryImages.map((value, index) => {
			html += this.cardTamplate(value.url, index);
		});
		this.div.innerHTML += html;
	}
	cardTamplate(src, id) {
		return `<div class="gallery__container"">
			<img  class="gallery__img" src="${src}" alt="" />
			<div class="gallery__remove">&#10006;</div>
		</div>`;
	}
}
