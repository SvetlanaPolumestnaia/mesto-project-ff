export const placesList = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;

export const modals = Array.from(document.querySelectorAll('.popup'));
export const modalEditProfile = document.querySelector('.popup_type_edit');
export const modalAddNewCard = document.querySelector('.popup_type_new-card');
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonSaveEditProfile = modalEditProfile.querySelector('.popup__button');
export const buttonCloseEditProfile = modalEditProfile.querySelector('.popup__close');
export const buttonAddNewCard = document.querySelector('.profile__add-button');
export const buttonSaveAddNewCard = modalAddNewCard.querySelector('.popup__button');
export const buttonCloseAddNewCard = modalAddNewCard.querySelector('.popup__close');
export const modalImage = document.querySelector('.popup_type_image');
export const modalImageImg = document.querySelector('.popup__image');
export const modalImageCaption = document.querySelector('.popup__caption');

export const buttonCloseImage = modalImage.querySelector('.popup__close');
export const popupEditProfile = document.querySelector('.popup_type_edit');
export const formEditProfile = popupEditProfile.querySelector('.popup__form');
export const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
export const jobInput = popupEditProfile.querySelector('.popup__input_type_description');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const formNewCard = popupNewCard.querySelector('.popup__form');
export const placeNameInput = formNewCard.querySelector('.popup__input_type_card-name');
export const urlInput = formNewCard.querySelector('.popup__input_type_url');

export const validationConfiguration = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export const myId = 'f19ca1805b28867f6c3451ec';

export const apiConfiguration = {
  myId: 'f19ca1805b28867f6c3451ec',
  token: 'a3a5f573-877f-4323-8cbf-b12cc816b747',
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-1',
  uriCards: '/cards',
  uriUsers: '/users',
  uriMe: '/me',
}