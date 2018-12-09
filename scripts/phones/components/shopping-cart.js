import Component from '../../shared/component.js';

export default class ShoppingCart extends Component {
  constructor({ element }) {
    super({ element });

    this._element = element;
    this._items = {};

    this._render();

    this.on('click', '[data-element="button-remove"]', event => {
      this.removeItem(event.delegateTarget.dataset.item);
    })
  }

  addItem(item) {
    if (!this._items[item]) {
      this._items[item] = 0;
    }
    this._items[item]++;

    this._render();
  }

  removeItem(item) {
    let { _items } = this;
    if (_items[item]) {
      _items[item]--;
    }

    if (_items[item] === 0) {
      delete _items[item];
    }

    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
        ${Object.entries(this._items).map(([name, count]) => `
          <li>${name} (${count}) <button data-item="${name}" data-element="button-remove">x</button></li>
        `).join('')}
      </ul>
    `;
  }
}
