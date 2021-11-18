import {popupEditProfile, profileEditBtn, popupEditCloseBtn, formEditProfile, nameInput, jobInput, profileName,
  profileJob, cardLinkInput, cardNameInput, config, cardsContainer, formAddNewCard, popupAddNewCardCloseBtn,
  popupAddNewCardOpenBtn, popupViewImage, popupAddNewCard, initialCards} from './constants.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';


// функция открытия попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscUp);
}
// функция закрытия попапа
function closePopup (popup) {
  document.removeEventListener('keyup', handleEscUp);
  popup.classList.remove('popup_opened');
}
// обработчик клика по кнопке Escape
const handleEscUp = (event) => {
  event.preventDefault();
  if (event.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
};
// функция закрытия попапа кликом на оверлей
function closeByOverlayClick (event) {
  const activePopup = document.querySelector('.popup_opened');
  if (event.target.classList.contains('popup')) {
    closePopup(activePopup);
  }
}
// Заносим данные в форму попапа редактирования профиля
function fillInEditProfileFormInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
// Инструкция для обработчика формы попапа редактирования профиля
function submitEditFormHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

// функция добавления карточки на страницу из формы
const addCard = (name, link) => {
  const card = new Card(name, link, '.element-template').generateCard();
  cardsContainer.prepend(card);
};

// функция загрузки карточек из массива
const renderInitialCards = (array) => {
  array.forEach((item) => {
    addCard(item.name, item.link);
  })
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
// закрытие попапов кликом на оверлей
popupEditProfile.addEventListener('mousedown', closeByOverlayClick);
popupAddNewCard.addEventListener('mousedown', closeByOverlayClick);
popupViewImage.addEventListener('mousedown', closeByOverlayClick);

// листенер submit формы создания карточки
formAddNewCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard(cardNameInput.value, cardLinkInput.value);
  cardNameInput.value = '';
  cardLinkInput.value = '';
  closePopup(popupAddNewCard);
  formAddNewCardValidator.toggleButtonState();
});

// автоматическая загрузка карточек на страницу
renderInitialCards(initialCards);

// валидация формы редактирования профиля
const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

// валидация формы добавления новой карточки
const formAddNewCardValidator = new FormValidator(config, formAddNewCard);
formAddNewCardValidator.enableValidation();


export {openPopup, closePopup};
