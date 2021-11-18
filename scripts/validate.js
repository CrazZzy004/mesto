// создаем объект с селекторами
const config = {
  popupForm : '.popup__form',
  inputErrorClass : 'form__input_type_error',
  inputErrorActive : 'form__input-error_active',
  formInput : '.form__input',
  formSubmit : '.form__submit',
};

class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.formInput));
    this._buttonElement = this._formElement.querySelector(this._config.formSubmit);
  }
  // добавление класса с ошибкой
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.inputErrorActive);
  };

  // удаление класса с ошибкой
  _hideInputError(formElement, inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.inputErrorActive);
    errorElement.textContent = '';
  };

  // добавление или удаление текста ошибки в зависимости от валидности поля ввода
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(this._formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(this._formElement, inputElement);
    }
  };

  // проверка валидность поля ввода
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // отключение/включение кнопки submit
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.removeAttribute('disabled');
    }
  };

  // метод с хэндерами
  _setEventListeners() {
    this._toggleButtonState(this._inputList, this._buttonElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._formElement, inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });

    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    })
  };

  // валидация формы
  enableValidation() {
    this._setEventListeners();
  };
}

const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(config, formAddNewCard);
formAddNewCardValidator.enableValidation();
