import Ter from './ter.png';

export default function addImage() {

    const img = document.createElement('img');
    img.src = Ter;
    img.width = 100
    img.height = 100

    document.querySelector('body').appendChild(img);

}