let popup = document.querySelector('.popup');
let popupCloseBtn = popup.querySelector('.popup__close');
let profileEditBtn = document.querySelector('.profile__edit-button');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

profileEditBtn.addEventListener('click', togglePopup);
popupCloseBtn.addEventListener('click', togglePopup);

let form = popup.querySelector('.popup__form');
let nameInput = form.querySelector('.popup__name');
let jobInput = form.querySelector('.popup__job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__description');

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

form.addEventListener('submit', formSubmitHandler);

let submitBtn = popup.querySelector('.popup__submit-btn');

//Закрытие окна при нажатии кнопки "Сохранить"
submitBtn.addEventListener('click', togglePopup);
