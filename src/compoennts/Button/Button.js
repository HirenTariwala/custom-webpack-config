import './Button.scss';

export default class Button {
    btnClass = 'btn';
    render() {
        const button = document.createElement('button');
        button.innerHTML = 'Custom Button';
        button.classList.add(this.btnClass);
        document.querySelector('body').appendChild(button);
        button.onclick = function () {
            const p = document.createElement('p');
            p.innerHTML = 'OnClick Custom Button';
            p.classList.add('paragraph');
            document.querySelector('body').appendChild(p);
        }

    }
}
