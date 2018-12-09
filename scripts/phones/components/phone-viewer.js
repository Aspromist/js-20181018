import Component from '../../shared/component.js';

export default class PhoneViewer extends Component {
  constructor({ element }) {
    super({ element });

    this.on('click', '[data-element="button-back"]', (event) => {
      this._trigger('back');
    });

    this.on('click', '[data-element="button-cart-add"]', (event) => {
      this._trigger('add', event.delegateTarget.dataset.phoneId);
    });

    this.on('click', '[data-element="phoneImg"]', (event) => {
      this._render(event.delegateTarget.src);
    });
  }

  showPhone(phone) {
    this._phone = phone;
    this._render();

    super.show();
  }

  _render(mainImgSrc) {
    const { _phone: phone } = this;
    if (!mainImgSrc) { mainImgSrc = phone.images[0]; }

    this._element.innerHTML = `
    <img class="phone" src="${mainImgSrc}">

    <button data-element="button-back">Back</button>
    <button data-element="button-cart-add" data-phoneId="${phone.id}">Add to basket</button>


    <h1>${phone.name}</h1>

    <p>${phone.description}</p>

    <ul class="phone-thumbs">
        ${phone.images.map(imageSrc => `
          <li>
            <img src="${imageSrc}" data-element="phoneImg">
          </li>
         `).join('')}
    </ul>
    `;
  }
}
