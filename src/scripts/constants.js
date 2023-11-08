export const placesList = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;
export const popupEdit = document.querySelector('.popup_type_edit');
export const formEdit = popupEdit.querySelector('.popup__form');
export const nameInput = popupEdit.querySelector('.popup__input_type_name');
export const jobInput = popupEdit.querySelector('.popup__input_type_description');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const modalEdit = document.querySelector('.popup_type_edit');
export const modalOpen = document.querySelector('.popup_type_new-card');
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonOpen = document.querySelector('.profile__add-button');
export const modalImage = document.querySelector('.popup_type_image');
export const modalImageImg = document.querySelector('.popup__image');
export const modalImageCaption = document.querySelector('.popup__caption');
export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

