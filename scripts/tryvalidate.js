// создаем объект с селекторами
const config = {
  popupForm : '.popup__form',
  inputErrorClass : 'form__input_type_error',
  inputErrorActive : 'form__input-error_active',
  formInput : '.form__input',
  formSubmit : '.form__submit',
  formSet : '.form__set'
};


// функция, которая добавляет класс с ошибкой
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.inputErrorActive);
};
// функция, которая удаляет класс с ошибкой
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.inputErrorActive);
  errorElement.textContent = '';
};
// функция, которая возвращает или убирает текст ошибки в зависимости от валидности поля ввода
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
// функция, которая проверяет валидность поля ввода
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
// функция, которая отключает и включает кнопку
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.removeAttribute('disabled');
  };
};
// функция, которая принимает элемент формы и добавляет ее полям нужные обработчики
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(config.formInput));
  const buttonElement = formElement.querySelector(config.formSubmit);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
// функция, которая находит все формы на странице и обрабатывает их
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.popupForm));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(event) {
      event.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(config.formSet));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};

enableValidation(config);



