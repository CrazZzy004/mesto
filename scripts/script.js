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
const cardTemplate = document.querySelector('.element-template').content;
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

// функция создания карточки
const createCard = (nameValue, imgValue) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  // находим изображение
  const cardImg = cardElement.querySelector('.element__img');
  // находим название изображения
  const cardName = cardElement.querySelector('.element__title');
  // находим кнопку лайк карточки
  const cardLikeBtn = cardElement.querySelector('.element__like-btn');
  // находим кнопку удаления карточки
  const cardDeleteBtn = cardElement.querySelector('.element__delete-btn');

  cardName.textContent = nameValue;
  cardImg.src = imgValue;
  cardImg.alt = nameValue;

  // обработчик кнопки лайк
  cardLikeBtn.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-btn_active');
  });
  //обработчик кнопки Delete
  cardDeleteBtn.addEventListener('click', (event) => {
    event.target.closest('.element').remove();
  });
  // листенер открытия попапа просмотра изображения
  cardImg.addEventListener('click', openViewImagePopup);

  // возвращаем готовую карточку
  return cardElement;
};
// функция добавления карточки в DOM
const addCard = (name, link) => {
  cardsContainer.prepend(createCard(name, link));
};
//функция открытия попапа просмотра изображений
const openViewImagePopup = (event) => {
  openPopup(popupViewImage);

  eventTargetImg = event.target
  viewImagePopupImg.src = eventTargetImg.src;
  viewImagePopupName.textContent = eventTargetImg.alt;
  viewImagePopupImg.alt = eventTargetImg.alt;
};
// функция загрузки карточек из массива
const renderInitialCards = (cards) => {
  cards.map((el) => {
  return addCard(el.name, el.link);
  });
};


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
// листенер submit формы создания карточки
formAddNewCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard(cardNameInput.value, cardLinkInput.value);
  formAddNewCard.reset();
  closePopup(popupAddNewCard);
  // находим кнопку submit и деактивируем ее после создания карточки
  const buttonElement = formAddNewCard.querySelector('.form__submit');
  buttonElement.setAttribute('disabled', 'disabled');
});
// листенер закрытия попапа просмотра изображения
popupViewImageCloseBtn.onclick = () => closePopup(popupViewImage);

// закрытие попапов кликом на оверлей
popupEditProfile.addEventListener('mousedown', closeByOverlayClick);
popupAddNewCard.addEventListener('mousedown', closeByOverlayClick);
popupViewImage.addEventListener('mousedown', closeByOverlayClick);

// автоматическая загрузка карточек на страницу
renderInitialCards(initialCards);
