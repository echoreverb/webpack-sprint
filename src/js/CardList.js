export default class CardList {

  constructor(container, funcNewCard, popupImg, apiInstance) {
    this.container = container;
    this.funcNewCard = funcNewCard;
    this.popupImg = popupImg;
    this.apiInstance = apiInstance;
  }

  addCard(data) {
    const cardElement = this.funcNewCard(data, this.popupImg)
    this.container.append(cardElement);
  }

  render() {
    this.apiInstance.getInitialCards()
      .then((array) => {
        array.forEach((data) => this.addCard(data, this.popupImg));
      })
      .catch((err) => {
        this.apiInstance.alertError(err);
      });
  }
}