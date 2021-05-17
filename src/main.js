const { Gallery } = require('./components/Gallery');
const { Loader } = require('./components/Loader');
import './styles/style.scss';
const main = document.getElementById('main');
const loader = new Loader(main);
const gallery = new Gallery(main);
loader.onloadFile((data) => gallery.draw(data));
