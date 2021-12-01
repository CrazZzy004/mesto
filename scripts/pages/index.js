import {profileEditBtn, formEditProfile, config, cardsContainer, formAddNewCard,
  popupAddNewCardOpenBtn, initialCards} from '../utils/constants.js';
import Section from "../components/Section.js";
import {FormValidator} from '../components/FormValidator.js';
import {Card} from "../components/Card.js";
import {
  closePopup,
  fillInEditProfileFormInputs,
} from '../utils/utils.js';
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

// валидация формы редактирования профиля
const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

// валидация формы добавления новой карточки
const formAddNewCardValidator = new FormValidator(config, formAddNewCard);
formAddNewCardValidator.enableValidation();

/*----------------------------------------------ПР №8-----------------------------------------------------------------*/
// функционал создания новой карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: (data) => {
      const viewImagePopup = new PopupWithImage('.popup_type_image');
      viewImagePopup.setEventListeners();
      viewImagePopup.open(data.link, data.name);
    }}, '.element-template', closePopup);
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
