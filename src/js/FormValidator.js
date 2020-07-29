export default class FormValidator {
  constructor(form, ERROR_MESSAGES) {
    this.form = form;
    this.ERROR_MESSAGES = ERROR_MESSAGES;
    this.inputs = Array.from(this.form.elements)
      .filter((elem) => (elem.type !== 'submit'));
    this._handleValidate = this._handleValidate.bind(this);
  }

  _checkInputValidity(elem) {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    const errorElement = elem.nextElementSibling;

    if (elem.validity.valueMissing) {
      errorElement.textContent = this.ERROR_MESSAGES.valueMissing;
      return false;
    } if (elem.name === 'link') {
      if (elem.validity.patternMismatch) {
        errorElement.textContent = this.ERROR_MESSAGES.notALink;
        return false;
      }
      return true;
    } if (elem.validity.tooShort || elem.validity.tooLong) {
      errorElement.textContent = this.ERROR_MESSAGES.improperLength;
      return false;
    }
    return true;
  }

  validateForm() {
    let isValidForm = true;
    this.inputs.forEach((elem) => {
      if (!this._checkInputValidity(elem)) {
        isValidForm = false;
      }
    });
    return isValidForm;
  }

  setSubmitButtonState() {
    const currentButton = this.form.querySelector('.popup__button');
    if (this.validateForm()) {
      currentButton.classList.add('button_is-active');
    } else {
      currentButton.classList.remove('button_is-active');
    }
  }

  setEventListeners() {
    this.form.addEventListener('input', this._handleValidate);
  }

  _handleValidate(event) {
    if (!this._checkInputValidity(event.target)) {
      this._showErrorElem(event.target);
    } else {
      this._hideErrorElem(event.target);
    }

    this.setSubmitButtonState();
  }

  // eslint-disable-next-line class-methods-use-this
  _showErrorElem(elem) {
    elem.nextElementSibling
      .classList.add('popup__error-message_visible');
  }

  // eslint-disable-next-line class-methods-use-this
  _hideErrorElem(elem) {
    elem.nextElementSibling
      .classList.remove('popup__error-message_visible');
  }

  hideErrors() {
    this.inputs.forEach((elem) => {
      this._hideErrorElem(elem);
    });
  }
}
