export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._handleCardClick(this._name, this._link);
  }

  _setEventListeners() {
    // открытие попапа просмотра изображения кликом по изображению
    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._handleOpenPopup();
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
