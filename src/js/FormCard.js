export default class FormCard {
  constructor(form, formValidatorInstance, popupInstance, cardListInstance) {
    this.form = form;
    this.formValidatorInstance = formValidatorInstance;
    this.popupInstance = popupInstance;
    this.cardListInstance = cardListInstance;
    this._submitFunc = this._submitFunc.bind(this);
    this.form.addEventListener('submit', this._submitFunc);
    this.formValidatorInstance.setEventListeners();
  }

  openForm() {
    this._resetForm();
    this.popupInstance.open();
  }

  _resetForm() {
    this
      .form
      .querySelector('.popup__button')
      .classList.remove('button__is-active');

    this
      .form
      .querySelectorAll('.popup__error-message')
      .forEach((elem) => {
        // eslint-disable-next-line no-param-reassign
        elem.textContent = '';
      });

    this.form.reset();
  }

  _submitFunc() {
    if (this.formValidatorInstance.validateForm()) {
      // eslint-disable-next-line no-restricted-globals
      event.preventDefault();
      const name = this.form.elements.name.value;
      const link = this.form.elements.link.value;
      this.cardListInstance.addCard({ name, link });
      this.popupInstance.close();
    }
  }
}
