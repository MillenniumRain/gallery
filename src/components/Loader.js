export class Loader {
	constructor(main) {
		this.inputFile = document.createElement('INPUT');
		this.inputFile.id = 'drop-area__load-file';
		this.inputFile.type = 'file';
		this.inputUrl = document.createElement('INPUT');
		this.inputUrl.id = 'drop-area__load-url';
		this.inputUrl.type = 'text';
		this.buttonSubmit = document.createElement('button');
		this.buttonSubmit.type = 'submit';
		this.buttonSubmit.className = 'drop-area__submit';
		this.buttonSubmit.innerHTML = 'Загрузить';
		this.div = document.createElement('DIV');
		this.div.id = 'drop-area';
		this.div.className = 'drop-area';

		this.div.ondragover = function (e) {
			this.className = 'hover';
			return false;
		};

		this.div.ondragleave = function (e) {
			this.classList.remove('hover');
			return false;
		};

		this.div.ondrop = function (e) {
			const files = this.querySelector('input[type="file"]');
			files.files = e.dataTransfer.files;
			this.className = 'drop';
			return false;
		};
		this.form = document.createElement('FORM');
		this.form.className = 'drop-area__my-form';
		this.form.innerHTML = `
		<p> 
			https://don16obqbay2c.cloudfront.net/frontend-test-task/gallery-images.json 
			<br>
			Загрузите изображения с помощью диалога выбора файлов или
			перетащив нужные изображения в выделенную область
			<br>
			<br>
			URL:
		</p>`;
		this.form.append(this.inputUrl);
		this.form.append(this.inputFile);
		this.form.append(this.buttonSubmit);
		this.div.append(this.form);
		main.append(this.div);
	}

	onloadFile(callback) {
		this.form.addEventListener('submit', (e) => {
			e.preventDefault();
			if (this.inputUrl.value) {
				fetch(this.inputUrl.value)
					.then((res) => res.blob())
					.then((blob) => {
						let reader = new FileReader();
						reader.readAsText(blob);
						reader.onload = function () {
							if (callback) callback(reader.result);
						};
						return reader;
					});
				this.inputUrl.value = '';
			} else if (this.inputFile.files[0].type === 'application/json') {
				let reader = new FileReader();
				reader.readAsText(this.inputFile.files[0]);
				reader.onload = function () {
					if (callback) callback(reader.result);
				};
				return reader;
			} else if (this.inputFile.files[0].type.indexOf('image') != -1) {
				let reader = new FileReader();
				reader.readAsDataURL(this.inputFile.files[0]);
				reader.onload = function () {
					const data = {
						galleryImages: [
							{
								url: reader.result,
							},
						],
					};
					if (callback) callback(JSON.stringify(data));
				};
				return reader;
			}
		});
	}
}
