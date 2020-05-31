export default class Card {

  constructor({ name, link }, popup) {
    this.name = name;
    this.link = link;
    this.popup = popup;
    this._like = this._like.bind(this);
    this._remove = this._remove.bind(this);
    this._showFullImg = this._showFullImg.bind(this);
    this.cardElement = this._create({ name, link });
  }

  _like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  _remove(event) {
    event.stopPropagation()
    this.cardElement
      .querySelector('.place-card__image')
      .removeEventListener('click', this._showFullImg);

    this.cardElement
      .querySelector('.place-card__like-icon')
      .removeEventListener('click', this._like);

    event.target
      .removeEventListener('click', this._remove);

    this.cardElement.remove();
  }

  _showFullImg() {
    this.popup.popup.querySelector('.popup__image-view').setAttribute('src', this.link);
    this.popup.open();
  }

  setEventListeners(elem) {
    elem
      .querySelector('.place-card__like-icon')
      .addEventListener('click', this._like);

    elem
      .querySelector('.place-card__delete-icon')
      .addEventListener('click', this._remove);

    elem
      .querySelector('.place-card__image')
      .addEventListener('click', this._showFullImg);
  }

  _create({ name, link }) {
    const cardElement = document.createElement('div');
    const cardTemplate = `
        <div class="place-card__image">
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name"></h3>
          <button class="place-card__like-icon"></button>
        </div>
      `;
    cardElement.classList.add('place-card');
    cardElement.insertAdjacentHTML('afterbegin', cardTemplate);

    const imageElement = cardElement.querySelector('.place-card__image');
    const nameElement = cardElement.querySelector('.place-card__name');
    imageElement.setAttribute('style', `background-image: url(${link})`);
    nameElement.textContent = name;

    this.setEventListeners(cardElement);

    return cardElement;
  }

}