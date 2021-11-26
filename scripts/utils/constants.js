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


export {popupEditProfile, profileEditBtn, popupEditCloseBtn, formEditProfile, nameInput, jobInput, profileName,
  profileJob, cardLinkInput, cardNameInput, config, cardsContainer, formAddNewCard, popupAddNewCardCloseBtn,
  popupAddNewCardOpenBtn, popupViewImageCloseBtn, popupViewImage, viewImagePopupImg, viewImagePopupName, popupAddNewCard, initialCards};
