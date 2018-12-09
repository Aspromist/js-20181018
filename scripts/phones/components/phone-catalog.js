import Component from '../../shared/component.js';

export default class PhoneCatalog extends Component {
  constructor({ element }) {
    super({ element });

    this.on('click', '[data-element="phone-link"]', event => this._onPhoneClick(event));
    this.on('click', '[data-element="button-add"]', event => {
      let phoneItem = event.delegateTarget.closest('li');

      this._trigger('add', phoneItem.dataset.phoneId);
    });
  }

  _onPhoneClick(event) {
    let phoneLink = event.delegateTarget;
    this._trigger('phoneSelected', { phoneId: phoneLink.dataset.phoneId });
  }

  showPhones(phones) {
    this._phones = phones;
    let sortingPopupCheckedOption = document.querySelector('[data-element="sorting-popup"] option:checked');
    if (sortingPopupCheckedOption) {
      this.renderBySorting(sortingPopupCheckedOption.value);
    } else {
      this._render(this._phones);
    }
    this.show();
  }

  renderByFilter(idLike) {
    this._render(this.searchPhones(idLike));
  }

  searchPhones(idLike) {
    let filteredPhones = null;

    if (idLike.length > 0) {
        idLike = idLike.trim().toLowerCase();
        filteredPhones = this._phones.filter(phone => {
          return phone.name.toLowerCase().indexOf(idLike) > -1;
      });
    }

    return filteredPhones;
  }

  renderBySorting(sortBy) {
    this.sortPhones(sortBy);
    this._render();
  }

  sortPhones(sortPropName) {
    if (sortPropName === 'name') {
      this._phones.sort((a, b) => {
        return a[sortPropName].localeCompare(b[sortPropName]);
      });
    } else if (sortPropName === 'age') {
      this._phones.sort((a, b) => {
        if (a[sortPropName] > b[sortPropName]) { return 1; }
        if (a[sortPropName] < b[sortPropName]) { return -1; }
        return 0;
      });
    }
  }

  _render(phones) {
    if (!phones) { phones = this._phones; }
    this._element.innerHTML = `
       <ul class="phones">
          ${ phones.map(phone => `
            <li class="thumbnail" data-phone-id="${phone.id}">
              <a data-element="phone-link" data-phone-id="${phone.id}" href="#!/phones/${phone.id}" class="thumb">
                  <img alt="${phone.name}" src="${phone.imageUrl}">
              </a>

              <div class="phones__btn-buy-wrapper">
                  <a class="btn btn-success" data-element="button-add">
                      Add
                  </a>
              </div>

              <a data-element="phone-link" data-phone-id="${phone.id}" href="#!/phones/${phone.id}">${phone.name}</a>
              <p>${phone.snippet}</p>
          </li>
          `).join('')}
        </ul>
    `;
  }
}
