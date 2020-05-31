export default class Api {
  constructor(baseUrl, key, options) {
    this.baseUrl = baseUrl;
    this.options = options;
    this.options.headers.authorization = key;
  }

  getUserInfo() {
    return this._fetchMethod('/users/me', this.options)
  }

  getInitialCards() {
    return this._fetchMethod('/cards', this.options)
  }

  patchUserInfo(name, about) {
    const patchOptions = this.options;
    patchOptions.method = 'PATCH';
    patchOptions.body = JSON.stringify({
      name: name,
      about: about
    });
    return this._fetchMethod('/users/me', patchOptions)
  }

  _fetchMethod(urlExcBase, options) {
    return fetch(`${this.baseUrl}${urlExcBase}`, options)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        // Можно лучше
        // return Promise.reject(new Error(err.message));
        return Promise.reject(err);
      });
  }

  alertError(err) {
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