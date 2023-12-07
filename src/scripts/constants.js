export const placesList = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;
export const modals = Array.from(document.querySelectorAll('.popup'));
export const modalEditProfile = document.querySelector('.popup_type_edit');
export const modalAddNewCard = document.querySelector('.popup_type_new-card');
export const modalEditAvatar = document.querySelector('.popup_type_avatar');
export const modalDelete = document.querySelector('.popup_type_delete');
export const buttonDeleteYes = modalDelete.querySelector('.popup__button');
export const buttonCloseDelete = modalDelete.querySelector('.popup__close');
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonSaveProfile = modalEditProfile.querySelector('.popup__button');
export const buttonCloseProfile = modalEditProfile.querySelector('.popup__close');
export const buttonAddNewCard = document.querySelector('.profile__add-button');
export const buttonSaveNewCard = modalAddNewCard.querySelector('.popup__button');
export const buttonCloseNewCard = modalAddNewCard.querySelector('.popup__close');
export const buttonEditAvatar = document.querySelector('.profile__image-edit');
export const buttonSaveAvatar = modalEditAvatar.querySelector('.popup__button');
export const buttonCloseAvatar = modalEditAvatar.querySelector('.popup__close');
export const modalImage = document.querySelector('.popup_type_image');
export const modalImageImg = document.querySelector('.popup__image');
export const modalImageCaption = document.querySelector('.popup__caption');
export const buttonCloseImage = modalImage.querySelector('.popup__close');
export const formEditProfile = modalEditProfile.querySelector('.popup__form');
export const nameInput = modalEditProfile.querySelector('.popup__input_type_name');
export const jobInput = modalEditProfile.querySelector('.popup__input_type_description');
export const profileAvatar = document.querySelector('.profile__image');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const formNewCard = modalAddNewCard.querySelector('.popup__form');
export const placeNameInput = formNewCard.querySelector('.popup__input_type_card-name');
export const urlInput = formNewCard.querySelector('.popup__input_type_url');
export const formEditAvatar = modalEditAvatar.querySelector('.popup__form');
export const avatarInput = modalEditAvatar.querySelector('.popup__input_type_avatar');

export const validationConfiguration = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export const apiConfiguration = {
  myId: 'f19ca1805b28867f6c3451ec',
  headers: {
    authorization: 'a3a5f573-877f-4323-8cbf-b12cc816b747',
    'Content-Type': 'application/json'
  },
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-1',
  uriCards: '/cards',
  uriUsers: '/users',
  uriLikes: '/likes',
  uriMe: '/me',
  uriAvatar: '/avatar',
}