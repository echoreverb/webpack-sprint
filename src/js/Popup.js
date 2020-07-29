export default class Popup {
  constructor(popup) {
    this.popup = popup;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._closeHandler = this._closeHandler.bind(this);
    document.addEventListener('keydown', this._closeHandler);
    this.popup
      .querySelector('.popup__close')
      .addEventListener('click', this._closeHandler);
  }

  open() {
    this.popup.classList.add('popup_is-opened');
  }

  _closeHandler(event) {
    if ((event.type === 'click') || (event.code === 'Escape')) {
      this.close();
    }
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
  }
}
