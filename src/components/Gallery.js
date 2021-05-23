export class Gallery {
	constructor(main) {
		this.div = document.createElement('DIV');
		this.div.id = 'gallery';
		this.div.className = 'gallery';
		this.div.addEventListener('click', (e) => {
			if (e.target.classList.contains('gallery__remove')) this.remove(e);
		});
		window.onresize = () => {
			this.updateGallery();
		};
		main.append(this.div);
	}
	updateGallery() {
		let img = document.querySelectorAll('.gallery__img');
		for (let i = 0; i < img.length; i++) {
			img[i].style = '';
		}
		this.resizeImages(img);
	}
	remove(e) {
		e.target.closest('.gallery__container').outerHTML = '';
		this.updateGallery();
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
		this.resizeImagesOnLoad();
	}
	resizeImagesOnLoad() {
		let images = document.querySelectorAll('.gallery__img');
		let counter = 0;

		images.forEach((val) => {
			val.onload = () => {
				counter++;
				if (counter == images.length) {
					this.updateGallery();
				}
			};
		});
	}
	resizeImages(images) {
		let countInRow = 1;
		let widthtInRow = images[0].offsetWidth;
		for (let i = 0; i < images.length; i++) {
			if (widthtInRow > gallery.offsetWidth) {
				this.resizeImagesInRow(
					images,
					i,
					this.div,
					countInRow,
					widthtInRow + 2
				);
				countInRow = 1;
				widthtInRow = images[i + 1]
					? images[i + 1].offsetWidth
					: images[i].offsetWidth;
			} else {
				countInRow++;
				widthtInRow += images[i + 1]
					? images[i + 1].offsetWidth
					: images[i].offsetWidth;
			}
		}
	}
	resizeImagesInRow(images, index, gallery, countInRow, widthtInRow) {
		let blockWidth = gallery.offsetWidth;
		let rowWidth = widthtInRow;

		let ratio = rowWidth / images[index].offsetHeight;
		let height = (rowWidth - blockWidth) / ratio;

		for (let i = 0; i < countInRow; i++) {
			let h = images[index + 1 - countInRow + i].offsetHeight - height;
			images[index + 1 - countInRow + i].style.height = h + 'px';
		}
	}
	cardTamplate(src, id) {
		return `<div class="gallery__container">
			<img  class="gallery__img" src="${src}" alt="" />
			<div class="gallery__remove">&#10006;</div>
		</div>`;
	}
}
