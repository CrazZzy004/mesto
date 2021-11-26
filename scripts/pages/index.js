import {popupEditProfile, profileEditBtn, popupEditCloseBtn, formEditProfile, cardLinkInput, cardNameInput, config, cardsContainer, formAddNewCard, popupAddNewCardCloseBtn,
  popupAddNewCardOpenBtn, popupViewImage, popupAddNewCard, initialCards} from '../utils/constants.js';
import Section from "../components/Section.js";
import {FormValidator} from '../components/FormValidator.js';
import {Card} from "../components/Card.js";
import {
  openPopup,
  closePopup,
  fillInEditProfileFormInputs,
  submitEditFormHandler,
  closeByOverlayClick,
  addCard
} from '../utils/utils.js';



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


// валидация формы редактирования профиля
const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

// валидация формы добавления новой карточки
const formAddNewCardValidator = new FormValidator(config, formAddNewCard);
formAddNewCardValidator.enableValidation();


// отрисовка карточек на странице из массива
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, '.element-template', openPopup, closePopup);
    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
  },
}, cardsContainer);

// загрузка карточек из массива на страницу
cardsList.renderItems();
