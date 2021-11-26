// функция открытия попапа
import {cardsContainer, jobInput, nameInput, popupEditProfile, profileJob, profileName} from "./constants.js";
import {Card} from "../components/Card.js";

export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscUp);
}
// функция закрытия попапа
export function closePopup (popup) {
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
export function closeByOverlayClick (event) {
  const activePopup = document.querySelector('.popup_opened');
  if (event.target.classList.contains('popup')) {
    closePopup(activePopup);
  }
}
// Заносим данные в форму попапа редактирования профиля
export function fillInEditProfileFormInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
// Инструкция для обработчика формы попапа редактирования профиля
export function submitEditFormHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

// функция добавления карточки на страницу из формы
export const addCard = (name, link) => {
  const card = new Card(name, link, '.element-template', openPopup, closePopup).generateCard();
  cardsContainer.prepend(card);
};

