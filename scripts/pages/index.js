import {popupEditProfile, profileEditBtn, popupEditCloseBtn, formEditProfile, config, cardsContainer, formAddNewCard, popupAddNewCardCloseBtn,
  popupAddNewCardOpenBtn, popupViewImage, popupAddNewCard, initialCards} from '../utils/constants.js';
import Section from "../components/Section.js";
import {FormValidator} from '../components/FormValidator.js';
import {Card} from "../components/Card.js";
import {
  openPopup,
  closePopup,
  fillInEditProfileFormInputs,
  closeByOverlayClick,
} from '../utils/utils.js';
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";



// Обработчик кнопки Close попапа редактирования профиля
popupEditCloseBtn.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

//листенер кнопки закрытия попапа добавления новой карточки
popupAddNewCardCloseBtn.addEventListener('click', () => {
  closePopup(popupAddNewCard);
});
// закрытие попапов кликом на оверлей
popupEditProfile.addEventListener('mousedown', closeByOverlayClick);
popupAddNewCard.addEventListener('mousedown', closeByOverlayClick);
popupViewImage.addEventListener('mousedown', closeByOverlayClick);

// валидация формы редактирования профиля
const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

// валидация формы добавления новой карточки
const formAddNewCardValidator = new FormValidator(config, formAddNewCard);
formAddNewCardValidator.enableValidation();

/*----------------------------------------------ПР №8-----------------------------------------------------------------*/
// функционал создания новой карточки
const createCard = (data) => {
  const card = new Card({data}, '.element-template', openPopup, closePopup);
  const cardElement = card.generateCard();
  return cardElement;
};
// создание попапа с формой добавления новой карточки
const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  handleFormSubmit: (formData) => {
    cardsList.addItem(createCard(formData));
    addCardPopup.close();
  }
});
// добавляем слушатели этому попапу:
addCardPopup.setEventListeners();

popupAddNewCardOpenBtn.addEventListener('click', () => {
  addCardPopup.open();
})

// отрисовка карточек на странице из массива
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  },
}, cardsContainer);
cardsList.renderItems();
/*---------------------------------------------------------------------------------------------------------------------*/
const userInfo = new UserInfo({
  username: '.profile__title',
  job: '.profile__description'
});


// создание попапа с формой редактирования профиля
const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (dataForm) => {
    userInfo.setUserInfo(dataForm);
    editProfilePopup.close();
  }
});
editProfilePopup.setEventListeners();
// Обработчик кнопки Edit попапа редактирования профиля
profileEditBtn.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  fillInEditProfileFormInputs({
    username: info.username,
    job: info.job
  });
  editProfilePopup.open();
});
