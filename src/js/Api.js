/* eslint-disable no-undef */
export default class Api {
  constructor(baseUrl, key, options) {
    this.baseUrl = baseUrl;
    this.options = options;
    this.options.headers.authorization = key;
  }

  getUserInfo() {
    return this._fetchMethod('/users/me', this.options);
  }

  getInitialCards() {
    return this._fetchMethod('/cards', this.options);
  }

  patchUserInfo(name, about) {
    const patchOptions = this.options;
    patchOptions.method = 'PATCH';
    patchOptions.body = JSON.stringify({ name, about });
    return this._fetchMethod('/users/me', patchOptions);
  }

  _fetchMethod(urlExcBase, options) {
    return fetch(`${this.baseUrl}${urlExcBase}`, options)
      .then((res) => res.json())
      .catch((err) => Promise.reject(err));
  }

  // eslint-disable-next-line class-methods-use-this
  alertError(err) {
    // eslint-disable-next-line no-alert
    alert(`Извините, ошибка ${err} :(`);
  }

  // patchUserpic(url) {
  //   const patchOptions = this.options;
  //   patchOptions.method = 'PATCH';
  //   patchOptions.body = JSON.stringify({
  //     avatar: url,
  //   });
  //   return this._fetchMethod('/users/me/avatar', patchOptions)
  // }
}
