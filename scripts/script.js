// Находим попап в DOM
let popup = document.querySelector('.popup');
// Находим кнопку закрытия попапа в DOM
let popupCloseBtn = popup.querySelector('.popup__close');
// Находим кнопку открытия попапа в DOM
let profileEditBtn = document.querySelector('.profile__edit-button');

// Находим форму в DOM
let form = popup.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = form.querySelector('#name');
let jobInput = form.querySelector('#job');

let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__description');

// Заносим данные в форму
  function addValue() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }


// Открываем попап
function openPopup() {
  popup.classList.add('popup_opened');
  addValue();
}

// Закрываем попап
function closePopup() {
  popup.classList.remove('popup_opened');
}

// Инструкция для обработчика формы
function submitFormHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}

// Обработчик кнопки Edit
profileEditBtn.addEventListener('click', openPopup);
// Обработчик кнопки Close
popupCloseBtn.addEventListener('click', closePopup);

// Обработчик формы
form.addEventListener('submit', submitFormHandler);
