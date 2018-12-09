import Component from '../../shared/component.js';

export default class SearchInput extends Component {
  constructor({ element }) {
    super({ element });
    this._render();
    this.DEBOUNCE_PARAM = 800;
    this._customTrigger = SearchInputSupport.debounce(this._trigger, this.DEBOUNCE_PARAM = 1000);

    this.on('input', '[data-element="search-input"]', (event) => {
      this._customTrigger('searchInputValueChange', event.delegateTarget.value);
    });
  }

  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input data-element="search-input">
      </p>
  `;
  }
}

class SearchInputSupport {}

SearchInputSupport.debounce = function(f, ms) {
  let timer = null;

  return function (...args) {
    const onComplete = () => {
      f.apply(this, args);
      timer = null;
    };

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(onComplete, ms);
  };
};
