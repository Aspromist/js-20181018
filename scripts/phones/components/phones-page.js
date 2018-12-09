'use strict';

import PhoneCatalog from './phone-catalog.js';
import PhoneViewer from './phone-viewer.js';
import ShoppingCart from './shopping-cart.js';
import SearchInput from './search-input.js';
import SortingPopup from "./sorting-popup.js";

import PhoneService from '../services/phone-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initCart();
    this._initSearchInput();
    this._initSortingPopup();

    PhoneService.getPhones((phones) => {
      this._catalog.showPhones(phones);
    });
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
    });

    this._catalog.on('phoneSelected', (event) => {
      PhoneService.getPhone(event.detail.phoneId, (phone) => {
        this._catalog.hide();
        this._viewer.showPhone(phone);
      });
    });

    this._catalog.on('add', event => {
      let phoneId = event.detail;
      this._cart.addItem(phoneId)
    })
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.on('back', () => {
      this._viewer.hide();
      this._catalog.show();
    });

    this._viewer.on('add', event => {
      let phoneId = event.detail;
      this._cart.addItem(phoneId)
    });
  }

  _initCart() {
    this._cart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]')
    })
  }

  _initSearchInput() {
    this._searchInput = new SearchInput({
      element: this._element.querySelector('[data-component="search-input"]')
    });

    this._searchInput.on('searchInputValueChange', (event) => {
      this._catalog.renderByFilter(event.detail);
    });
  }

  _initSortingPopup() {
    this._sortingPopup = new SortingPopup({
      element: this._element.querySelector('[data-component="sorting-popup"]')
    });

    this._sortingPopup.on('sortingPopupValueChange', (event) => {
      this._catalog.renderBySorting(event.detail);
    });
  }

  _render() {
    this._element.innerHTML = `
       <div class="row">
        <!--Sidebar-->
        <div class="col-md-2">
            <section>
                <div data-component="search-input"></div>
                <div data-component="sorting-popup"></div>              
            </section>

            <section>
                <div data-component="shopping-cart"></div>
            </section>
        </div>

        <!--Main content-->
        <div class="col-md-10">
           <div data-component="phone-catalog" class="js-hidden"></div>
           <div data-component="phone-viewer" class="js-hidden"></div>
        </div>
    </div>
    `;
  }
}
