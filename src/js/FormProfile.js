export default class FormProfile {

  constructor(form, formValidatorInstance, popupInstance, userInfoInstance) {
    this.form = form;
    this.formValidatorInstance = formValidatorInstance;
    this.popupInstance = popupInstance;
    this.userInfoInstance = userInfoInstance;
    this._submitFunc = this._submitFunc.bind(this);
    this.formValidatorInstance.setEventListeners();
    this.form.addEventListener('submit', this._submitFunc);
  }

  openForm() {
    this.userInfoInstance.setInputs();
    this.formValidatorInstance.setSubmitButtonState();
    this.formValidatorInstance.hideErrors();
    this.popupInstance.open();
  }

  _submitFunc() {
    if (this.formValidatorInstance.validateForm()) {
      event.preventDefault();
      this.userInfoInstance.updateUserInfo()
        .then(() => {
          this.popupInstance.close()
        })
        .catch((err) => alert(`Извините, ошибка ${err} :(`))
    }
  }
}

