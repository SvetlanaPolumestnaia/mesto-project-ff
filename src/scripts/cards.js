import { cardTemplate } from "./index.js";
import { configurationImage } from "./configuration.js";

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

// Функция создания новой карточки
export function createCard(link, name, alt, deleteFn, openFn, closeFn, likeFn) { 
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').alt = alt;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteFn); 

  openFn(link, name, alt, cardElement, configurationImage);
  closeFn(configurationImage);

  likeFn(cardElement);

  return cardElement;
};

// Функция добавления новой карточки на страницу
export function renderCard(cardData, container) {
  container.append(cardData);
};

// Функция удаления карточки
export function deleteCard(evt) {
  const currentCard = evt.target;
  currentCard.closest('.places__item').remove();
};

// Функция лайка
export function likeCard(searchAreaLike) {
  const likeButton = searchAreaLike.querySelector('.card__like-button');
  likeButton.addEventListener('click', function() {
      likeButton.classList.toggle('card__like-button_is-active');
  })
}