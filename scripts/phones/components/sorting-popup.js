import Component from '../../shared/component.js';

export default class SortingPopup extends Component {
  constructor({ element }) {
    super({ element });
    this._render();

    this.on('change', '[data-element="sorting-popup"]', (event) => {
      this._trigger('sortingPopupValueChange', event.delegateTarget.value);
    });
  }

  _render() {
    this._element.innerHTML = `
      <p>
        Sort by:
        <select data-element="sorting-popup">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
  `;
  }
}