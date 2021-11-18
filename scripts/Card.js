import {viewImagePopupImg, viewImagePopupName, popupViewImage, popupViewImageCloseBtn} from './constants.js';
import {openPopup, closePopup} from "./index.js";

export class Card {
  constructor(name, link, cardSelector) {
    this._container = document.querySelector(cardSelector);
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
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
    openPopup(popupViewImage);
  }

  // метод слушателя закрытия попапа просмотра изображения
  _handleClosePopup() {
    viewImagePopupImg.src = '';
    viewImagePopupImg.alt = '';
    viewImagePopupName.textContent = '';
    closePopup(popupViewImage)
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
