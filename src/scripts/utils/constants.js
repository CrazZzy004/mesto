// находим попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit');
// находим кнопку для открытия попапа редактирования профиля
const profileEditBtn = document.querySelector('.profile__edit-button');
// находим форму попапа редактирования профиля
const formEditProfile = popupEditProfile.querySelector('.popup__form');
// находим инпуты формы попапа редактирования профиля
const nameInput = formEditProfile.querySelector('#name');
const jobInput = formEditProfile.querySelector('#job');
// Находим попап добавления карточки
const popupAddNewCard = document.querySelector('.popup_type_new-card');
// находим кнопку для открытия попапа добавления новой карточки
const popupAddNewCardOpenBtn = document.querySelector('.profile__add-button');
// находим форму попапа добавления новой карточки
const formAddNewCard = popupAddNewCard.querySelector('.popup__form');

// объект с селекторами
const config = {
  popupForm : '.popup__form',
  inputErrorClass : 'form__input_type_error',
  inputErrorActive : 'form__input-error_active',
  formInput : '.form__input',
  formSubmit : '.form__submit',
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


export {popupEditProfile, profileEditBtn, formEditProfile, nameInput, jobInput, formAddNewCard,
  popupAddNewCardOpenBtn, popupAddNewCard, initialCards, config};
