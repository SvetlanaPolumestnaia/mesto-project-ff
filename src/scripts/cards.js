import { cardTemplate, apiConfiguration } from "./constants.js";
import { deleteCardFromServer } from "./api.js";

// Функция создания новой карточки
export function createCard(link, name, alt, deleteFn, likeFn, openFn) { 
  const cardElementCopy = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardElementImage = cardElementCopy.querySelector('.card__image');
  const cardElementTitle = cardElementCopy.querySelector('.card__title');
  const buttonDeleteCard = cardElementCopy.querySelector('.card__delete-button');
  const buttonImage = cardElementCopy.querySelector('.card__image');
  const buttonLikeCard = cardElementCopy.querySelector('.card__like-button');
  
  cardElementImage.src = link;
  cardElementTitle.textContent = name;
  cardElementImage.alt = alt;

  showDeleteButton(cardElementCopy, apiConfiguration);

  buttonDeleteCard.addEventListener('click', (evt) => {
    deleteFn(evt, apiConfiguration)
  })
  buttonLikeCard.addEventListener('click', likeFn);
  buttonImage.addEventListener('click', openFn);
  
  return cardElementCopy;
};

export function showDeleteButton(card, apiConfig) {
  const deleteElement = card.querySelector('.card__delete-button')
  if (card.dataset.ownerId === apiConfig.myId) {
    deleteElement.classList.add('card__delete-button_visible');
  }
}

// Функция лайка
export function likeCard(evt) {
  evt.target.closest('.card__like-button').classList.toggle('card__like-button_is-active');
}

export function getLikesQuantity(card) {
  const likeElement = card.querySelector('.card__like-button_likes')
  likeElement.textContent = card.dataset.likes;
}

