import { cardTemplate, myId } from "./constants.js";
import { imgId } from "./api.js";
import { token } from "./index.js";
import { getLikes } from "./index.js";

// Функция создания новой карточки


export function createCard(link, name, alt, deleteFn, likeFn, openFn) { 
  const cardElementCopy = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardElementImage = cardElementCopy.querySelector('.card__image');
  const cardElementTitle = cardElementCopy.querySelector('.card__title');
  const buttonDeleteCard = cardElementCopy.querySelector('.card__delete-button');
  const buttonImage = cardElementCopy.querySelector('.card__image');
  const buttonLikeCard = cardElementCopy.querySelector('.card__like-button');
  const buttonLikeCardQuantity = cardElementCopy.querySelector('.card__like-button_likes');
  cardElementImage.src = link;
  cardElementTitle.textContent = name;
  cardElementImage.alt = alt;
  //imgId()
  // const imgIds = imgId();
  // cardElementCopy.id = imgIds;
  // console.log(imgIds)
  // if (myId === imgIds) {
  //   buttonDeleteCard.classList.add('card__delete-button_visible');
  //   buttonDeleteCard.addEventListener('click', deleteFn);
  // }

  buttonDeleteCard.addEventListener('click', deleteFn);
  buttonLikeCard.addEventListener('click', likeFn);

  //getLikes(buttonLikeCardQuantity);

  buttonImage.addEventListener('click', openFn);
  return cardElementCopy;
};

// Функция удаления карточки
export function deleteCard(evt) {
  evt.target.closest('.places__item').remove();
};

// Функция лайка
export function likeCard(evt) {
  evt.target.closest('.card__like-button').classList.toggle('card__like-button_is-active');
  //getLikes(evt);
}

