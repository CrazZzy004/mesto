// находим попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit');
// находим кнопку для открытия попапа редактирования профиля
const profileEditBtn = document.querySelector('.profile__edit-button');
// находим кнопку закрытия попапа редактирования профиля
const popupEditCloseBtn = popupEditProfile.querySelector('.popup__close');
// находим форму попапа редактирования профиля
const formEditProfile = popupEditProfile.querySelector('.popup__form');
// находим инпуты формы попапа редактирования профиля
const nameInput = formEditProfile.querySelector('#name');
const jobInput = formEditProfile.querySelector('#job');
// выбираем куда будут импортироваться данные из формы
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
// Находим попап добавления карточки
const popupAddNewCard = document.querySelector('.popup_type_new-card');
// находим кнопку для открытия попапа добавления новой карточки
const popupAddNewCardOpenBtn = document.querySelector('.profile__add-button');
// находим кнопку для закрытия попапа добавления новой карточки
const popupAddNewCardCloseBtn = popupAddNewCard.querySelector('.popup__close');
// находим форму попапа добавления новой карточки
const formAddNewCard = popupAddNewCard.querySelector('.popup__form');

// находим контейнер для карточек
const cardsContainer = document.querySelector('.elements');
// находим шаблон для создания карточки
//const cardTemplate = document.querySelector('.element-template').content;
// находим инпут для названия карточки
const cardNameInput = formAddNewCard.querySelector('#title');
// находим инпут ссылки на изображение
const cardLinkInput = popupAddNewCard.querySelector('#link');
// находим попап просмотра изображения
const popupViewImage = document.querySelector('.popup_type_image');
// находим кнопку закрытия попапа просмотра изображений
const popupViewImageCloseBtn = popupViewImage.querySelector('.popup__close');
// находим изображение попапа просмотра
const viewImagePopupImg = popupViewImage.querySelector('.popup__img');
// находим название изображения попапа просмотра
const viewImagePopupName = popupViewImage.querySelector('.popup__caption');

// функция открытия попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscUp);
};
// функция закрытия попапа
function closePopup (popup) {
  document.removeEventListener('keyup', handleEscUp);
  popup.classList.remove('popup_opened');
};
// обработчик клика по кнопке Escape
const handleEscUp = (event) => {
  event.preventDefault();
  if (event.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  };
};
// функция закрытия попапа кликом на оверлей
function closeByOverlayClick (event) {
  const activePopup = document.querySelector('.popup_opened');
  if (event.target.classList.contains('popup')) {
    closePopup(activePopup);
  };
};
// Заносим данные в форму попапа редактирования профиля
function fillInEditProfileFormInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};
// Инструкция для обработчика формы попапа редактирования профиля
function submitEditFormHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEditProfile);
};
// функция загрузки карточек из массива
const renderInitialCards = (array) => {
  array.forEach((item) => {
    const card = new Card(item.name, item.link, '.element-template');
    const cardElement = card.generateCard();

    cardsContainer.prepend(cardElement);
  })
}

// Обработчик кнопки Edit попапа редактирования профиля
profileEditBtn.addEventListener('click', () => {
  openPopup(popupEditProfile);
  fillInEditProfileFormInputs();
});
// Обработчик кнопки Close попапа редактирования профиля
popupEditCloseBtn.addEventListener('click', () => {
  closePopup(popupEditProfile);
});
// Обработчик кнопки Submit попапа редактирования профиля
formEditProfile.addEventListener('submit', submitEditFormHandler);
// листенер кнопки открытия попапа добавления новой карточки
popupAddNewCardOpenBtn.addEventListener('click', () => {
  openPopup(popupAddNewCard);
});
// листенер кнопки закрытия попапа добавления новой карточки
popupAddNewCardCloseBtn.addEventListener('click', () => {
  closePopup(popupAddNewCard);
});
// закрытие попапов кликом на оверлей
popupEditProfile.addEventListener('mousedown', closeByOverlayClick);
popupAddNewCard.addEventListener('mousedown', closeByOverlayClick);
popupViewImage.addEventListener('mousedown', closeByOverlayClick);

class Card {
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
  }

  // метод слушателя открытия попапа просмотра изображения
  _handleOpenPopup() {
    viewImagePopupImg.src = this._link;
    viewImagePopupName.textContent = this._name;
    popupViewImage.classList.add('popup_opened');
  }

  // метод слушателя закрытия попапа просмотра изображения
  _handleClosePopup() {
    viewImagePopupImg.src = '';
    viewImagePopupName.textContent = '';
    popupViewImage.classList.remove('popup_opened');
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
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}

// функция добавления карточки на страницу из формы
const addCard = (name, link) => {
  const card = new Card(name, link, '.element-template').generateCard();
  cardsContainer.prepend(card);
};

// листенер submit формы создания карточки
formAddNewCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard(cardNameInput.value, cardLinkInput.value);
  cardNameInput.value = '';
  cardLinkInput.value = '';
  closePopup(popupAddNewCard);
  // находим кнопку submit и деактивируем ее после создания карточки
  const buttonElement = formAddNewCard.querySelector('.form__submit');
  buttonElement.setAttribute('disabled', 'disabled');
});

// автоматическая загрузка карточек на страницу
renderInitialCards(initialCards);
