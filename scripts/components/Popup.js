export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._closeButton = this._popupSelector.querySelector('.popup__close');
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    //this._handleEscClose();
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    //this._handleEscClose();
  }

  // _handleEscClose(event) {
  //   event.preventDefault();
  //   if (event.key === 'Escape') {
  //     const activePopup = document.querySelector('.popup_opened');
  //     this.close(activePopup);
  //   }
  // }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    })
  }
}
