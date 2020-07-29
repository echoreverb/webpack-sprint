export default class UserInfo {
  constructor(nameElement, aboutElement, userpicElement, inputName, inputAbout, apiInstance) {
    this.nameElement = nameElement;
    this.aboutElement = aboutElement;
    this.userpicElement = userpicElement;
    this.inputName = inputName;
    this.inputAbout = inputAbout;
    this.name = nameElement.textContent;
    this.about = aboutElement.textContent;
    this.apiInstance = apiInstance;
  }

  setUserInfo() {
    this.apiInstance.getUserInfo()
      .then((res) => {
        this._setUserInfoWithResponse(res);
        this.renderUserInfo();
        this.userpicElement.setAttribute('style', `background-image: url(${res.avatar})`);
      })
      .catch((err) => {
        this.apiInstance.alertError(err);
      });
  }

  updateUserInfo() {
    return this.apiInstance.patchUserInfo(this.inputName.value, this.inputAbout.value)
      .then((res) => {
        this._setUserInfoWithResponse(res);
        this.renderUserInfo();
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        return Promise.reject(err);
      });
  }

  _setUserInfoWithResponse(res) {
    this.name = res.name;
    this.about = res.about;
  }

  renderUserInfo() {
    this.nameElement.textContent = this.name;
    this.aboutElement.textContent = this.about;
  }

  setInputs() {
    this.inputName.value = this.name;
    this.inputAbout.value = this.about;
  }
}
