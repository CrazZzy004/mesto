// массив с готовыми карточками
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
// находим попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit');
// находим кнопку для открытия попапа редактирования профиля
const profileEditBtn = document.querySelector('.profile__edit-button');
// находим кнопку закрытия попапа редактирования профиля
const popupEditCloseBtn = popupEditProfile.querySelector('.popup__close');
// находим форму попапа редактирования профиля
const formEditProfile = popupEditProfile.querySelector('.popup__form');
// находим инпуты формы попапа редактирования профиля
let nameInput = formEditProfile.querySelector('#name');
let jobInput = formEditProfile.querySelector('#job');
// выбираем куда будут импортироваться данные из формы
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__description');
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
const cardNameInput = formAddNewCard.querySelector('#name');
// находим инпут ссылки на изображение
const cardLinkInput = popupAddNewCard.querySelector('#link');
// находим попап просмотра изображения
const popupViewImage = document.querySelector('.popup_type_image');
// находим кнопку закрытия попапа просмотра изображений
const popupViewImageCloseBtn = popupViewImage.querySelector('.popup__close');


// функция показа/скрытия попапа
const togglePopup = (somePopup) => {
  somePopup.classList.toggle('popup_opened');
};
// Заносим данные в форму попапа редактирования профиля
function addValue() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
// Инструкция для обработчика формы попапа редактирования профиля
function submitEditFormHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  togglePopup(popupEditProfile);
}

// функция добавления карточки
const addCard = (nameValue, imgValue) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  // находим изображение
  const cardImg = cardElement.querySelector('.element__img');
  // находим название изображения
  const cardName = cardElement.querySelector('.element__title');
  // находим кнопку лайк карточки
  const cardLikeBtn = cardElement.querySelector('.element__like-btn');
  // находим кнопку удаления карточки
  const cardDeleteBtn = cardElement.querySelector('.element__delete-btn');
  // находим изображение попапа просмотра
  const viewImagePopupImg = popupViewImage.querySelector('.popup__img');
  // находим название изображения попапа просмотра
  const viewImagePopupName = popupViewImage.querySelector('.popup__caption');

  cardName.textContent = nameValue;
  cardImg.src = imgValue;
  cardImg.alt = nameValue;

  //функция открытия попапа просмотра изображений
  const openViewImagePopup = () => {
    togglePopup(popupViewImage);

    viewImagePopupImg.src = cardImg.src;
    viewImagePopupName.textContent = cardName.textContent;
    viewImagePopupImg.alt = cardName.textContent;

    // листенер закрытия попапа просмотра изображения
    popupViewImageCloseBtn.onclick = () => togglePopup(popupViewImage);
  };

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

  cardsContainer.prepend(cardElement);
};
// функция загрузки карточек из массива
const uploadReadyCards = (array) => {
  array.map((el) => {
  return addCard(el.name, el.link);
  });
};


// Обработчик кнопки Edit попапа редактирования профиля
profileEditBtn.addEventListener('click', () => {
  togglePopup(popupEditProfile);
  addValue();
});
// Обработчик кнопки Close попапа редактирования профиля
popupEditCloseBtn.addEventListener('click', () => {
  togglePopup(popupEditProfile);
});
// Обработчик кнопки Submit попапа редактирования профиля
formEditProfile.addEventListener('submit', submitEditFormHandler);
// листенер кнопки открытия попапа добавления новой карточки
popupAddNewCardOpenBtn.addEventListener('click', () => {
  togglePopup(popupAddNewCard);
});
// листенер кнопки закрытия попапа добавления новой карточки
popupAddNewCardCloseBtn.addEventListener('click', () => {
  togglePopup(popupAddNewCard);
});
// листенер submit формы созлания карточки
formAddNewCard.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const name = cardNameInput;
  const img = cardLinkInput;

  addCard(name.value, img.value);

  name.value = "";
  img.value = "";

  togglePopup(popupAddNewCard);
});

// автоматическая загрузка карточек на страницу
uploadReadyCards(initialCards);
