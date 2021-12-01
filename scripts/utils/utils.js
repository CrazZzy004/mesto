import {jobInput, nameInput} from "./constants.js";

// функция закрытия попапа
export function closePopup (popup) {
  popup.classList.remove('popup_opened');
};

// Заносим данные в форму попапа редактирования профиля
export function fillInEditProfileFormInputs({ username, job }) {
  nameInput.value = username;
  jobInput.value = job;
};
