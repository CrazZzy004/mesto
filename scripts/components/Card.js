import {viewImagePopupImg, viewImagePopupName, popupViewImage, popupViewImageCloseBtn} from '../utils/constants.js';

export class Card {
  constructor({ data }, cardSelector, openPopup, closePopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
    this._closePopup = closePopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  // метод слушателя кнопки "лайк"
  _handleLikeCard() {
    const likeBtn = this._element.querySelector('.element__like-btn');
    likeBtn.classList.toggle('element__like-btn_active');
  }

  // метод слушателя кнопки "удалить"
  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  // метод слушателя открытия попапа просмотра изображения
  _handleOpenPopup() {
    viewImagePopupImg.src = this._link;
    viewImagePopupImg.alt = this._name;
    viewImagePopupName.textContent = this._name;
    this._openPopup(popupViewImage);
  }

  // метод слушателя закрытия попапа просмотра изображения
  _handleClosePopup() {
    viewImagePopupImg.src = '';
    viewImagePopupImg.alt = '';
    viewImagePopupName.textContent = '';
    this._closePopup(popupViewImage)
  }

  _setEventListeners() {
    // открытие попапа просмотра изображения кликом по изображению
    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._handleOpenPopup();
    })
    // закрытие попапа просмотра изображения кликом на кнопку закрытия
    popupViewImageCloseBtn.addEventListener('click', () => {
      this._handleClosePopup();
    })
    // слушатель кнопки удаления карточки
    this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
      this._handleDeleteCard();
    })
    // слушатель кнопки лайк
    this._element.querySelector('.element__like-btn').addEventListener('click', () => {
      this._handleLikeCard();
    })
  }

  // метод создания готовой карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}
