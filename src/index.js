import "./index.css";
import Api from './js/Api.js';
import ButtonOpenForm from './js/ButtonOpenForm.js';
import Card from './js/Card.js';
import CardList from './js/CardList.js';
import FormCard from './js/FormCard.js';
import FormProfile from './js/FormProfile.js';
import FormValidator from './js/FormValidator.js';
import Popup from './js/Popup.js';
import UserInfo from './js/UserInfo.js';

const ERROR_MESSAGES = {
  valueMissing: 'Это обязательное поле',
  notALink: 'Здесь должна быть ссылка',
  improperLength: 'Должно быть от 2 до 30 символов'
}

const api = new Api(
  'https://praktikum.tk/cohort10',
  'bb598799-72f3-4198-ae33-7ed1b0aa4ce6',
  {
    headers: {
      'Content-Type': 'application/json'
    }
  });

const userInfo = new UserInfo(
  document.querySelector('.user-info__name'),
  document.querySelector('.user-info__job'),
  document.querySelector('.user-info__photo'),
  document.forms.info.elements.username,
  document.forms.info.elements.userjob,
  api
);

const popupCard = new Popup(document.querySelector('.popup_type_add-card'));
const popupProfile = new Popup(document.querySelector('.popup_type_add-user-info'));
const popupImage = new Popup(document.querySelector('.popup_type_image-view'));

const addUserCard = ({ name, link }, popupImage) => {
  const card = new Card({ name, link }, popupImage);
  return card.cardElement;
}

const cardList = new CardList(document.querySelector('.places-list'), addUserCard, popupImage, api);

const formCardValidator = new FormValidator(document.forms.new, ERROR_MESSAGES);
const formProfileValidator = new FormValidator(document.forms.info, ERROR_MESSAGES);

const formCard = new FormCard(document.forms.new, formCardValidator, popupCard, cardList);
const formProfile = new FormProfile(document.forms.info, formProfileValidator, popupProfile, userInfo);

const buttonAddCard = new ButtonOpenForm(document.querySelector('.user-info__add-button'), formCard);
const buttonEditProfile = new ButtonOpenForm(document.querySelector('.user-info__edit-button'), formProfile);

cardList.render();
userInfo.setUserInfo();